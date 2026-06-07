"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoArrowForwardOutline, IoLocationOutline, IoDocumentTextOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0, 1] as const,
    },
  },
};

const MagneticButton = ({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "outline";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <a href={href}>
          <Button
            variant={variant === "primary" ? "primary" : "outline"}
            size="lg"
            className="group cursor-pointer"
          >
            {children}
          </Button>
        </a>
      </motion.div>
    </div>
  );
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle background dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-foreground) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <Badge variant="accent" className="text-xs tracking-widest uppercase px-4 py-1.5">
                Building Production-Ready Software Products
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.9] text-foreground mb-6"
            >
              Dhruvi
              <br />
              <span className="text-accent">Mittal</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-secondary leading-relaxed mb-4 max-w-lg"
            >
              Full-Stack Developer & AI Engineer. Co-Founder at Shudveta.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base text-secondary/80 leading-relaxed mb-8 max-w-md"
            >
              Building production-ready software across web, mobile, AI, and automation. Currently pursuing BCA while shipping applications that solve real-world problems.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 text-sm text-secondary mb-10"
            >
              <IoLocationOutline className="w-4 h-4" />
              <span>Delhi, India</span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton href="#projects" variant="primary">
                View Projects
                <IoArrowForwardOutline className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </MagneticButton>
              <MagneticButton href="/resume.pdf" variant="outline">
                <IoDocumentTextOutline className="w-4 h-4" />
                Download Resume
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right Side - Portrait */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex justify-center items-center"
          >
            <motion.div variants={itemVariants} className="relative">
              <motion.div
                className="relative w-[400px] h-[400px] rounded-3xl overflow-hidden border border-border shadow-sm"
                style={{ filter: "grayscale(100%)" }}
                whileHover={{ filter: "grayscale(0%)" }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0, 1],
                }}
              >
                <Image
                  src="/myimage.png"
                  alt="Dhruvi Mittal portrait"
                  fill
                  className="object-cover"
                  sizes="400px"
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border-2 border-border flex items-start justify-center p-1"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-secondary"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
