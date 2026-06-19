"use client";

import { motion } from "framer-motion";

const highlights = [
  {
    metric: "16+",
    label: "Projects Shipped",
    description:
      "Production-ready web and mobile applications shipped to real users",
  },
  {
    metric: "4+",
    label: "Clients & Partners",
    description:
      "Built digital foundations from early-stage startups to established trade companies",
  },
  {
    metric: "10+",
    label: "Production Deployments",
    description:
      "Reliable systems deployed across cloud platforms with continuous iteration",
  },
  {
    metric: "Full-Stack",
    label: "AI/ML Expertise",
    description:
      "Full-stack capabilities spanning frontend, backend, AI integrations, and mobile",
  },
];

export function ExperienceHighlights() {
  return (
    <section className="relative bg-black py-14 overflow-hidden">
      {/* Dot Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-3">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/10 bg-white/[0.02] mb-2">
            <span className="text-[#2563eb] text-sm">✦</span>

            <span className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 font-medium">
              Track Record
            </span>
          </div>

          <h2 className="text-[30px] leading-none font-bold tracking-[-0.04em] text-white">
            Experience Highlights
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.15 + index * 0.08,
              }}
              className="
                relative
                min-h-[190px]
                p-5
                border
                border-white/10
                bg-[#0d0d0d]
                overflow-hidden
              "
            >
              {/* Blue Left Accent */}
              <div className="absolute left-0 top-0 w-[3px] h-full bg-[#1d4ed8]" />

              {/* Metric */}
              <div className="mb-5">
                <h3 className="text-[35px] leading-none font-bold tracking-tight text-white">
                  {item.metric}
                </h3>
              </div>

              {/* Label */}
              <h4 className="text-[16px] font-semibold text-white mb-3">
                {item.label}
              </h4>

              {/* Description */}
              <p className="text-[16px] leading-8 text-zinc-500">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}