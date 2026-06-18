"use client";

import { forwardRef } from "react";
import resumeData, { type ResumeData } from "@/data/resume-data";

/* ─── Section Heading ─── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="text-[11pt] font-bold text-[#1a56db] uppercase tracking-normal">
        {children}
      </h2>
      <div className="h-px bg-[#1a56db] mt-1.5" />
    </div>
  );
}

/* ─── Skill Bar ─── */

function SkillBar({ level }: { level: number }) {
  return (
    <div className="w-full h-[5pt] bg-gray-100 rounded-none mt-1.5">
      <div
        className="h-full bg-[#1a56db] rounded-none"
        style={{ width: `${level}%` }}
      />
    </div>
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

    /* Shared A4 page styling — full-width A4, premium spacing */
    const pageStyle: React.CSSProperties = {
      width: "210mm",
      minHeight: "297mm",
      padding: "20mm 22mm 18mm",
      fontFamily: "'Georgia', 'Times New Roman', 'IBM Plex Serif', serif",
      lineHeight: 1.5,
      fontSize: "11pt",
      color: "#1a1a1a",
      backgroundColor: "#ffffff",
    };

    return (
      <div
        ref={ref}
        className={`bg-white text-black print-keep ${className}`}
        style={{
          width: modalWidth ? "min(calc(85vw - 3rem), 1000px)" : "auto",
        }}
      >
        {/* ═══════════════════════════════════════════════════════════
            PAGE 1 — Header · Summary · Experience · Education · Projects (first 3)
           ═══════════════════════════════════════════════════════════ */}
        <div id="page-1" style={pageStyle}>
          {/* ── HEADER ── */}
          <div className="mb-6">
            <h1
              className="text-[36pt] font-bold text-black leading-[1.05] tracking-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', 'IBM Plex Serif', serif" }}
            >
              {name}
            </h1>
            <div className="text-[10.5pt] text-gray-600 mt-2 leading-snug">
              <span>{contact.email}</span>
              <span className="mx-2.5 text-gray-400">|</span>
              <span>{contact.phone}</span>
              <span className="mx-2.5 text-gray-400">|</span>
              <span>{contact.location}</span>
            </div>
          </div>

          {/* ── SUMMARY ── */}
          <div className="mb-6">
            <SectionHeading>Summary</SectionHeading>
            <p className="text-[10.5pt] text-gray-700 leading-relaxed">
              {summary}
            </p>
          </div>

          {/* ── EXPERIENCE ── */}
          <div className="mb-6">
            <SectionHeading>Experience</SectionHeading>
            {experience.map((exp, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <span className="text-[12pt] font-bold text-black">
                    {exp.company}
                  </span>
                  <span className="text-right shrink-0 ml-4 text-[10pt] text-gray-600">
                    {exp.location}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mt-0.5">
                  <span className="text-[10.5pt] text-gray-700">
                    {exp.role}
                  </span>
                  <span className="text-right shrink-0 ml-4 text-[10pt] text-gray-600">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-[10pt] text-gray-700 mt-1.5 leading-relaxed">
                  {exp.description}
                </p>
                {exp.website && (
                  <a
                    href={exp.website}
                    className="text-[9.5pt] text-gray-500 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {exp.website.replace(/https?:\/\//, "")}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* ── EDUCATION ── */}
          <div className="mb-6">
            <SectionHeading>Education</SectionHeading>
            {education.map((edu, i) => (
              <div key={i} className="mb-3 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <span className="text-[12pt] font-bold text-black">
                    {edu.institution}
                  </span>
                  <span className="text-right shrink-0 ml-4 text-[10pt] text-gray-600">
                    {edu.graduationLabel}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mt-0.5">
                  <span className="text-[10.5pt] text-gray-700">
                    {edu.degree}
                  </span>
                  <span className="text-right shrink-0 ml-4 text-[10pt] text-gray-600">
                    {edu.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── PROJECTS (first 3) ── */}
          <div>
            <SectionHeading>Projects</SectionHeading>
            {projects.slice(0, 3).map((proj, i) => (
              <div key={i} className="mb-3.5 last:mb-0">
                <div className="text-[12pt] font-bold text-black">
                  {proj.name}
                </div>
                <p className="text-[10pt] text-gray-700 mt-1 leading-relaxed">
                  {proj.description}
                </p>
                {proj.link && (
                  <a
                    href={proj.link}
                    className="text-[9.5pt] text-gray-500 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {proj.link.replace(/https?:\/\//, "")}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            PAGE 2 — Projects (remaining) · Profiles · Skills · Interests · Languages
           ═══════════════════════════════════════════════════════════ */}
        <div id="page-2" style={pageStyle}>
          {/* ── PROJECTS (remaining 5) ── */}
          <div className="mb-6">
            <SectionHeading>Projects</SectionHeading>
            {projects.slice(3).map((proj, i) => (
              <div key={i} className="mb-3.5 last:mb-0">
                <div className="text-[12pt] font-bold text-black">
                  {proj.name}
                </div>
                <p className="text-[10pt] text-gray-700 mt-1 leading-relaxed">
                  {proj.description}
                </p>
                {proj.link && (
                  <a
                    href={proj.link}
                    className="text-[9.5pt] text-gray-500 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {proj.link.replace(/https?:\/\//, "")}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* ── PROFILES ── */}
          <div className="mb-6">
            <SectionHeading>Profiles</SectionHeading>
            <div className="flex gap-8">
              {profiles.map((profile, i) => (
                <div key={i} className="text-[10.5pt] text-gray-700 leading-relaxed">
                  <a
                    href={profile.url}
                    className="text-gray-700 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profile.platform}
                  </a>
                  <br />
                  <a
                    href={profile.url}
                    className="text-gray-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profile.username}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* ── SKILLS ── */}
          <div className="mb-6">
            <SectionHeading>Skills</SectionHeading>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.category}>
                  <div className="text-[11pt] font-bold text-black">
                    {skill.category}
                  </div>
                  <div className="text-[10pt] text-gray-700 leading-relaxed mt-0.5">
                    {skill.skills.join(", ")}
                  </div>
                  <SkillBar level={skill.level} />
                </div>
              ))}
            </div>
          </div>

          {/* ── INTERESTS ── */}
          <div className="mb-6">
            <SectionHeading>Interests</SectionHeading>
            <div className="space-y-2.5">
              {interests.map((interest, i) => (
                <div key={i}>
                  <span className="text-[11pt] font-bold text-black">
                    {interest.title}
                  </span>
                  <span className="text-[10pt] text-gray-700 leading-relaxed">
                    {" "}— {interest.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── LANGUAGES ── */}
          <div>
            <SectionHeading>Languages</SectionHeading>
            <div className="flex gap-12">
              {languages.map((lang, i) => (
                <div key={i} className="flex-1">
                  <div className="flex justify-between items-baseline text-[11pt] leading-relaxed">
                    <span className="font-bold text-black">{lang.language}</span>
                  </div>
                  <div className="text-[9.5pt] text-gray-500 mt-0.5">
                    {lang.proficiency}
                  </div>
                  <SkillBar level={lang.level} />
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

