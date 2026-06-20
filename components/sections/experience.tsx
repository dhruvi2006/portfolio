"use client";

import { motion } from "framer-motion";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useResumeModal } from "@/hooks/useResumeModal";

const experiences = [
  {
    logo: "SH",
    company: "Shudveta",
    role: "Co-Founder",
    link: "https://shudveta.com",
    periodTop: "2025 -",
    periodBottom: "Present",
    description:
      "Building production-ready software products for clients across industries. Leading technical strategy, architecture, and delivery across web, mobile, and AI projects.",
  },
  {
    logo: "IT",
    company: "iTuple Technologies",
    role: "Software Developer Intern",
    link: "https://ituple.com",
    periodTop: "Jan 2026 -",
    periodBottom: "May 2026",
    description:
      "Developed and maintained software solutions. Collaborated with the engineering team on full-stack development and internal tooling.",
  },
  {
    logo: "LE",
    company: "Lubeck Elevators",
    role: "Software Developer",
    periodTop: "Jun 2025 -",
    periodBottom: "Jul 2025",
    description:
      "Built and managed the digital ecosystem for Lubeck Elevators, including web applications, admin dashboards, and client portals.",
  },
  {
    logo: "LX",
    company: "Lubeck Exports",
    role: "Web Developer",
    periodTop: "Jul 2025 -",
    periodBottom: "Aug 2025",
    description:
      "Developed and maintained the company's export platform. Built e-commerce solutions and inventory management systems.",
  },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0, 1] as const },
  },
};

export function Experience() {
  const { openResume } = useResumeModal();
  return (
    <section id="experience" className="relative py-32 md:py-40 overflow-hidden">
      {/* Subtle dotted grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-foreground) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>
<div className="relative max-w-[1600px] mx-auto px-8 md:px-12 lg:px-20">
  <div className="lg:flex gap-28">
    {/* Left Panel */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] as const }}
      className="lg:w-[26%] lg:flex-shrink-0 mb-20 lg:mb-0"
    >
      <span className="text-sm tracking-[0.25em] uppercase text-accent font-medium">
        Experience
      </span>

<h2 className="mt-4 max-w-[220px] text-[48px] sm:text-[56px] lg:text-[68px] leading-[0.95] font-semibold tracking-[-0.04em] text-black">
  Where I&apos;ve
  <br />
  Worked
</h2>

      <div className="w-16 h-[3px] bg-accent rounded-full mt-10" />

      <p className="mt-10 text-base lg:text-sm leading-8 text-secondary max-w-md">
       Building software, leading teams, and turning ideas <br />into products that people actually use.
      </p>            <div className="hidden lg:block absolute left-[505px] top-3 bottom-5 w-px bg-border" />
      <div className="mt-12">
        <Button
          variant="secondary"
          size="md"
          className="group cursor-pointer"
          onClick={openResume}
        >
          <IoDocumentTextOutline className="w-4 h-4" />
          Download Resume
        </Button>
      </div>
    </motion.div>

    {/* Right Panel */}
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 min-w-0"
    >
      <div className="relative">
        {/* Main Timeline Line — desktop only */}
        <div className="hidden lg:block absolute left-[75px] top-3 bottom-5 w-px bg-border" />

        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            variants={itemVariants}
            className="relative pb-16 last:pb-0"
          >
            {/* MOBILE: Stacked card layout */}
            <div className="lg:hidden p-5 rounded-2xl border border-border/50 bg-card shadow-sm">
              <div className="flex items-start gap-4 mb-3">
                <div className="w-14 h-14 rounded-2xl border border-border bg-background flex items-center justify-center text-xs font-semibold text-secondary shrink-0">
                  {exp.logo}
                </div>
                <div className="min-w-0 flex-1">
                  {exp.link ? (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block group"
                    >
                      <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                        {exp.company}
                      </h3>
                    </a>
                  ) : (
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                      {exp.company}
                    </h3>
                  )}
                  <p className="text-accent text-sm font-medium mt-0.5">
                    {exp.role}
                  </p>
                  <p className="text-xs text-secondary/70 mt-1">
                    {exp.periodTop} {exp.periodBottom}
                  </p>
                </div>
              </div>
              <p className="text-sm text-secondary/80 leading-relaxed">
                {exp.description}
              </p>

              {/* Mobile-only divider between cards */}
              {index < experiences.length - 1 && (
                <div className="mt-4 pt-4 border-t border-border/30" />
              )}
            </div>

            {/* DESKTOP: Exact original timeline grid layout — untouched */}
            <div className="hidden lg:grid lg:grid-cols-[30px_40px_52px_260px_1fr] lg:gap-6">
              {/* Year */}
              <div className="flex justify-end pt-2">
                <div className="text-right leading-[1.15]">
                  <div className="text-[15px] text-secondary/70">
                    {exp.periodTop}
                  </div>
                  <div className="text-[15px] text-secondary/70">
                    {exp.periodBottom}
                  </div>
                </div>
              </div>

              {/* Timeline Dot */}
              <div className="relative flex justify-center">
                <div className="absolute top-2 w-4 h-4 rounded-full bg-accent border-4 border-background z-10" />
              </div>

              {/* Logo Box */}
              <div className="w-14 h-14 mt-2 rounded-2xl border border-border bg-background flex items-center justify-center text-xs font-semibold text-secondary">
                  {exp.logo}
              </div>

              {/* Company */}
              <div>
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block group"
                >
                  <h3 className="text-2xl mt-2 leading-none font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent">
                    {exp.company}
                  </h3>
                </a>

                <p className="text-accent text-base lg:text-sm font-medium mt-1">
                  {exp.role}
                </p>
              </div>
              {/* Description */}
              <div className="max-w-[380px]">
                <p className="text-secondary/80 text-base lg:text-ls leading-8">
                  {exp.description}
                </p>
              </div>

              {/* Divider */}
              {index < experiences.length - 1 && (
                <div className="absolute left-[90px] right-0 bottom-0 h-px bg-border/60" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
</div>
    </section>
  );
}
