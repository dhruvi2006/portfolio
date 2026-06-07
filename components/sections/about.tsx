"use client";

import { motion } from "framer-motion";
import { IoCodeSlashOutline, IoHardwareChipOutline, IoPhonePortraitOutline, IoBulbOutline, IoArrowForwardOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";

const cards = [
  {
    icon: IoCodeSlashOutline,
    title: "Full Stack Development",
    description:
      "Building end-to-end applications with modern frameworks. From API design to polished UIs — production-ready systems that scale.",
  },
  {
    icon: IoHardwareChipOutline,
    title: "AI & Automation",
    description:
      "Integrating LLMs, computer vision, and intelligent automation into real-world products. Making software smarter, not just faster.",
  },
  {
    icon: IoPhonePortraitOutline,
    title: "Mobile Development",
    description:
      "Cross-platform mobile applications with React Native and Expo. Native feel, shared logic, and rapid iteration cycles.",
  },
  {
    icon: IoBulbOutline,
    title: "Product Development",
    description:
      "From ideation to deployment — designing, building, and shipping products that solve real problems for real people.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export function About() {
  return (
    <section id="about" className="py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] as const }}
          >
            <span className="text-xs tracking-widest uppercase text-secondary font-medium">
              About
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] mt-4 mb-6">
              Building Software That Solves{" "}
              <span className="text-accent">Real Problems</span>
            </h2>
            <div className="space-y-4 text-secondary leading-relaxed">
              <p>
                I&apos;m Dhruvi — a Full-Stack Developer and AI Engineer based in Delhi, India.
                Currently pursuing my BCA while co-founding{" "}
                <span className="text-foreground font-medium">Shudveta</span>,
                where we build production-ready software products for clients across industries.
              </p>
              <p>
                My approach combines strong technical foundations with a product-minded
                perspective. I don&apos;t just write code — I build solutions that create
                measurable impact for businesses and their users.
              </p>
              <p>
                From healthcare platforms to e-commerce ecosystems and AI-powered tools,
                every project is an opportunity to push what&apos;s possible with modern
                technology.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm">
              <div className="flex -space-x-2">
                {["React", "Next.js", "TS", "AI"].map((tech) => (
                  <div
                    key={tech}
                    className="w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center text-[10px] font-medium text-secondary"
                  >
                    {tech}
                  </div>
                ))}
              </div>
              <span className="text-secondary/60 text-sm ml-2">
                4+ technologies in daily use
              </span>
            </div>
          </motion.div>

          {/* Right - Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {cards.map((card) => (
              <motion.div
                key={card.title}
                variants={cardVariants}
                className={cn(
                  "group relative p-6 rounded-2xl border border-border bg-card",
                  "transition-all duration-300 cursor-default",
                  "shadow-sm hover:shadow-md hover:-translate-y-1"
                )}
              >
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-300">
                    <card.icon className="w-5 h-5 text-foreground group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <IoArrowForwardOutline className="w-4 h-4 text-secondary" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
