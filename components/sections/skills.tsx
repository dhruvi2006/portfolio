"use client";

import { motion } from "framer-motion";
import { IoCodeSlashOutline, IoServerOutline, IoPhonePortraitOutline, IoSparklesOutline, IoCloudOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0, 1] as const },
  },
};

export function Skills() {
  return (
    <section id="skills" className="py-32 md:py-40 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] as const }}
          className="mb-16"
        >
          <span className="text-xs tracking-widest uppercase text-secondary font-medium">
            Skills
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] mt-4">
            Technology{" "}
            <span className="text-accent">Stack</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className={cn(
                "group relative p-6 rounded-2xl border border-border bg-card",
                "transition-all duration-300 cursor-default",
                "shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-accent/20"
              )}
            >
              <div className="relative z-10">
                <div className="text-lg mb-4 opacity-60">
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 text-xs text-secondary"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent/60" />
                      {skill}
                    </li>
                  ))}
                </ul>
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
