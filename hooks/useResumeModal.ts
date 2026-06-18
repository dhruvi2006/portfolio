"use client";

import { useContext, createContext } from "react";

/* ─── Context ─── */

export interface ResumeModalContextValue {
  openResume: () => void;
  closeResume: () => void;
  isResumeOpen: boolean;
}

export const ResumeModalContext = createContext<ResumeModalContextValue | null>(null);

export function useResumeModal(): ResumeModalContextValue {
  const ctx = useContext(ResumeModalContext);
  if (!ctx) {
    throw new Error("useResumeModal must be used within a ResumeProvider");
  }
  return ctx;
}
