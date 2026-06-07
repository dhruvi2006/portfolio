"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useScroll } from "framer-motion";

interface ScrollContextType {
  scrolledPast: boolean;
}

const ScrollContext = createContext<ScrollContextType>({ scrolledPast: false });

export function useScrollState() {
  return useContext(ScrollContext);
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleScroll = (v: number) => {
      setScrolledPast(v > window.innerHeight * 0.75);
    };
    const unsubscribe = scrollY.on("change", handleScroll);
    handleScroll(scrollY.get());
    return unsubscribe;
  }, [scrollY, mounted]);

  return (
    <ScrollContext.Provider value={{ scrolledPast: mounted ? scrolledPast : false }}>
      {children}
    </ScrollContext.Provider>
  );
}
