"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoArrowForwardOutline, IoCodeSlashOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
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

function ProjectCard({
  project,
  onDetailsClick,
}: {
  project: Project;
  onDetailsClick: (project: Project) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0, 1] as const }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group flex flex-col h-full p-6 rounded-2xl",
        "bg-white border border-zinc-100",
        "shadow-sm hover:shadow-lg hover:-translate-y-0.5",
        "transition-all duration-300 cursor-default"
      )}
    >
      {/* IMAGE — hero element at top */}
      <div className="relative h-[200px] rounded-xl overflow-hidden mb-5 shrink-0">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
          className="relative w-full h-full"
        >
          {project.image && !imgError ? (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : project.title === "IPD Now" ? (
            <IPD3DLogo />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-zinc-50">
              <IoCodeSlashOutline className="w-8 h-8 text-zinc-300" />
              <span className="text-xs font-medium text-zinc-400">Coming Soon</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* CATEGORY BADGE */}
      <span className="inline-block text-[11px] tracking-[0.15em] uppercase font-semibold text-zinc-400 mb-3">
        {project.category}
      </span>

      {/* TITLE */}
      <h3 className="text-xl font-semibold tracking-tight text-zinc-900 mb-3 leading-snug">
        {project.title}
      </h3>

      {/* DESCRIPTION — fixed height for alignment */}
      <div className="min-h-[4.2rem] mb-4">
        <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3">
          {project.description}
        </p>
        {project.description2 && (
          <p className="text-sm text-zinc-400 leading-relaxed mt-2 line-clamp-2">
            {project.description2}
          </p>
        )}
      </div>

      {/* TECH STACK — fixed height for alignment */}
      <div className="flex flex-wrap gap-1.5 mb-5 min-h-[1.75rem]">
        {project.technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className={cn(
              "text-[11px] px-2.5 py-1 rounded-md border transition-colors duration-200",
              tech === "+1 more"
                ? "border-zinc-200 text-zinc-400 bg-zinc-50"
                : "border-zinc-100 text-zinc-500 bg-zinc-50"
            )}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* FOOTER — pushed to bottom via mt-auto */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-zinc-100">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-zinc-500 hover:text-zinc-900 px-0 cursor-pointer"
          onClick={() => onDetailsClick(project)}
        >
          Details
        </Button>
        {project.launchUrl ? (
          <a
            href={project.launchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 bg-zinc-50 hover:bg-zinc-900 hover:text-white border border-zinc-100"
          >
            <IoArrowForwardOutline className="w-4 h-4" />
          </a>
        ) : (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-300">
            <IoArrowForwardOutline className="w-4 h-4" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 bg-[#f7f7f7]">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* SECTION HEADER — single horizontal row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            {/* Left — text */}
            <div>
              <span className="block text-[13px] tracking-[0.25em] uppercase font-semibold text-zinc-400">
                Work
              </span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight">
                Selected Projects
              </h2>
              <p className="mt-2 max-w-xl text-base text-zinc-500 leading-relaxed">
                Shipped products solving healthcare, logistics, and operational
                challenges.
              </p>
            </div>

            {/* Right — filter buttons */}
            <div className="flex gap-2.5 flex-wrap shrink-0">
              <button className="h-10 px-4 rounded-lg bg-zinc-900 text-white text-sm font-medium whitespace-nowrap transition-colors hover:bg-zinc-800">
                All Projects
              </button>
              <button className="h-10 px-4 rounded-lg border border-zinc-200 text-zinc-500 text-sm font-medium whitespace-nowrap transition-colors hover:border-zinc-300 hover:text-zinc-700">
                AI &amp; Healthcare
              </button>
              <button className="h-10 px-4 rounded-lg border border-zinc-200 text-zinc-500 text-sm font-medium whitespace-nowrap transition-colors hover:border-zinc-300 hover:text-zinc-700">
                Web &amp; E-Commerce
              </button>
              <button className="h-10 px-4 rounded-lg border border-zinc-200 text-zinc-500 text-sm font-medium whitespace-nowrap transition-colors hover:border-zinc-300 hover:text-zinc-700">
                Mobile Apps
              </button>
            </div>
          </div>
        </motion.div>

        {/* PROJECT GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onDetailsClick={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
