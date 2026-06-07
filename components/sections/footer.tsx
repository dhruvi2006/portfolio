"use client";

import { motion } from "framer-motion";
import { IoArrowUpOutline, IoLogoLinkedin, IoLogoGithub } from "react-icons/io5";

const socialLinks = [
  { icon: IoLogoLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/dhruvimit06" },
  { icon: IoLogoGithub, label: "GitHub", href: "https://github.com/dhruvi2006" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-foreground">Dhruvi Mittal</p>
            <p className="text-xs text-secondary mt-1">Made in Delhi, India</p>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-xs text-secondary hover:text-foreground transition-colors duration-200"
              >
                <link.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{link.label}</span>
              </a>
            ))}
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 text-xs text-secondary hover:text-foreground transition-colors duration-200 cursor-pointer"
            aria-label="Scroll to top"
          >
            Back to top
            <IoArrowUpOutline className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-[11px] text-secondary/50">
            &copy; {new Date().getFullYear()} Dhruvi Mittal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
