"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoDocumentTextOutline, IoCloseOutline } from "react-icons/io5";
import { ResumeModalContext } from "@/hooks/useResumeModal";
import ResumeTemplate from "@/components/resume/ResumeTemplate";
import { ResumeActions } from "@/components/resume/ResumeActions";
import { useResumeModal } from "@/hooks/useResumeModal";

/* ─── Provider ─── */

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [isResumeOpen, setIsOpen] = useState(false);

  const openResume = useCallback(() => setIsOpen(true), []);
  const closeResume = useCallback(() => setIsOpen(false), []);

  return (
    <ResumeModalContext.Provider
      value={{ openResume, closeResume, isResumeOpen }}
    >
      {children}
      <ResumeModal />
    </ResumeModalContext.Provider>
  );
}

/* ─── Modal Component ─── */

function ResumeModal() {
  const { isResumeOpen, closeResume } = useResumeModal();
  const resumeRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isResumeOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isResumeOpen]);

  // ESC key closes modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeResume();
    };
    if (isResumeOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isResumeOpen, closeResume]);

  return (
    <AnimatePresence>
      {isResumeOpen && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeResume}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <motion.div
            className="relative flex flex-col bg-white dark:bg-[#171717] rounded-lg shadow-2xl overflow-hidden"
            style={{ width: "85vw", maxWidth: 1400, height: "90vh" }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
            }}
            exit={{
              opacity: 0,
              scale: 0.97,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
          >
            {/* ─── Header Bar ─── */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-[#262626] shrink-0 no-print select-none">
              {/* Left — File info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-[#1a2744] flex items-center justify-center shrink-0">
                  <IoDocumentTextOutline className="w-4 h-4 text-blue-600 dark:text-[#60a5fa]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-[#fafafa] truncate">
                    Resume — Dhruvi Mittal
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-[#71717a]">Dhruvi_Mittal_Resume.pdf</p>
                </div>
              </div>

              {/* Right — Actions */}
              <div className="flex items-center gap-2">
                <ResumeActions contentRef={resumeRef} />
                <div className="w-px h-6 bg-gray-200 mx-1" />
                <button
                  onClick={closeResume}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 dark:text-[#71717a] hover:text-gray-600 dark:hover:text-[#a1a1aa] hover:bg-gray-100 dark:hover:bg-[#1f1f1f] transition-all duration-150 cursor-pointer"
                  aria-label="Close resume"
                >
                  <IoCloseOutline className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ─── Document Viewer ─── */}
            <div className="flex-1 min-h-0 overflow-auto bg-gray-100 dark:bg-[#111111] flex justify-center p-3">
              <div className="shadow-lg bg-white dark:bg-[#171717] rounded-sm overflow-hidden self-start">
                <ResumeTemplate ref={resumeRef} modalWidth />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
