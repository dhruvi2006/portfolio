"use client";

import { motion } from "framer-motion";
import {
  IoCodeSlashOutline,
  IoRocketOutline,
  IoPeopleOutline,
  IoBarcodeOutline,
  IoLocationOutline,
  IoHardwareChipOutline,
  IoPhonePortraitOutline,
  IoBulbOutline,
} from "react-icons/io5";

const stats = [
  {
    metric: "15+",
    label: "Projects Delivered",
    description: "Production applications shipped across web, mobile, and AI",
    icon: IoRocketOutline,
  },
  {
    metric: "4+",
    label: "Organizations",
    description: "Worked with startups and established companies",
    icon: IoPeopleOutline,
  },
  {
    metric: "6+",
    label: "Technologies",
    description: "Modern frameworks and tools in daily use",
    icon: IoCodeSlashOutline,
  },
  {
    metric: "BCA",
    label: "Current Pursuit",
    description: "Building while studying Computer Applications",
    icon: IoBarcodeOutline,
  },
];

const services = [
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
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Stats / Metrics Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] as const }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-20 md:mb-24"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative p-5 rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                  <stat.icon className="w-4 h-4 text-foreground/60" />
                </div>
                <div className="min-w-0">
                  <div className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground mb-0.5">
                    {stat.metric}
                  </div>
                  <div className="text-xs font-medium text-secondary mb-1">
                    {stat.label}
                  </div>
                  <p className="text-[11px] text-secondary/60 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main About Content */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] as const }}
          >
            <span className="text-xs tracking-widest uppercase text-secondary font-medium">
              About Me
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] mt-4 mb-6">
              I build products that solve{" "}
              <span className="text-accent">real problems</span>
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
                measurable impact for businesses and their users. From healthcare platforms
                to AI-powered tools, every project is an opportunity to push what&apos;s
                possible with modern technology.
              </p>
            </div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0, 1] as const, delay: 0.3 }}
              className="mt-8 flex items-center gap-2 text-sm text-secondary"
            >
              <IoLocationOutline className="w-4 h-4" />
              <span>Delhi, India</span>
            </motion.div>
          </motion.div>

          {/* Right - Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {services.map((card) => (
              <motion.div
                key={card.title}
                variants={cardVariants}
                className="group relative p-6 rounded-2xl border border-border bg-card transition-all duration-300 cursor-default hover:shadow-sm hover:-translate-y-1"
              >
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors duration-300">
                    <card.icon className="w-5 h-5 text-foreground group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
