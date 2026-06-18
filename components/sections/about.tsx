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
          animate={{ opacity: 1, y: 0 }}
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
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-20 items-start">
{/* Left - Text */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] as const, delay: 0.1 }}
  className="max-w-[760px]"
>
  {/* Label */}
  <span className="text-sm tracking-[0.35em] uppercase text-secondary/60 font-medium">
    About
  </span>

  {/* Heading */}
  <h2 className="mt-5 mb-10 text-[22px] sm:text-[60px] lg:text-[42px] font-bold tracking-[-0.04em] leading-[0.92] text-foreground max-w-[900px]">
    Building Software That Solves Real Problems
  </h2>

  {/* Content */}
  <div className="space-y-7 text-[16px] leading-[1.75] text-secondary">
    <p>
      I am{" "}
      <span className="font-semibold text-foreground">
        Dhruvi Mittal
      </span>
      , a Full-Stack Developer and AI Engineer currently pursuing a{" "}
      <span className="font-semibold text-foreground">
        Bachelor of Computer Applications (BCA)
      </span>{" "}
      at Vivekananda Institute of Professional Studies, Delhi. As Co-Founder
      at{" "}
      <span className="font-semibold text-foreground">
        Shudveta IT Solutions
      </span>
      , my work focuses on building production-ready web, mobile, and
      AI-powered applications that solve operational and business
      challenges.
    </p>

    <p>
      Over the last few years, I have worked across healthcare technology,
      insurance systems, automation workflows, and intelligent software
      platforms. Projects like{" "}
      <span className="font-semibold text-foreground">IPD Now</span>,{" "}
      <span className="font-semibold text-foreground">MiAssured</span>, and{" "}
      <span className="font-semibold text-foreground">LifeLane</span>{" "}
      reflect my commitment to turning complex requirements into reliable,
      scalable solutions that create measurable value.
    </p>

    <p>
      My approach combines strong technical execution with product thinking,
      ensuring that every system is built not just to function, but to solve
      meaningful problems effectively.
    </p>
  </div>

  {/* Location */}
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      ease: [0.25, 0.1, 0, 1] as const,
      delay: 0.4,
    }}
    className="mt-5 flex items-center gap-3 text-[15px] text-secondary"
  >
    <IoLocationOutline className="w-5 h-5" />
    <span>Delhi, India</span>
  </motion.div>
</motion.div>

          {/* Right - Services Grid */}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 gap-4 mt-10 lg:mt-20"
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
