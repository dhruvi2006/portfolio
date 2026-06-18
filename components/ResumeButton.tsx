"use client";

import type { ReactNode } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useResumeModal } from "@/hooks/useResumeModal";
import { cn } from "@/lib/utils";

interface ResumeButtonProps {
  children?: ReactNode;
  variant?: "default" | "secondary" | "nav-desktop" | "nav-mobile";
  className?: string;
}

export function ResumeButton({
  children,
  variant = "default",
  className,
}: ResumeButtonProps) {
  const { openResume } = useResumeModal();

  if (variant === "nav-mobile") {
    return (
      <button
        onClick={openResume}
        className={cn(
          "flex items-center gap-2 px-4 py-3 text-sm font-medium text-accent hover:bg-accent/5 rounded-xl transition-colors duration-150 border-t border-border/30 mt-1 pt-3 w-full text-left cursor-pointer",
          className
        )}
      >
        <IoDocumentTextOutline className="w-4 h-4" />
        <span>Resume</span>
      </button>
    );
  }

  if (variant === "secondary") {
    return (
    <button
      onClick={openResume}
      className={cn(
        "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer",
        "text-[#111111] dark:text-[#fafafa] border border-[#111111]/20 dark:border-white/20 hover:border-[#111111]/40 dark:hover:border-white/40 hover:text-[#111111] dark:hover:text-[#fafafa] hover:bg-accent/5",
        className
      )}
    >
      <IoDocumentTextOutline className="w-4 h-4" />
      <span>Resume</span>
    </button>
    );
  }

  // default — full button variant (used in Experience section)
  return (
    <button
      onClick={openResume}
      className={cn(
        "inline-flex items-center justify-center h-10 px-5 text-sm font-medium gap-2 rounded-xl transition-all duration-200 cursor-pointer",
        "bg-background text-foreground border border-border hover:bg-muted hover:border-foreground/20",
        className
      )}
    >
      {children || (
        <>
          <IoDocumentTextOutline className="w-4 h-4" />
          Download Resume
        </>
      )}
    </button>
  );
}
