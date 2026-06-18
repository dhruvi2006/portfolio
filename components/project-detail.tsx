"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline, IoOpenOutline, IoArrowBackOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProjectDetail {
  title: string;
  category: string;
  description: string;
  description2?: string;
  challenge?: string;
  technologies: string[];
  launchUrl: string | null;
  image: string | null;
  features?: string[];
  highlights?: string[];
}

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-background border border-border shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.4, ease: [0.25, 0.1, 0, 1] },
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
              transition: { duration: 0.3, ease: [0.25, 0.1, 0, 1] },
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <IoCloseOutline className="w-4 h-4 text-secondary" />
            </button>

            {/* Content */}
            <div className="p-8 sm:p-10">
              {/* Back link */}
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 text-xs text-secondary hover:text-foreground transition-colors mb-8 group"
              >
                <IoArrowBackOutline className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                Back to projects
              </button>

              {/* Header */}
              <div className="mb-8">
                <Badge
                  variant="default"
                  className="text-[11px] tracking-wide uppercase mb-4"
                >
                  {project.category}
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                  {project.title}
                </h2>
              </div>

              {/* Description section */}
              <div className="mb-8">
                <p className="text-sm text-secondary leading-relaxed">
                  {project.description}
                </p>
                {project.description2 && (
                  <p className="text-sm text-secondary/80 leading-relaxed mt-4">
                    {project.description2}
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-border mb-8" />

              {/* Challenge section */}
              {project.challenge && (
                <>
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      The Challenge
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                  <div className="h-px bg-border mb-8" />
                </>
              )}

              {/* What we built / Features */}
              {project.features && project.features.length > 0 && (
                <>
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-foreground mb-4">
                      What We Built
                    </h3>
                    <div className="space-y-3">
                      {project.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-3 text-sm text-secondary"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-px bg-border mb-8" />
                </>
              )}

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={cn(
                        "text-xs px-3 py-1.5 rounded-full border",
                        tech === "+1 more"
                          ? "border-accent/20 text-accent bg-accent/5"
                          : "bg-muted border-border text-secondary"
                      )}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <>
                  <div className="h-px bg-border mb-8" />
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-foreground mb-4">
                      Key Highlights
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="text-xs px-3 py-1.5 rounded-full bg-accent/5 border border-accent/20 text-accent"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Divider */}
              <div className="h-px bg-border mb-8" />

              {/* Action buttons */}
              <div className="flex gap-3">
                {project.launchUrl && (
                  <a
                    href={project.launchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="primary"
                      size="md"
                      className="cursor-pointer"
                    >
                      <IoOpenOutline className="w-4 h-4" />
                      Launch Project
                    </Button>
                  </a>
                )}
                <Button
                  variant="outline"
                  size="md"
                  onClick={onClose}
                  className="cursor-pointer"
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
