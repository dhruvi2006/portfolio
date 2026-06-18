"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  IoMailOutline,
  IoLocationOutline,
  IoCallOutline,
  IoSendOutline,
  IoCheckmarkCircleOutline,
  IoCopyOutline,
  IoLogoLinkedin,
  IoLogoGithub,
  IoLogoInstagram,
} from "react-icons/io5";
import { SiX } from "react-icons/si";
import { cn } from "@/lib/utils";

interface ContactCard {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  copyValue: string;
}

const contactCards: ContactCard[] = [
  {
    icon: IoMailOutline,
    label: "Email",
    value: "dhruvimittal0608@gmail.com",
    copyValue: "dhruvimittal0608@gmail.com",
  },
  {
    icon: IoCallOutline,
    label: "Phone",
    value: "+91 8708682967",
    copyValue: "+918708682967",
  },
  {
    icon: IoLocationOutline,
    label: "Location",
    value: "Delhi, India",
    copyValue: "Delhi, India",
  },
];

const socialLinks = [
  {
    label: "LinkedIn",
    icon: IoLogoLinkedin,
    href: "https://www.linkedin.com/in/dhruvimit06",
  },
  {
    label: "GitHub",
    icon: IoLogoGithub,
    href: "https://github.com/dhruvi2006",
  },
  {
    label: "Instagram",
    icon: IoLogoInstagram,
    href: "https://instagram.com/dhruvi_mit",
  },
  {
    label: "X",
    icon: SiX,
    href: "https://x.com/dhruvi_mit",
  },
];

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required.";
        if (value.trim().length > 200) return "Name must be under 200 characters.";
        return undefined;
      case "email":
        if (!value.trim()) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
          return "Please provide a valid email address.";
        return undefined;
      case "message":
        if (!value.trim()) return "Message is required.";
        if (value.trim().length > 5000) return "Message must be under 5000 characters.";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied to clipboard`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {
      name: validateField("name", formState.name),
      email: validateField("email", formState.email),
      message: validateField("message", formState.message),
    };
    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.message) {
      const firstError = newErrors.name || newErrors.email || newErrors.message;
      if (firstError) toast.error(firstError);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name.trim(),
          email: formState.email.trim(),
          message: formState.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to send message. Please try again.");
        return;
      }

      toast.success("Message sent successfully.");
      setFormState({ name: "", email: "", message: "" });
      setErrors({});
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 bg-white dark:bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="block text-[13px] tracking-[0.25em] uppercase font-semibold text-zinc-400">
            Contact
          </span>
          <h2 className="mt-3 max-w-[600px] text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 leading-tight">
            Get in Touch — Interested in Working Together?
          </h2>
          <p className="mt-3 max-w-[600px] text-sm text-zinc-500 leading-relaxed">
            Open to internships, software engineering roles, freelance projects, and product collaborations.
          </p>
        </motion.div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid lg:grid-cols-[420px_1fr] gap-10">
          {/* ======================== */}
          {/* LEFT COLUMN — Contact Info */}
          {/* ======================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0, 1] as const, delay: 0.1 }}
          >
            {/* Contact Info Cards */}
            <div className="space-y-3">
              {contactCards.map((card) => (
                <div
                  key={card.label}
                  className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 h-[90px]"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-zinc-50 flex items-center justify-center shrink-0">
                    <card.icon className="w-5 h-5 text-zinc-500" />
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] tracking-[0.12em] uppercase font-medium text-zinc-400">
                      {card.label}
                    </p>
                    <p className="text-sm font-medium text-zinc-800 mt-0.5 truncate">
                      {card.value}
                    </p>
                  </div>

                  {/* Copy Button — not shown for Location */}
                  {card.label !== "Location" && (
                    <button
                      onClick={() => handleCopy(card.copyValue, card.label)}
                      className="w-9 h-9 rounded-lg border border-zinc-200 flex items-center justify-center hover:bg-zinc-100 transition-colors duration-200 shrink-0 cursor-pointer"
                      aria-label={`Copy ${card.label}`}
                    >
                      <IoCopyOutline className="w-4 h-4 text-zinc-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-zinc-100 dark:bg-[#262626]" />

            {/* Social Links */}
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((link) => {
                const brandColor =
                  link.label === "LinkedIn"
                    ? "#0A66C2"
                    : link.label === "GitHub"
                    ? "#181717"
                    : link.label === "Instagram"
                    ? "#E1306C"
                    : "#000000";

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-zinc-200 bg-white text-sm font-medium transition-all duration-300 group hover:border-transparent"
                  >
                    {/* Left-to-right fill overlay */}
                    <span
                      className="absolute inset-0 transition-transform duration-300 ease-out -translate-x-full group-hover:translate-x-0"
                      style={{ backgroundColor: brandColor }}
                    />
                    {/* Content */}
                    <span className="relative z-10 flex items-center gap-2 text-zinc-600 group-hover:text-white transition-colors duration-300">
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* ======================== */}
          {/* RIGHT COLUMN — Form */}
          {/* ======================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0, 1] as const, delay: 0.2 }}
          >
            <div className="p-8 sm:p-10 rounded-2xl border border-zinc-200 dark:border-[#262626] bg-white dark:bg-[#171717]">
              <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-[#fafafa] mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name + Email — two columns */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[11px] tracking-[0.12em] uppercase font-medium text-zinc-400">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formState.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      placeholder="John Doe"
                      className={cn(
                        "w-full h-14 px-4 rounded-xl border bg-white text-sm text-zinc-900 placeholder:text-zinc-300",
                        "focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/20 transition-all duration-200",
                        errors.name ? "border-red-400" : "border-zinc-200",
                        isSubmitting && "opacity-50 cursor-not-allowed"
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[11px] tracking-[0.12em] uppercase font-medium text-zinc-400">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      placeholder="john@example.com"
                      className={cn(
                        "w-full h-14 px-4 rounded-xl border bg-white text-sm text-zinc-900 placeholder:text-zinc-300",
                        "focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/20 transition-all duration-200",
                        errors.email ? "border-red-400" : "border-zinc-200",
                        isSubmitting && "opacity-50 cursor-not-allowed"
                      )}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[11px] tracking-[0.12em] uppercase font-medium text-zinc-400">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    rows={5}
                    placeholder="Tell me about your project..."
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border bg-white text-sm text-zinc-900 placeholder:text-zinc-300 resize-none",
                      "focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/20 transition-all duration-200",
                      errors.message ? "border-red-400" : "border-zinc-200",
                      isSubmitting && "opacity-50 cursor-not-allowed"
                    )}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full h-14 rounded-xl bg-black dark:bg-white text-white dark:text-black text-sm font-medium",
                    "flex items-center justify-center gap-2.5",
                    "transition-all duration-300",
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-zinc-900 dark:hover:bg-zinc-100 hover:-translate-y-0.5 cursor-pointer",
                    isSubmitted && "bg-emerald-600 hover:bg-emerald-600"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <IoCheckmarkCircleOutline className="w-4 h-4" />
                      Message Sent
                    </>
                  ) : (
                    <>
                      <IoSendOutline className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
