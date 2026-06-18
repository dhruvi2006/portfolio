"use client";

import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useScrollState } from "@/components/scroll-context";
import { useTheme } from "@/components/theme-provider";
import {
  IoArrowForwardOutline,
  IoLocationOutline,
  IoDocumentTextOutline,
  IoCodeSlashOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useResumeModal } from "@/hooks/useResumeModal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0, 1] as const,
    },
  },
};

const MagneticButton = ({
  children,
  href,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
}) => {
  return (
    <div className="inline-block">
      {onClick ? (
        <Button
          variant={variant}
          size="lg"
          className="group cursor-pointer"
          onClick={onClick}
        >
          {children}
        </Button>
      ) : (
        <a href={href}>
          <Button
            variant={variant}
            size="lg"
            className="group cursor-pointer"
          >
            {children}
          </Button>
        </a>
      )}
    </div>
  );
};

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "React Native",
  "FastAPI",
];



export function Hero() {
  const { scrolledPast } = useScrollState();
  const { scrollY } = useScroll();
  const { toggleTheme } = useTheme();
  const { openResume } = useResumeModal();

  // Synchronous threshold — matches scroll-context's 75vh check
  const threshold = typeof window !== "undefined" ? window.innerHeight * 0.75 : 600;

  // Continuous scroll-driven fade — makes the layoutId transition feel scroll-driven
  const scrollOpacity = useTransform(scrollY, [threshold - 120, threshold], [1, 0]);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Subtle background dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-foreground) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-32 pb-16 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[calc(100vh-12rem)]">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            {/* Status indicator */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-2 text-sm text-secondary">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400/60 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs tracking-wide">Available for new opportunities</span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.9] text-foreground dark:text-white"
            >
              Dhruvi
              <br />
              Mittal
            </motion.h1>

            {/* Decorative dash */}
            <motion.div
              variants={itemVariants}
              className="w-16 h-px bg-gradient-to-r from-foreground/40 to-transparent mt-5 mb-6"
            />

            {/* Sub-headline */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-secondary leading-relaxed mb-6 max-w-lg"
            >
              Building software that solves real problems.
            </motion.p>

            {/* Detail bullet points with icons */}
            <motion.div
              variants={itemVariants}
              className="space-y-3 mb-8"
            >
              <div className="flex items-center gap-3 text-secondary">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <IoCodeSlashOutline className="w-4 h-4 text-foreground/60" />
                </div>
                <span className="text-sm">Full-Stack Developer &amp; AI Engineer</span>
              </div>
              <div className="flex items-center gap-3 text-secondary">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <IoPeopleOutline className="w-4 h-4 text-foreground/60" />
                </div>
                <span className="text-sm">Co-Founder at Shudveta</span>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-6"
            >
              <MagneticButton href="#projects" variant="primary">
                View Projects
                <IoArrowForwardOutline className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton onClick={openResume} variant="secondary">
                <IoDocumentTextOutline className="w-4 h-4" />
                Download Resume
              </MagneticButton>
            </motion.div>

            {/* Tech stack tags */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2 mb-6"
            >
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium text-secondary bg-muted dark:bg-[#171717] rounded-full border border-border/50"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

          </motion.div>

          {/* Right Side - Portrait */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex flex-col items-center gap-4"
            style={{ opacity: scrollOpacity }}
          >
            <AnimatePresence mode="popLayout">
              {!scrolledPast && (
                <motion.div
                  key="hero-portrait"
                  layoutId="profile-image"
                  variants={itemVariants}
                  className="relative"
                >
                  <motion.div
                    className="relative w-[380px] h-[480px] rounded-3xl overflow-hidden border border-border cursor-pointer"
                    animate={{
                      filter: "grayscale(0%)",
                      scale: 1,
                    }}
                    whileHover={{
                      filter: "grayscale(100%)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={toggleTheme}
                    title="Toggle theme"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Image
                      src="/myimage.png"
                      alt="Dhruvi Mittal portrait"
                      fill
                      className="object-cover"
                      sizes="380px"
                      priority
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Location below portrait */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 text-sm text-secondary"
            >
              <IoLocationOutline className="w-4 h-4" />
              <span>Delhi, India</span>
            </motion.div>
          </motion.div>
        </div>
      </div>


    </section>
  );
}
