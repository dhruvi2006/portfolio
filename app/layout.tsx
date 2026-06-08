import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LayoutGroup } from "framer-motion";
import { Nav } from "@/components/nav";
import { InteractiveDotBackground } from "@/components/interactive-dot-background";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProvider } from "@/components/scroll-context";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dhruvi Mittal — Full-Stack Developer & AI Engineer",
  description:
    "Building production-ready software products across web, mobile, AI, and automation. Co-Founder at Shudveta.",
  keywords: [
    "Dhruvi Mittal",
    "Full Stack Developer",
    "AI Engineer",
    "Shudveta",
    "Next.js",
    "React",
    "Delhi",
  ],
  openGraph: {
    title: "Dhruvi Mittal — Full-Stack Developer & AI Engineer",
    description:
      "Building production-ready software products across web, mobile, AI, and automation.",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <InteractiveDotBackground />
        <div className="relative z-[1]">
          <ThemeProvider>
            <LayoutGroup>
              <ScrollProvider>
                <Nav />
                {children}
              </ScrollProvider>
            </LayoutGroup>
          </ThemeProvider>
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            toastOptions={{
              duration: 4000,
            }}
          />
        </div>
      </body>
    </html>
  );
}
