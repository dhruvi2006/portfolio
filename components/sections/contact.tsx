"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { IoMailOutline, IoLocationOutline, IoCallOutline, IoSendOutline, IoCheckmarkCircleOutline, IoLogoLinkedin, IoLogoGithub, IoAlertCircleOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContactInfoItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string | null;
}

const contactInfo: ContactInfoItem[] = [
  {
    icon: IoMailOutline,
    label: "Email",
    value: "dhruvimittal0608@gmail.com",
    href: "mailto:dhruvimittal0608@gmail.com",
  },
  {
    icon: IoCallOutline,
    label: "Phone",
    value: "+91 8708682967",
    href: "tel:+918708682967",
  },
  {
    icon: IoLocationOutline,
    label: "Location",
    value: "Delhi, India",
    href: null,
  },
  {
    icon: IoLogoLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/dhruvimit06",
    href: "https://www.linkedin.com/in/dhruvimit06",
  },
  {
    icon: IoLogoGithub,
    label: "GitHub",
    value: "github.com/dhruvi2006",
    href: "https://github.com/dhruvi2006",
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
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {
      name: validateField("name", formState.name),
      email: validateField("email", formState.email),
      message: validateField("message", formState.message),
    };
    setErrors(newErrors);

    // Check if there are any errors
    if (newErrors.name || newErrors.email || newErrors.message) {
      // Show the first error as a toast
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

      // Success
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
    <section id="contact" className="py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] as const }}
          className="mb-16"
        >
          <span className="text-xs tracking-widest uppercase text-secondary font-medium">Contact</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] mt-4">
            Get In <span className="text-accent">Touch</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] as const }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                {info.href ? (
                  <a
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 p-4 -mx-4 rounded-xl hover:bg-muted/50 transition-colors duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-200">
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-secondary font-medium uppercase tracking-wide">{info.label}</p>
                      <p className="text-sm text-foreground font-medium group-hover:text-accent transition-colors duration-200">{info.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 -mx-4">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-secondary font-medium uppercase tracking-wide">{info.label}</p>
                      <p className="text-sm text-foreground font-medium">{info.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] as const }}
          >
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-2xl border border-border bg-card shadow-sm">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-medium text-secondary uppercase tracking-wide">Name</label>
                  <input
                    id="name" name="name" type="text" value={formState.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    required placeholder="John Doe"
                    className={cn(
                      "w-full h-11 px-4 rounded-xl border bg-background text-sm text-foreground placeholder:text-secondary/40",
                      "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-200",
                      errors.name ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-border",
                      isSubmitting && "opacity-50 cursor-not-allowed"
                    )}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <IoAlertCircleOutline className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-medium text-secondary uppercase tracking-wide">Email</label>
                  <input
                    id="email" name="email" type="email" value={formState.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    required placeholder="john@example.com"
                    className={cn(
                      "w-full h-11 px-4 rounded-xl border bg-background text-sm text-foreground placeholder:text-secondary/40",
                      "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-200",
                      errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-border",
                      isSubmitting && "opacity-50 cursor-not-allowed"
                    )}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <IoAlertCircleOutline className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-medium text-secondary uppercase tracking-wide">Message</label>
                  <textarea
                    id="message" name="message" value={formState.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    required rows={5} placeholder="Tell me about your project..."
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border bg-background text-sm text-foreground placeholder:text-secondary/40 resize-none",
                      "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-200",
                      errors.message ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-border",
                      isSubmitting && "opacity-50 cursor-not-allowed"
                    )}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <IoAlertCircleOutline className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit" variant="primary" size="lg" disabled={isSubmitting}
                  className={cn(
                    "w-full cursor-pointer transition-all duration-300",
                    isSubmitted && "bg-success hover:bg-success"
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
                      <IoSendOutline className="w-4 h-4" />Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
