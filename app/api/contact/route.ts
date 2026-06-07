import { NextRequest, NextResponse } from "next/server";

// --- Types ---

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface AirtableRecord {
  fields: {
    Name: string;
    Email: string;
    Message: string;
  };
}

// --- Rate limiting ---

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute per IP

function getRateLimitInfo(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count, resetAt: entry.resetAt };
}

// --- Validation ---

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitize(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}

function validateForm(data: ContactFormData): string | null {
  if (!data.name || sanitize(data.name).length === 0) {
    return "Name is required.";
  }
  if (sanitize(data.name).length > 200) {
    return "Name must be under 200 characters.";
  }
  if (!data.email || sanitize(data.email).length === 0) {
    return "Email is required.";
  }
  if (!validateEmail(data.email)) {
    return "Please provide a valid email address.";
  }
  if (!data.message || sanitize(data.message).length === 0) {
    return "Message is required.";
  }
  if (sanitize(data.message).length > 5000) {
    return "Message must be under 5000 characters.";
  }
  return null;
}

// --- Airtable API ---

async function submitToAirtable(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME;

  if (!token || !baseId || !tableName) {
    console.error("Missing Airtable environment variables");
    return { success: false, error: "Server configuration error." };
  }

  const record: AirtableRecord = {
    fields: {
      Name: sanitize(data.name),
      Email: sanitize(data.email),
      Message: sanitize(data.message),
    },
  };

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ records: [record] }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Airtable API error:", response.status, errorBody);
      return { success: false, error: "Failed to save message." };
    }

    return { success: true };
  } catch (error) {
    console.error("Airtable request failed:", error);
    return { success: false, error: "Network error. Please try again." };
  }
}

// --- POST handler ---

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const rateLimit = getRateLimitInfo(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  // Parse body
  let body: ContactFormData;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Validate
  const validationError = validateForm(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  // Submit to Airtable
  const result = await submitToAirtable(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error || "Failed to send message. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Message sent successfully." },
    {
      status: 200,
      headers: {
        "X-RateLimit-Remaining": String(rateLimit.remaining),
      },
    }
  );
}
