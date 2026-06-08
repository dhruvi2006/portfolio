"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useScrollState } from "@/components/scroll-context";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrolledPast } = useScrollState();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] as const }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300",
            scrolled ? "h-16" : "h-[88px]"
          )}
        >            {/* Left — Brand */}
          <motion.a
            href="#"
            className={cn(
              "text-lg font-semibold tracking-tight select-none transition-all duration-300",
              scrolled ? "text-white" : "text-[#111111]"
            )}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            DM
          </motion.a>

          {/* Center — Navigation */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                    isActive
                      ? (scrolled ? "text-white" : "text-[#111111]")
                      : (scrolled
                        ? "text-white/70 hover:text-white"
                        : "text-[#111111]/70 hover:text-[#111111]"
                      ),
                    scrolled
                      ? "hover:bg-white/[0.08]"
                      : "hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Animated underline — slides between active links */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-underline"
                      className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-accent"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right — Actions */}
          <div className="flex items-center gap-3">
            {/* Avatar — morphs from hero on scroll */}
            <AnimatePresence mode="popLayout">
              {scrolledPast && (
                <motion.div
                  key="nav-avatar"
                  layoutId="profile-image"
                  className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-white/20 shadow-sm shrink-0 self-end -mb-8 cursor-pointer"
                  onClick={() => {
                    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Scroll to top"
                >
                  <Image
                    src="/myimage.png"
                    alt="Dhruvi Mittal"
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                    priority
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Resume button — visible on md+ */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300",
                scrolled
                  ? "text-white border-white/25 hover:border-white/50 hover:text-white"
                  : "text-[#111111] border-[#111111]/20 hover:border-[#111111]/40 hover:text-[#111111]",
                scrolled ? "hover:bg-white/10" : "hover:bg-accent/5"
              )}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <IoDocumentTextOutline className="w-4 h-4" />
              <span>Resume</span>
            </motion.a>

            {/* Mobile menu */}
            <div className="md:hidden">
              <MobileMenu navLinks={navLinks} handleClick={handleClick} scrolled={scrolled} />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function MobileMenu({
  navLinks,
  handleClick,
  scrolled,
}: {
  readonly navLinks: readonly { readonly label: string; readonly href: string }[];
  handleClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  scrolled: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "w-9 h-9 flex items-center justify-center rounded-xl transition-colors duration-200",
          "hover:bg-accent/5"
        )}
        aria-label="Toggle menu"
      >
        <div className="w-4 flex flex-col gap-1">
          <motion.span
            animate={open ? { rotate: 45, y: 2.5 } : { rotate: 0, y: 0 }}
            className={cn("block h-px w-full transition-all duration-300", scrolled ? "bg-white" : "bg-[#111111]")}
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className={cn("block h-px w-full transition-all duration-300", scrolled ? "bg-white" : "bg-[#111111]")}
          />
          <motion.span
            animate={open ? { rotate: -45, y: -2.5 } : { rotate: 0, y: 0 }}
            className={cn("block h-px w-full transition-all duration-300", scrolled ? "bg-white" : "bg-[#111111]")}
          />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-4 right-4 mt-2 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="px-4 py-3 space-y-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleClick(e, link.href);
                    setOpen(false);
                  }}
                  className="block px-4 py-3 text-sm text-secondary hover:text-foreground hover:bg-muted/50 rounded-xl transition-colors duration-150"
                >
                  {link.label}
                </a>
              ))}
              {/* Resume link in mobile */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-accent hover:bg-accent/5 rounded-xl transition-colors duration-150 border-t border-border/30 mt-1 pt-3"
              >
                <IoDocumentTextOutline className="w-4 h-4" />
                <span>Resume</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
