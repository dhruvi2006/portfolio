export interface ResumeData {
  name: string;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  profiles: Profile[];
  skills: SkillCategory[];
  interests: Interest[];
  languages: Language[];
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  duration: string;
  description: string;
  website?: string;
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  duration: string;
  graduationLabel: string;
}

export interface Project {
  name: string;
  description: string;
  link?: string;
}

export interface Profile {
  platform: string;
  username: string;
  url: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
  level: number;
}

export interface Interest {
  title: string;
  description: string;
}

export interface Language {
  language: string;
  proficiency: string;
  level: number;
}

const resumeData: ResumeData = {
  name: "Dhruvi Mittal",
  contact: {
    email: "dhruvimittal0608@gmail.com",
    phone: "8708682967",
    location: "Delhi, India",
  },
  summary:
    "Full-Stack Developer and startup builder experienced in Next.js, React Native, FastAPI, and Firebase, focused on developing scalable AI-powered web and mobile applications. Skilled in real-time AI systems, automation, and cloud integrations with a strong emphasis on performance, user experience, and product-driven development.",
  experience: [
    {
      company: "Shudveta IT Solutions",
      role: "Co-Founder",
      location: "Delhi, India",
      duration: "January 2025 - Current",
      website: "https://shudveta.in",
      description:
        "Leading product development and technical strategy at Shudveta, building scalable AI, healthcare, and automation solutions including IPD Now and Dr. Healio.",
    },
    {
      company: "Lubeck Elevators",
      role: "Software Developer",
      location: "Delhi, India",
      duration: "June 2025 - July 2025",
      website: "http://lubeckelevators.com/",
      description:
        "Developed digital solutions for Lubeck Elevators, including the company website, internal team management system, and client app for complaint tracking, technician assignment, and streamlined elevator service operations.",
    },
    {
      company: "Lubeck Exports",
      role: "Web Developer",
      location: "Hybrid",
      duration: "July 2025 - August 2025",
      website: "https://lubeckexports.com/",
      description:
        "Developed and deployed an e-commerce platform for Lubeck Exports with API-integrated product and order management, data parsing, and a custom admin panel for streamlined business operations.",
    },
    {
      company: "iTuple Technologies",
      role: "Software Developer Intern",
      location: "Gurgaon, India",
      duration: "January 2026 - May 2026",
      website: "https://www.ituple.com/",
      description:
        "Contributed to software development, web-based solutions, API integrations, and debugging at iTuple Technologies. Collaborated to enhance application performance, solve technical challenges, and gain hands-on experience with real-world development workflows.",
    },
  ],
  education: [
    {
      institution: "Vivekananda Institute of Professional Studies",
      degree: "Bachelor of Computer Applications (BCA)",
      location: "Delhi, India",
      duration: "August 2024 - Present",
      graduationLabel: "Graduation",
    },
  ],
  projects: [
    {
      name: "IPD Now",
      link: "https://shudveta.in/projects",
      description:
        "Developed and scaled IPD Now, an AI-first health management platform focused on centralized digital healthcare and intelligent patient care. Built features for secure health record management, AI-powered healthcare assistance through Dr. Healio, and streamlined healthcare workflows to enhance accessibility, efficiency, and user experience.",
    },
    {
      name: "MiAssured",
      link: "https://miassuredalpha.vercel.app",
      description:
        "Developed MiAssured, an AI-powered insurance insights platform that analyzes insurance documents and transforms complex policy information into interactive visual dashboards, charts, and simplified insights. Enabled users to chat with their insurance data for easier understanding, decision-making, and policy management.",
    },
    {
      name: "Lubeck Elevator's User, Internal App & Website",
      link: "http://lubeckelevators.com/",
      description:
        "Built the Lubeck Elevators digital ecosystem, including the company website, internal team management system, and client app for complaint handling, technician assignment, and service workflow management.",
    },
    {
      name: "Lubeck Exports' Website",
      link: "https://lubeckexports.com/",
      description:
        "Developed and deployed Lubeck Exports, an e-commerce platform with API-integrated product and order management, data parsing, order placement workflows, and a custom admin panel for streamlined business operations and inventory management.",
    },
    {
      name: "Smart Ethnics Platform",
      description:
        "Developed and deployed a full-featured e-commerce platform for Smart Ethnics (via Shudveta IT Solutions), featuring a secure online store and a comprehensive admin dashboard for seamless product, order, inventory, and payment management, ensuring an efficient and user-friendly shopping experience.",
    },
    {
      name: "FSK Foil Products Website",
      link: "https://fskfoil.com/",
      description:
        "Designed and developed a product showcase website for FSK Foil Products (via Shudveta IT Solutions) to present Foil-Scrim-Kraft insulation materials and educate users about their industrial applications.",
    },
    {
      name: "Ridezo Transportation Platform",
      link: "https://goridezo.com/",
      description:
        "Developed a WhatsApp-based transportation booking landing page for Ridezo under Shudveta IT Solutions, enabling users to quickly book rides.",
    },
    {
      name: "Forkup - Italian Pasta Website",
      link: "https://forkups.vercel.app/",
      description:
        "Developed a modern restaurant website for Forkup, showcasing the menu and enabling seamless online ordering while aligning with the brand's premium identity.",
    },
  ],
  profiles: [
    {
      platform: "Github",
      username: "dhruvi2006",
      url: "https://github.com/dhruvi2006",
    },
    {
      platform: "LinkedIn",
      username: "dhruvimit06",
      url: "https://www.linkedin.com/in/dhruvimit06",
    },
  ],
  skills: [
    {
      category: "Web Development & SEO",
      skills: [
        "React.js",
        "Tailwind CSS",
        "HTML",
        "CSS",
        "Next.js",
        "TypeScript",
        "SEO Optimization",
      ],
      level: 90,
    },
    {
      category: "Mobile App Development",
      skills: [
        "React Native",
        "Expo",
        "Firebase",
        "API Integration",
      ],
      level: 80,
    },
    {
      category: "AI Integration & Automation",
      skills: [
        "OpenAI API",
        "Gemini API",
        "Hugging Face API",
        "Automation Workflows",
        "Webhooks",
      ],
      level: 85,
    },
    {
      category: "Backend & APIs",
      skills: [
        "FastAPI",
        "Node.js",
        "Supabase",
        "MongoDB",
        "REST APIs",
        "Docker",
        "GitHub Actions",
      ],
      level: 85,
    },
  ],
  interests: [
    {
      title: "Web3 & Blockchain",
      description: "Passionate about decentralization and its impact on the future of tech",
    },
    {
      title: "Entrepreneurship & Startups",
      description: "Creating and scaling tech-driven ventures like Shudveta",
    },
  ],
  languages: [
    { language: "Hindi", proficiency: "Native", level: 100 },
    { language: "English", proficiency: "Fluent", level: 85 },
  ],
};

export default resumeData;
