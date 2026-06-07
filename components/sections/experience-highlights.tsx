"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const highlights = [
  {
    metric: "15+",
    label: "Projects Delivered",
    description: "Production applications shipped across web, mobile, and AI",
  },
  {
    metric: "4+",
    label: "Organizations Worked With",
    description: "From startups to established companies",
  },
  {
    metric: "Multiple",
    label: "Production Deployments",
    description: "Live applications serving real users",
  },
  {
    metric: "Web • Mobile",
    label: "AI Expertise",
    description: "End-to-end AI integration in production systems",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0, 1] as const },
  },
};

export function ExperienceHighlights() {
  return (
    <section className="py-32 md:py-40 bg-dark-bg text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] as const }}
          className="mb-16"
        >
          <span className="text-xs tracking-widest uppercase text-dark-secondary font-medium">
            Impact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] mt-4 text-white">
            Experience{" "}
            <span className="text-accent">Highlights</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {highlights.map((item) => (
            <motion.div
              key={item.label}
              variants={cardVariants}
              className={cn(
                "relative group p-8 rounded-2xl border border-dark-border bg-dark-card",
                "hover:bg-dark-card/80 transition-all duration-300",
                "hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5",
                "hover:-translate-y-1"
              )}
            >
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-3">
                  {item.metric}
                </div>
                <h3 className="text-sm font-semibold text-white/90 mb-2">
                  {item.label}
                </h3>
                <p className="text-xs text-dark-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
