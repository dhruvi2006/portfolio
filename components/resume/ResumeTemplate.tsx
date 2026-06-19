"use client";

import { forwardRef } from "react";
import resumeData, { type ResumeData } from "@/data/resume-data";
import {
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
  IoChevronForward,
} from "react-icons/io5";
import { FiGithub, FiLinkedin } from "react-icons/fi";

/* ─── Section Heading ─── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h2 className="text-sm font-bold text-zinc-900 dark:text-[#fafafa] uppercase tracking-[0.08em]">
        {children}
      </h2>
      <div className="mt-2 h-[3px] w-10 rounded-full bg-zinc-900 dark:bg-white" />
    </div>
  );
}

/* ─── Contact Item ─── */

function ContactItem({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-[#a1a1aa]">
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{children}</span>
    </span>
  );
}

/* ─── External Link ─── */

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm text-zinc-500 dark:text-[#a1a1aa] hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group"
    >
      <span className="border-b border-dotted border-zinc-300 dark:border-[#3f3f46] group-hover:border-blue-400 transition-colors duration-200">
        {children}
      </span>
      <IoChevronForward className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
    </a>
  );
}

/* ─── Skill Badge ─── */

function SkillBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full border border-zinc-200 dark:border-[#262626] bg-white dark:bg-[#171717] text-zinc-700 dark:text-[#a1a1aa]">
      {label}
    </span>
  );
}

/* ─── Main Template ─── */

interface ResumeTemplateProps {
  data?: ResumeData;
  className?: string;
  modalWidth?: boolean;
}

