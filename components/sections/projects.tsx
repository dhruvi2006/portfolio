"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { IoArrowForwardOutline, IoOpenOutline, IoCodeSlashOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ProjectDetailModal } from "@/components/project-detail";
import { IPD3DLogo } from "@/components/IPD3DLogo";

interface Project {
  title: string;
  category: string;
  description: string;
  description2?: string;
  challenge?: string;
  technologies: string[];
  image: string | null;
  launchUrl: string | null;
  features?: string[];
  highlights?: string[];
}

const projects: Project[] = [
  {
    title: "MiAssured",
    category: "Healthcare",
    description:
      "A comprehensive healthcare platform connecting patients with medical services, featuring appointment scheduling, telemedicine, and health record management.",
    technologies: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
    image: "/projects/miassured.png",
    launchUrl: "https://miassuredalpha.vercel.app/dashboard",
    features: [
      "Appointment scheduling with real-time availability",
      "Telemedicine consultations with video integration",
      "Patient health record management",
      "Multi-user role system (patients, doctors, admin)",
    ],
    highlights: ["HIPAA Compliant", "Real-time Sync", "Multi-platform"],
    challenge:
      "Healthcare providers struggled with fragmented patient management systems. Scheduling, telemedicine, and records were siloed across different platforms, creating friction for both patients and doctors.",
  },
  {
    title: "IPD Now",
    category: "Healthcare",
    description:
      "In-patient department management system streamlining hospital admissions, bed management, and patient care coordination with real-time updates.",
    technologies: ["React Native", "Expo", "Firebase", "Node.js"],
    image: null,
    launchUrl: "https://shudveta.com/blogs/introducing-ipd-now",
    features: [
      "Real-time bed availability tracking",
      "Patient admission and discharge management",
      "Doctor assignment and scheduling",
      "Digital patient records and history",
    ],
    highlights: ["Cross-platform", "Real-time", "Hospital Management"],
    challenge:
      "Hospitals lacked a unified system for managing in-patient departments. Bed allocation, admissions, and doctor assignments were handled manually, leading to delays and miscommunication.",
  },
  {
    title: "Dr Healio",
    category: "HealthTech",
    description:
      "AI-powered health assistant platform providing symptom analysis, health insights, and personalized wellness recommendations.",
    technologies: ["Next.js", "OpenAI", "FastAPI", "MongoDB"],
    image: null,
    launchUrl: null,
    features: [
      "AI-powered symptom analysis and assessment",
      "Personalized health and wellness insights",
      "Secure patient data management",
      "Integration with healthcare providers",
    ],
    highlights: ["AI-Powered", "HIPAA Compliant", "Personalized Care"],
    challenge:
      "Patients often struggled to understand their symptoms and navigate the healthcare system. Accessing reliable health insights before consulting a doctor was time-consuming and confusing.",
  },
  {
    title: "Lubeck Elevators Ecosystem",
    category: "Enterprise",
    description:
      "Complete digital ecosystem for Lubeck Elevators including client portals, admin dashboards, and service management systems.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    image: "/projects/elevators.png",
    launchUrl: "http://lubeckelevators.com",
    features: [
      "Client portal with project tracking",
      "Admin dashboard with analytics",
      "Service request and maintenance management",
      "Inventory and parts management system",
    ],
    highlights: ["Enterprise-grade", "Multi-tenant", "Real-time Analytics"],
    challenge:
      "Lubeck Elevators operated across multiple sites with disconnected systems for client management, service requests, and inventory. This fragmentation led to inefficiencies and delayed response times.",
  },
  {
    title: "Lubeck Exports Commerce",
    category: "E-Commerce",
    description:
      "Full-featured e-commerce platform for Lubeck Exports with inventory management, order processing, and international shipping integration.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/projects/HOME DECOR.png",
    launchUrl: "https://lubeckexports.com",
    features: [
      "International product catalog and showcase",
      "Order processing with Stripe integration",
      "Inventory and supply chain management",
      "Multi-currency and shipping calculations",
    ],
    highlights: ["Stripe Payments", "Multi-currency", "Global Shipping"],
    challenge:
      "Lubeck Exports needed a modern e-commerce presence to showcase their products globally. Their existing manual order processing couldn't scale with growing international demand.",
  },
  {
    title: "Smart Ethnics",
    category: "E-Commerce",
    description:
      "Modern e-commerce platform for ethnic wear with AI-powered recommendations, size prediction, and seamless shopping experience.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    image: "/projects/smart ethnic.png",
    launchUrl: null,
    features: [
      "AI-powered size prediction and fit recommendations",
      "Personalized product recommendations",
      "Virtual try-on integration",
      "Seamless checkout experience",
    ],
    highlights: ["AI Recommendations", "Supabase Backend", "Responsive Design"],
    challenge:
      "Online ethnic wear shoppers struggled with sizing uncertainty and generic product recommendations. The lack of personalized guidance led to high return rates and abandoned carts.",
  },
  {
    title: "FSK Foil Products",
    category: "Manufacturing",
    description:
      "Digital platform for FSK Foil Products showcasing manufacturing capabilities, product catalog, and client management system.",
    technologies: ["React", "Firebase", "Tailwind", "Node.js"],
    image: "/projects/fskfoil.png",
    launchUrl: "https://fskfoil.com",
    features: [
      "Product catalog with detailed specifications",
      "Client inquiry and quotation system",
      "Manufacturing capability showcase",
      "Admin dashboard for content management",
    ],
    highlights: ["Firebase Backend", "Client Portal", "Manufacturing"],
    challenge:
      "FSK Foil Products needed a digital presence to showcase their manufacturing capabilities. Potential clients had no way to browse products or submit inquiries online efficiently.",
  },
  {
    title: "Ridezo",
    category: "Transportation",
    description:
      "Ride-sharing and transportation platform with real-time tracking, fare estimation, and driver management features.",
    technologies: ["React Native", "Expo", "Firebase", "Google Maps API"],
    image: "/projects/Ridezo.png",
    launchUrl: "https://goridezo.com",
    features: [
      "Real-time ride tracking with Google Maps",
      "Fare estimation and dynamic pricing",
      "Driver onboarding and management",
      "In-app chat and notifications",
    ],
    highlights: ["Real-time Tracking", "Google Maps", "Cross-platform"],
    challenge:
      "Urban commuters in India lacked affordable, reliable ride-sharing options. Existing platforms were either too expensive or didn't offer the features needed for daily commutes.",
  },
  {
    title: "Forkup",
    category: "FoodTech",
    description:
      "Food discovery and ordering platform connecting users with local restaurants, featuring smart recommendations and order tracking.",
    technologies: ["React Native", "Expo", "Node.js", "MongoDB"],
    image: "/projects/forkup.png",
    launchUrl: "https://forkups.vercel.app",
    features: [
      "Restaurant discovery with smart search",
      "Real-time order tracking",
      "Personalized food recommendations",
      "Integrated payment and delivery system",
    ],
    highlights: ["Food Discovery", "Real-time Tracking", "Smart Recommendations"],
    challenge:
      "Food lovers struggled to discover new restaurants and track orders seamlessly. Existing platforms offered fragmented experiences with poor personalization.",
  },
  {
    title: "Zynced AI",
    category: "MULTI-AGENT AI PLATFORM",
    description:
      "AI workspace where multiple specialized agents collaborate to deliver more accurate and thoughtful responses.",
    description2:
      "Enhances response quality through collaborative AI reasoning, enabling deeper analysis, reduced hallucinations, and a more human-like problem-solving experience.",
    technologies: ["AI Agents", "LLMs", "Voice Interface", "Automation Engine", "+1 more"],
    image: null,
    launchUrl: "https://zynced.chat",
    features: [
      "Multi-agent collaborative AI workspace",
      "Advanced LLM integration for nuanced responses",
      "Voice interface for natural interaction",
      "Automation engine for workflow optimization",
    ],
    highlights: ["Multi-Agent AI", "Voice Interface", "Collaborative Reasoning"],
    challenge:
      "Traditional AI assistants relied on single-model responses, leading to hallucinations and superficial answers. Users needed a collaborative AI system capable of deeper reasoning and more accurate insights.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

function ProjectCard({
  project,
  onDetailsClick,
}: {
  project: Project;
  onDetailsClick: (project: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "0.9 1"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.25, 0.1, 0, 1] as const },
        },
      }}
      style={{ opacity }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative p-8 sm:p-10 rounded-2xl border border-border bg-card",
        "transition-all duration-500 cursor-default overflow-hidden",
        "shadow-sm hover:shadow-xl hover:-translate-y-0.5"
      )}
    >
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <Badge
              variant="default"
              className="text-[11px] tracking-wide uppercase mb-3"
            >
              {project.category}
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              {project.title}
            </h3>
          </div>

          <motion.div
            animate={{ x: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] as const }}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300",
              isHovered ? "bg-accent/10" : "bg-muted"
            )}>
              <IoArrowForwardOutline className={cn(
                "w-5 h-5 transition-colors duration-300",
                isHovered ? "text-accent" : "text-foreground"
              )} />
            </div>
          </motion.div>
        </div>

        {/* Description */}
        <div className="space-y-3 mb-8">
          <p className="text-sm text-secondary leading-relaxed max-w-xl">
            {project.description}
          </p>
          {project.description2 && (
            <p className="text-sm text-secondary/80 leading-relaxed max-w-xl">
              {project.description2}
            </p>
          )}
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className={cn(
                "text-xs px-3 py-1 rounded-full border transition-colors duration-300",
                tech === "+1 more"
                  ? "border-accent/20 text-accent bg-accent/5"
                  : "bg-muted border-border text-secondary"
              )}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project Image Preview */}
        <div className={cn(
          "mt-8 rounded-xl overflow-hidden",
          project.image && !imgError
            ? "h-40 sm:h-48 bg-muted/50 border border-border/50"
            : "h-32 sm:h-36 bg-muted/30 border border-border/30"
        )}>
          {project.image && !imgError ? (
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-full"
            >
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                className="object-cover"
                onError={() => setImgError(true)}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          ) : project.title === "IPD Now" ? (
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full"
            >
              <IPD3DLogo />
            </motion.div>
          ) : (
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full flex flex-col items-center justify-center gap-2 text-secondary/40"
            >
              <IoCodeSlashOutline className="w-8 h-8" />
              <span className="text-xs">Coming Soon</span>
            </motion.div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-6">
          {project.launchUrl && (
            <a
              href={project.launchUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="group/btn text-xs cursor-pointer">
                <IoOpenOutline className="w-3.5 h-3.5" />
                Launch Project
              </Button>
            </a>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="text-xs cursor-pointer"
            onClick={() => onDetailsClick(project)}
          >
            Details
          </Button>
        </div>
      </div>

      {/* Subtle hover border */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-accent/10 transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] as const }}
          className="mb-20"
        >
          <span className="text-xs tracking-widest uppercase text-secondary font-medium">
            Projects
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] mt-4">
            Products I&apos;ve{" "}
            <span className="text-accent">Built</span>
          </h2>
          <p className="text-secondary mt-4 max-w-lg text-sm leading-relaxed">
            Real applications shipping in production. Each project represents a unique
            challenge — from healthcare and e-commerce to AI-powered platforms.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onDetailsClick={setSelectedProject}
            />
          ))}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
