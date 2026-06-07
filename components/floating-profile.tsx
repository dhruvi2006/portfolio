"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { useScrollState } from "@/components/scroll-context";

export function FloatingProfile() {
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
          className="fixed top-3 right-8 w-16 h-16 rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/20 bg-background/60 backdrop-blur-xl z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
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

        </motion.div>
      )}
    </AnimatePresence>
  );
}
