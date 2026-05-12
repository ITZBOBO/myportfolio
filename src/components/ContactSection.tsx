import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Download,
  Twitter,
  Phone,
  Clock,
  ExternalLink,
} from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const ContactSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="contact" className="py-24 relative" ref={sectionRef}>
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="font-mono text-primary mb-4">
            {"// "}
            <span className="text-secondary">get in touch</span>
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s <span className="text-gradient-neon">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a project in mind or want to collaborate? Feel free to reach
            out. I typically respond within 24 hours.
          </p>

          {/* CTA Buttons */}
          <div
            className={cn(
              "flex flex-wrap items-center justify-center gap-4 mt-8 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
          >
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg font-mono font-semibold transition-all duration-300 hover:scale-105 group"
            >
              <Download className="w-4 h-4 group-hover:animate-bounce" />
              Download Resume
            </a>

            <a
              href="https://calendly.com/enochbobo28/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 glass-card neon-border hover:bg-primary/10 rounded-lg font-mono font-semibold transition-all duration-300 hover:scale-105 group"
            >
              <Clock className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Schedule a Call
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact info */}
          <div className="space-y-6">
            {/* Email */}
            <div
              className={cn(
                "glass-card neon-border p-6 rounded-xl hover-glow transition-all duration-700",
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              )}
              style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:ENOCHBOBO28@GMAIL.COM"
                    className="text-muted-foreground hover:text-primary transition-colors break-all"
                  >
                    ENOCHBOBO28@GMAIL.COM
                  </a>
                </div>
              </div>
            </div>

            {/* Location */}
            <div
              className={cn(
                "glass-card neon-border-magenta p-6 rounded-xl hover-glow transition-all duration-700",
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              )}
              style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-secondary/10">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    Location
                  </h3>
                  <p className="text-muted-foreground">
                    Mowe, Ogun State, Nigeria
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    Open to remote opportunities worldwide
                  </p>
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <div
              className={cn(
                "glass-card neon-border p-6 rounded-xl hover-glow transition-all duration-700",
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              )}
              style={{ transitionDelay: isVisible ? "500ms" : "0ms" }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <Clock className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1 flex items-center gap-2">
                    Availability
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  </h3>
                  <p className="text-muted-foreground">
                    Available for freelance projects
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    Response time: Within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
            >
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="text-primary">{">"}</span> Connect on Social
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://github.com/ITZBOBO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card neon-border p-4 rounded-xl flex items-center justify-center gap-3 hover-glow transition-all duration-300 group"
                >
                  <Github className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    GitHub
                  </span>
                </a>

                <a
                  href="https://www.linkedin.com/in/enoch-agboola-239aa1293"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card neon-border-magenta p-4 rounded-xl flex items-center justify-center gap-3 hover-glow transition-all duration-300 group"
                >
                  <Linkedin className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-sm text-muted-foreground group-hover:text-secondary transition-colors">
                    LinkedIn
                  </span>
                </a>

                <a
                  href="https://x.com/b0b02824"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card neon-border p-4 rounded-xl flex items-center justify-center gap-3 hover-glow transition-all duration-300 group"
                >
                  <Twitter className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    Twitter
                  </span>
                </a>

                <a
                  href="https://wa.me/2349052548681"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card neon-border-magenta p-4 rounded-xl flex items-center justify-center gap-3 hover-glow transition-all duration-300 group"
                >
                  <Phone className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-sm text-muted-foreground group-hover:text-secondary transition-colors">
                    WhatsApp
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div
            className={cn(
              "glass-card neon-border p-8 rounded-xl transition-all duration-700",
              isVisible
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 translate-x-12 scale-95"
            )}
            style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
          >
            <div className="mb-6">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Send me a message
              </h3>
              <p className="text-sm text-muted-foreground">
                Fill out the form below and I&apos;ll get back to you as soon as
                possible.
              </p>
            </div>

            <form
              className="space-y-6"
              action="https://formspree.io/f/xgolewjz"
              method="POST"
            >
              <input
                type="hidden"
                name="_subject"
                value="New message from portfolio contact form"
              />

              <div
                className={cn(
                  "transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
              >
                <label
                  htmlFor="name"
                  className="block font-mono text-sm text-muted-foreground mb-2"
                >
                  {">"} Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-foreground"
                  placeholder="John Doe"
                  name="name"
                  required
                />
              </div>

              <div
                className={cn(
                  "transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: isVisible ? "700ms" : "0ms" }}
              >
                <label
                  htmlFor="email"
                  className="block font-mono text-sm text-muted-foreground mb-2"
                >
                  {">"} Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-foreground"
                  placeholder="john@example.com"
                  name="email"
                  required
                />
              </div>

              <div
                className={cn(
                  "transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: isVisible ? "800ms" : "0ms" }}
              >
                <label
                  htmlFor="subject"
                  className="block font-mono text-sm text-muted-foreground mb-2"
                >
                  {">"} Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-foreground"
                  placeholder="Project inquiry"
                  name="subject"
                />
              </div>

              <div
                className={cn(
                  "transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: isVisible ? "900ms" : "0ms" }}
              >
                <label
                  htmlFor="message"
                  className="block font-mono text-sm text-muted-foreground mb-2"
                >
                  {">"} Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-foreground resize-none"
                  placeholder="Tell me about your project, timeline, and budget..."
                  name="message"
                  required
                />
              </div>

              <div
                className={cn(
                  "transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: isVisible ? "1000ms" : "0ms" }}
              >
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-mono font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:gap-3 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  I&apos;ll respond within 24 hours
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
