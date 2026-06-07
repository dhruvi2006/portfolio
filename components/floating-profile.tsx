"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useTheme } from "@/components/theme-provider";
import { useScrollState } from "@/components/scroll-context";

export function FloatingProfile() {
  const { dark, toggleTheme } = useTheme();
  const { scrolledPast } = useScrollState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR safety: don't render anything until mounted
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {scrolledPast && (
        <motion.div
          key="floating-portrait"
          className="fixed top-3 right-8 w-16 h-16 rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/20 bg-background/60 backdrop-blur-xl z-[60] cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={toggleTheme}
          whileHover={{ scale: 1.08 }}
        >
          <Image
            src="/myimage.png"
            alt="Dhruvi Mittal"
            width={64}
            height={64}
            className="object-cover w-full h-full"
            priority
          />

          {/* Mini theme toggle icon */}
          <div className="absolute inset-0 flex items-end justify-end pb-1 pr-1 pointer-events-none">
            <div className="w-3.5 h-3.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/60 flex items-center justify-center shadow-xs">
              {dark ? (
                <IoSunnyOutline className="w-2 h-2 text-foreground" />
              ) : (
                <IoMoonOutline className="w-2 h-2 text-foreground" />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