const ResumeTemplate = forwardRef<HTMLDivElement, ResumeTemplateProps>(
  function ResumeTemplate({ data = resumeData, className = "", modalWidth = false }, ref) {
    const {
      name,
      contact,
      summary,
      experience,
      education,
      projects,
      profiles,
      skills,
      interests,
      languages,
    } = data;

    return (
      <div
        ref={ref}
        className={`bg-white dark:bg-[#171717] text-zinc-900 dark:text-[#fafafa] print-keep ${className}`}
        style={{
          width: modalWidth ? "min(calc(85vw - 3rem), 1020px)" : "auto",
        }}
      >
        {/* ═══════════════════════════════════════════════════════════
            PAGE 1
           ═══════════════════════════════════════════════════════════ */}
        <div
          id="page-1"
          className="mx-auto"
          style={{
            maxWidth: 850,
            padding: "48px 56px",
            fontFamily: "'Inter', 'Inter Variable', system-ui, -apple-system, sans-serif",
          }}
        >
          {/* ── HEADER ── */}
          <div className="mb-10">
            <h1
              className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.05]"
              style={{ fontFamily: "'Inter', 'Inter Variable', system-ui, -apple-system, sans-serif" }}
            >
              {name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <ContactItem icon={IoMailOutline}>{contact.email}</ContactItem>
              <ContactItem icon={IoCallOutline}>{contact.phone}</ContactItem>
              <ContactItem icon={IoLocationOutline}>{contact.location}</ContactItem>
              {profiles.map((p) => (
                <span key={p.platform} className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-[#a1a1aa]">
                  {p.platform === "Github" ? (
                    <FiGithub className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <FiLinkedin className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {p.username}
                  </a>
                </span>
              ))}
            </div>
          </div>

          {/* ── SUMMARY ── */}
          <div className="mb-10">
            <SectionHeading>Summary</SectionHeading>
            <p
              className="text-[16px] leading-[1.8] text-zinc-600 dark:text-[#a1a1aa]"
              style={{ maxWidth: 720 }}
            >
              {summary}
            </p>
          </div>

          {/* ── EXPERIENCE ── */}
          <div className="mb-10">
            <SectionHeading>Experience</SectionHeading>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-zinc-200 dark:border-[#262626] bg-white dark:bg-[#1a1a1a] p-5 sm:p-6 transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-[#3f3f46]"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
                >
                  {/* Mobile: stack vertically | Desktop: two-column */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mb-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                        {exp.company}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-[#a1a1aa] mt-0.5">
                        {exp.role}
                      </p>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <p className="text-sm font-medium text-zinc-600 dark:text-[#a1a1aa]">
                        {exp.location}
                      </p>
                      <p className="text-xs text-zinc-400 dark:text-[#71717a] mt-0.5">
                        {exp.duration}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-[#a1a1aa] mb-2">
                    {exp.description}
                  </p>
                  {exp.website && (
                    <ExternalLink href={exp.website}>
                      {exp.website.replace(/https?:\/\//, "").replace(/\/$/, "")}
                    </ExternalLink>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── EDUCATION ── */}
          <div className="mb-10">
            <SectionHeading>Education</SectionHeading>
            {education.map((edu, i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-200 dark:border-[#262626] bg-white dark:bg-[#1a1a1a] p-5 sm:p-6 transition-all duration-200 hover:shadow-md"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                      {edu.institution}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-[#a1a1aa] mt-0.5">
                      {edu.degree}
                    </p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <p className="text-sm font-medium text-zinc-600 dark:text-[#a1a1aa]">
                      {edu.location}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-[#71717a] mt-0.5">
                      {edu.duration}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── PROJECTS ── */}
          <div className="mb-10">
            <SectionHeading>Projects</SectionHeading>
            <div className="space-y-4">
              {projects.slice(0, 4).map((proj, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-zinc-200 dark:border-[#262626] bg-white dark:bg-[#1a1a1a] p-5 sm:p-6 transition-all duration-200 hover:shadow-md"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
                >
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    {proj.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-[#a1a1aa] mt-1.5 mb-1.5">
                    {proj.description}
                  </p>
                  {proj.link && (
                    <ExternalLink href={proj.link}>
                      {proj.link.replace(/https?:\/\//, "").replace(/\/$/, "")}
                    </ExternalLink>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            PAGE 2
           ═══════════════════════════════════════════════════════════ */}
        <div
          id="page-2"
          className="mx-auto"
          style={{
            maxWidth: 850,
            padding: "48px 56px",
            fontFamily: "'Inter', 'Inter Variable', system-ui, -apple-system, sans-serif",
          }}
        >
          {/* ── PROJECTS (continued) ── */}
          <div className="mb-10">
            <SectionHeading>Projects (continued)</SectionHeading>
            <div className="space-y-4">
              {projects.slice(4).map((proj, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-zinc-200 dark:border-[#262626] bg-white dark:bg-[#1a1a1a] p-5 sm:p-6 transition-all duration-200 hover:shadow-md"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
                >
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    {proj.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-[#a1a1aa] mt-1.5 mb-1.5">
                    {proj.description}
                  </p>
                  {proj.link && (
                    <ExternalLink href={proj.link}>
                      {proj.link.replace(/https?:\/\//, "").replace(/\/$/, "")}
                    </ExternalLink>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── SKILLS ── */}
          <div className="mb-10">
            <SectionHeading>Skills</SectionHeading>
            <div className="space-y-5">
              {skills.map((skill) => (
                <div key={skill.category}>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-2">
                    {skill.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.skills.map((s) => (
                      <SkillBadge key={s} label={s} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── INTERESTS ── */}
          <div className="mb-10">
            <SectionHeading>Interests</SectionHeading>
            <div className="space-y-3">
              {interests.map((interest, i) => (
                <div key={i}>
                  <span className="text-sm font-bold text-zinc-900 dark:text-white">
                    {interest.title}
                  </span>
                  <span className="text-sm text-zinc-500 dark:text-[#a1a1aa]">
                    {" "}— {interest.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── LANGUAGES ── */}
          <div>
            <SectionHeading>Languages</SectionHeading>
            <div className="flex flex-wrap gap-6">
              {languages.map((lang, i) => (
                <div key={i} className="flex-1 min-w-[140px]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">
                      {lang.language}
                    </span>
                    <span className="text-xs text-zinc-400 dark:text-[#71717a]">
                      {lang.proficiency}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-100 dark:bg-[#262626] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-zinc-900 dark:bg-white transition-all duration-500"
                      style={{ width: `${lang.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ResumeTemplate.displayName = "ResumeTemplate";

export default ResumeTemplate;
