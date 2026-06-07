"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-16">
          <a
            href="#"
            className="text-sm font-semibold text-foreground tracking-tight"
          >
            DM
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={cn(
                  "relative px-4 py-2 text-xs font-medium rounded-lg transition-colors duration-200",
                  activeSection === link.href.slice(1)
                    ? "text-foreground"
                    : "text-secondary hover:text-foreground"
                )}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-muted rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="md:hidden">
            <MobileMenu navLinks={navLinks} handleClick={handleClick} />
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function MobileMenu({
  navLinks,
  handleClick,
}: {
  readonly navLinks: readonly { readonly label: string; readonly href: string }[];
  handleClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
        aria-label="Toggle menu"
      >
        <div className="w-4 flex flex-col gap-1">
          <motion.span
            animate={open ? { rotate: 45, y: 2.5 } : { rotate: 0, y: 0 }}
            className="block h-px w-full bg-foreground"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block h-px w-full bg-foreground"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -2.5 } : { rotate: 0, y: 0 }}
            className="block h-px w-full bg-foreground"
          />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleClick(e, link.href);
                    setOpen(false);
                  }}
                  className="block py-2.5 text-sm text-secondary hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
