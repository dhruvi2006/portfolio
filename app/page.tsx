"use client";

import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { ExperienceHighlights } from "@/components/sections/experience-highlights";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <ExperienceHighlights />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
