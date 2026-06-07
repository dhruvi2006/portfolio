"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const experiences = [
  {
    company: "Shudveta",
    role: "Co-Founder",
    period: "Present",
    description:
      "Building production-ready software products for clients. Leading technical strategy, architecture, and delivery across web, mobile, and AI projects.",
    tags: ["Next.js", "React Native", "FastAPI", "AI"],
    highlight: true,
  },
  {
    company: "iTuple Technologies",
    role: "Software Developer Intern",
    period: "Past",
    description:
      "Developed and maintained software solutions. Collaborated with the engineering team on full-stack development and internal tooling.",
    tags: ["React", "Node.js", "MongoDB"],
    highlight: false,
  },
  {
    company: "Lubeck Elevators",
    role: "Software Developer",
    period: "Past",
    description:
      "Built and managed the digital ecosystem for Lubeck Elevators, including web applications, admin dashboards, and client portals.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    highlight: false,
  },
  {
    company: "Lubeck Exports",
    role: "Web Developer",
    period: "Past",
    description:
      "Developed and maintained the company's export platform. Built e-commerce solutions and inventory management systems.",
    tags: ["React", "Tailwind", "Firebase"],
    highlight: false,
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0, 1] as const },
  },
};

export function Experience() {
  return (
    <section id="experience" className="py-32 md:py-40 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] as const }}
          className="mb-20"
        >
          <span className="text-xs tracking-widest uppercase text-secondary font-medium">
            Experience
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] mt-4">
            Where I&apos;ve{" "}
            <span className="text-accent">Worked</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl">
          {/* Timeline line */}
          <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={itemVariants}
                className={cn(
                  "relative pl-10 md:pl-0",
                  index % 2 === 0 ? "md:pr-12 md:text-right md:mr-[50%]" : "md:pl-12 md:ml-[50%]"
                )}
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute left-0 md:left-1/2 top-1 w-[15px] h-[15px] rounded-full border-[3px] bg-background -translate-x-1/2 z-10",
                    exp.highlight ? "border-accent" : "border-border"
                  )}
                >
                  {exp.highlight && (
                    <div className="absolute inset-0 rounded-full bg-accent/20 animate-pulse" />
                  )}
                </div>

                {/* Content */}
                <div>
                  <span className="text-xs text-secondary/60 font-medium tracking-wide uppercase">
                    {exp.period}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mt-1">
                    {exp.company}
                  </h3>
                  <p className="text-sm text-accent font-medium mt-0.5">
                    {exp.role}
                  </p>
                  <p className="text-sm text-secondary leading-relaxed mt-3 max-w-md">
                    {exp.description}
                  </p>
                  <div
                    className={cn(
                      "flex flex-wrap gap-2 mt-4",
                      index % 2 === 0 ? "md:justify-end" : ""
                    )}
                  >
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-background border border-border text-secondary shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
