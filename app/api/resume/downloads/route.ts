import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface DownloadsData {
  count: number;
  updatedAt: string;
}

// --- Rate limiting (reused pattern from contact API) ---

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 increments per minute per IP

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count };
}

// --- Counter storage ---

let cachedData: DownloadsData | null = null;

const DATA_FILE = path.join(process.cwd(), "data", "resume-downloads.json");

async function readCount(): Promise<DownloadsData> {
  if (cachedData) return cachedData;
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    cachedData = JSON.parse(raw) as DownloadsData;
    return cachedData;
  } catch {
    return { count: 0, updatedAt: new Date().toISOString() };
  }
}

async function writeCount(data: DownloadsData): Promise<void> {
  cachedData = data;
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// GET /api/resume/downloads — fetch current count
export async function GET() {
  const data = await readCount();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}

// POST /api/resume/downloads — increment count
export async function POST(request: NextRequest) {
  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const data = await readCount();
  data.count += 1;
  data.updatedAt = new Date().toISOString();
  await writeCount(data);

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "X-RateLimit-Remaining": String(rateLimit.remaining),
    },
  });
}
