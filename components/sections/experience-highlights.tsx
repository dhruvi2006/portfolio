"use client";

import { motion } from "framer-motion";

const highlights = [
  {
    metric: "15+",
    label: "Projects Delivered",
    description: "Production applications shipped across web, mobile, and AI.",
  },
  {
    metric: "4+",
    label: "Organizations Worked With",
    description: "From startups to established companies.",
  },
  {
    metric: "Multiple",
    label: "Production Deployments",
    description: "Live applications serving real users.",
  },
  {
    metric: "Web • Mobile • AI",
    label: "Expertise",
    description: "End-to-end software engineering and deployment.",
  },
];

export function ExperienceHighlights() {
  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="block text-[13px] tracking-[0.25em] uppercase font-semibold text-zinc-500">
            Impact
          </span>
        </motion.div>

        {/* STATS GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0, 1] as const,
                delay: index * 0.1,
              }}
              className="group relative p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_24px_-4px_rgba(255,255,255,0.08)]"
            >
              {/* Metric */}
              <div className="text-6xl font-semibold tracking-tight text-white mb-3">
                {item.metric}
              </div>

              {/* Title */}
              <h3 className="text-xl font-medium text-white/80 mb-2">
                {item.label}
              </h3>

              {/* Description */}
              <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                {item.description}
              </p>

              {/* Subtle top-right glow on hover */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-3xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
