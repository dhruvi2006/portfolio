"use client";

import { motion } from "framer-motion";
import {
  IoCodeSlashOutline,
  IoServerOutline,
  IoPhonePortraitOutline,
  IoSparklesOutline,
  IoCloudOutline,
} from "react-icons/io5";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind"],
    icon: IoCodeSlashOutline,
  },
  {
    title: "Backend",
    skills: ["FastAPI", "Firebase", "Supabase", "MongoDB", "REST APIs"],
    icon: IoServerOutline,
  },
  {
    title: "Mobile",
    skills: ["React Native", "Expo"],
    icon: IoPhonePortraitOutline,
  },
  {
    title: "AI & Automation",
    skills: ["OpenAI", "Gemini", "Hugging Face"],
    icon: IoSparklesOutline,
  },
  {
    title: "DevOps & Cloud",
    skills: ["Docker", "GitHub Actions", "Cloud Platforms"],
    icon: IoCloudOutline,
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* SECTION HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <span className="block text-[14px] tracking-[0.35em] uppercase font-semibold text-zinc-400">
              Capabilities
            </span>

            <h2 className="mt-6 text-[52px] md:text-[72px] font-semibold tracking-[-0.05em] leading-[0.95] text-black">
              Technical Expertise
            </h2>

            <p className="mt-8 max-w-[900px] mx-auto text-[20px] md:text-[24px] leading-relaxed text-zinc-500">
              Core technical capabilities across frontend, backend, mobile, AI, and cloud.
            </p>
          </motion.div>

        {/* SKILL CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0, 1] as const,
                delay: 0.15 + index * 0.08,
              }}
              className="group relative flex flex-col p-6 rounded-[28px] bg-white border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              {/* Watermark icon — oversized, low opacity */}
              <div className="absolute top-3 right-3 pointer-events-none select-none">
                <category.icon className="w-20 h-20 text-zinc-900 opacity-[0.04]" />
              </div>

              {/* Icon */}
              <div className="relative z-10 mb-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                  <category.icon className="w-5 h-5 text-zinc-600 group-hover:text-accent transition-colors duration-300" />
                </div>
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-base font-semibold text-zinc-900 mb-4">
                {category.title}
              </h3>

              {/* Skills as bullet list */}
              <ul className="relative z-10 space-y-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2.5 text-sm text-zinc-500"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent/50 shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
