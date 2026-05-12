import React, { useState, useEffect, useRef } from 'react';
import { Folder, Github, ExternalLink, X, Monitor, Globe, ChevronRight, Layers, Code, Smartphone, Terminal, Database } from 'lucide-react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Mocking Dependencies for Standalone Run ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function useScrollAnimation({ threshold = 0.1 } = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// --- Data ---
const projects = [
  {
    title: 'RUNSA Voting System',
    description: 'A full-stack SaaS/dashboard application featuring secure role-based access control, real-time election results, and candidate management.',
    category: 'Web App',
    status: 'Live',
    features: ['Role-based Access', 'Real-time Results', 'Audit Logging'],
    tags: ['Next.js', 'React', 'Node.js', 'Express', 'Prisma', 'Redis'],
    githubUrl: 'https://github.com/ITZBOBO',
    liveUrl: '#',
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=1600'
  },
  {
    title: 'TechStream E-Commerce',
    description: 'A complete e-commerce application featuring a storefront with a shopping cart, secure authentication, payment processing, and an admin panel.',
    category: 'Web App',
    status: 'Live',
    features: ['Shopping Cart', 'Secure Auth', 'Admin Panel'],
    tags: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    githubUrl: 'https://github.com/ITZBOBO/TechStream',
    liveUrl: 'https://techstreamapp.netlify.app/',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600'
  },
  {
    title: 'Real-Time Chat App',
    description: 'A real-time messaging application enabling instant communication, live notifications, and collaborative features.',
    category: 'Web App',
    status: 'Beta',
    features: ['Live Chat', 'Notifications', 'WebSockets'],
    tags: ['React', 'Node.js', 'Socket.io', 'Express'],
    githubUrl: 'https://github.com/ITZBOBO/Chatapp',
    liveUrl: '#',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1600'
  },
  {
    title: '3D Igloo Crypto UI',
    description: 'A polished UI/UX showcase project featuring a modern animated landing page and creative 3D web experiences for the crypto space.',
    category: 'Web App',
    status: 'Live',
    features: ['3D Animations', 'Modern UI', 'Responsive Design'],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Three.js'],
    githubUrl: 'https://github.com/ITZBOBO/IGLOO-CRYTO-WEBSITE',
    liveUrl: '#',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1600'
  },
  {
    title: 'Blog App Backend API',
    description: 'A backend/API-focused system serving as a stateless REST API with secure authentication, token management, and database operations.',
    category: 'Data',
    status: 'Live',
    features: ['RESTful API', 'JWT Auth', 'Data Modeling'],
    tags: ['Node.js', 'Express', 'MongoDB', 'Bcrypt'],
    githubUrl: 'https://github.com/ITZBOBO/BlogApp.git',
    liveUrl: '#',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1600'
  },
  {
    title: 'Hostel Complaint System',
    description: 'A unique problem-solving application that modernizes hostel management by allowing students to submit, track, and resolve complaints dynamically.',
    category: 'Web App',
    status: 'Live',
    features: ['Issue Tracking', 'Student Dashboard', 'Real-time Updates'],
    tags: ['TypeScript', 'Next.js', 'React'],
    githubUrl: 'https://github.com/ITZBOBO/Hostel-Complain-App',
    liveUrl: 'https://hostel-complain-app.vercel.app',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1600'
  }
];

const CATEGORIES = ['All', 'Web App', 'Mobile', 'Tools', 'Data'];

const LOGOS = [
  { name: "JavaScript", src: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "TypeScript", src: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "HTML5", src: "https://cdn.simpleicons.org/html5/E34F26" },
  { name: "CSS", src: "https://cdn.simpleicons.org/css3/1572B6" },
  { name: "React", src: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Tailwind CSS", src: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Node.js", src: "https://cdn.simpleicons.org/nodedotjs/22C55E" },
  { name: "Firebase", src: "https://cdn.simpleicons.org/firebase/FFCA28" },
  { name: "Netlify", src: "https://cdn.simpleicons.org/netlify/00C7B7" },
  { name: "GitHub", src: "https://cdn.simpleicons.org/github/E5E7EB" },
  { name: "Figma", src: "https://cdn.simpleicons.org/figma/F24E1E" },
];

// --- Components ---

const PreviewModal = ({ project, onClose }) => {
  if (!project) return null;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[hsl(var(--background)/0.8)] backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-6xl h-[85vh] bg-[hsl(var(--card)/0.95)] backdrop-blur-xl border border-[hsl(var(--primary)/0.2)] flex flex-col overflow-hidden z-10 shadow-[0_0_50px_hsl(var(--primary)/0.15)] rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[hsl(var(--border)/0.4)] bg-[hsl(var(--background)/0.6)]">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-[hsl(var(--primary)/0.1)] rounded-lg text-[hsl(var(--primary))]">
              <Monitor size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[hsl(var(--foreground))] tracking-wide font-display">{project.title}</h2>
              <div className="flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))] mt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-pulse"></span>
                  Live Preview
                </span>
                <span className="w-1 h-1 rounded-full bg-[hsl(var(--muted-foreground)/0.5)]"></span>
                <span className="uppercase tracking-wider font-semibold text-[hsl(var(--secondary))]">{project.status}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[hsl(var(--primary)/0.1)] rounded-full text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-full overflow-hidden">

          {/* Browser Preview */}
          <div className="w-full lg:w-3/4 bg-black/40 p-4 lg:p-8 flex items-center justify-center relative">
            <div className="absolute inset-0 grid-pattern opacity-20"></div>
            {/* Mock Browser Window */}
            <div className="relative w-full h-full flex flex-col rounded-xl overflow-hidden border border-[hsl(var(--border))] shadow-2xl bg-[hsl(var(--muted))] z-10">
              {/* Browser Toolbar — hidden on mobile */}
              {!isMobile && (
                <div className="bg-[hsl(var(--card))] px-4 py-3 flex items-center gap-4 border-b border-[hsl(var(--border))] shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>

                  {/* Address Bar */}
                  <div className="flex-1 bg-black/30 rounded px-4 py-1.5 text-xs text-center text-[hsl(var(--muted-foreground))] font-mono flex items-center justify-between group cursor-text border border-transparent hover:border-[hsl(var(--primary)/0.2)] transition-colors">
                    <span className="opacity-50"><Globe size={12} /></span>
                    <span className="mx-2 truncate">{project.liveUrl ? project.liveUrl : `localhost:3000/projects/${project.title.toLowerCase().replace(/\s/g, '-')}`}</span>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="opacity-50 hover:opacity-100 transition-opacity text-[hsl(var(--primary))]">
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Viewport: mobile gets a tap-to-open card; desktop gets the dimmed iframe */}
              <div className="relative flex-1 bg-[hsl(var(--background))] overflow-hidden">
                {isMobile ? (
                  /* ── Mobile fallback ── */
                  <div className="flex flex-col items-center justify-center h-full gap-6 p-8 text-center">
                    {/* Thumbnail */}
                    <div className="w-full max-w-xs rounded-xl overflow-hidden border border-[hsl(var(--primary)/0.2)] shadow-lg opacity-70">
                      <img src={project.image} alt={project.title} className="w-full object-cover object-top" />
                    </div>
                    <p className="text-[hsl(var(--muted-foreground))] text-xs font-mono">
                      Live preview is best experienced in a browser tab.
                    </p>
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold text-sm shadow-[0_0_20px_hsl(var(--primary)/0.35)] hover:shadow-[0_0_28px_hsl(var(--primary)/0.5)] transition-all active:scale-95"
                      >
                        <Globe size={16} /> Open Live Site
                      </a>
                    ) : (
                      <span className="text-[hsl(var(--muted-foreground))] text-xs opacity-50">No live URL yet</span>
                    )}
                  </div>
                ) : project.liveUrl ? (
                  /* ── Desktop: dimmed iframe ── */
                  <div className="relative w-full h-full">
                    <iframe
                      src={project.liveUrl}
                      title={project.title}
                      className="w-full h-full border-0"
                      style={{ opacity: 0.72, filter: 'brightness(0.82) saturate(0.85)' }}
                      allow="fullscreen"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 60px 20px hsl(var(--background) / 0.55)',
                        background: 'radial-gradient(ellipse at center, transparent 55%, hsl(var(--background) / 0.45) 100%)',
                      }}
                    />
                    <div className="absolute top-0 left-0 right-0 h-8 pointer-events-none bg-gradient-to-b from-[hsl(var(--background)/0.5)] to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none bg-gradient-to-t from-[hsl(var(--background)/0.5)] to-transparent" />
                  </div>
                ) : (
                  /* ── Desktop: screenshot fallback ── */
                  <div className="relative w-full h-full overflow-y-auto group">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-1000">
                      <div className="bg-[hsl(var(--background)/0.8)] text-[hsl(var(--foreground))] px-3 py-1 rounded-full text-xs backdrop-blur-sm border border-[hsl(var(--primary)/0.2)]">
                        Scroll to view
                      </div>
                    </div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full min-h-full object-cover object-top opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Details */}
          <div className="w-full lg:w-1/4 bg-[hsl(var(--card)/0.4)] border-l border-[hsl(var(--border)/0.5)] flex flex-col h-full backdrop-blur-sm">
            <div className="p-6 overflow-y-auto flex-1">
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-wider text-[hsl(var(--primary))] font-bold mb-3 flex items-center gap-2 font-display">
                  <Folder size={14} /> Overview
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-wider text-[hsl(var(--primary))] font-bold mb-3 font-display flex items-center gap-2">
                  <Layers size={14} /> Key Features
                </h3>
                <ul className="space-y-2">
                  {project.features?.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[hsl(var(--foreground)/0.8)]">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[hsl(var(--secondary))] shrink-0" />
                      {feature}
                    </li>
                  )) || <li className="text-sm text-[hsl(var(--muted-foreground))]">Detailed features list coming soon.</li>}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-wider text-[hsl(var(--primary))] font-bold mb-3 font-display">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-[hsl(var(--primary)/0.1)] rounded border border-[hsl(var(--primary)/0.2)] text-xs text-[hsl(var(--primary))]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[hsl(var(--border)/0.5)] bg-[hsl(var(--background)/0.2)]">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.9)] text-[hsl(var(--primary-foreground))] py-3 rounded-lg font-medium transition-all mb-3 shadow-[0_0_15px_hsl(var(--primary)/0.2)] hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                >
                  <Globe size={16} /> Visit Live Site
                </a>
              ) : (
                <button disabled className="w-full flex items-center justify-center gap-2 bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] py-3 rounded-lg font-medium mb-3 cursor-not-allowed opacity-50">
                  <Globe size={16} /> No Live URL
                </button>
              )}
              <div className="flex justify-between text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-widest text-center opacity-60">
                <span>Secure</span> • <span>Fast</span> • <span>Scalable</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, description, tags, githubUrl, liveUrl = undefined, category, onClick }) => {
  return (
    <div
      className="group relative bg-[hsl(var(--card))] rounded-xl p-6 hover:border-[hsl(var(--primary)/0.5)] border border-[hsl(var(--border)/0.5)] transition-all duration-300 flex flex-col h-full cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icons Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="text-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary))] transition-colors">
            {category === 'Mobile' ? <Smartphone size={24} strokeWidth={1.5} /> :
              category === 'Data' ? <Database size={24} strokeWidth={1.5} /> :
                category === 'Tools' ? <Terminal size={24} strokeWidth={1.5} /> :
                  <Monitor size={24} strokeWidth={1.5} />}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] px-2 py-0.5 rounded-full">
            {category}
          </span>
        </div>
        <div className="flex gap-4 text-[hsl(var(--muted-foreground))]">
          {githubUrl && <Github size={20} className="hover:text-[hsl(var(--foreground))] transition-colors" />}
          {liveUrl && <ExternalLink size={20} className="hover:text-[hsl(var(--foreground))] transition-colors" />}
        </div>
      </div>

      <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-2 group-hover:text-[hsl(var(--primary))] transition-colors font-display tracking-wide">
        {title}
      </h3>
      <p className="text-[hsl(var(--muted-foreground))] text-sm mb-6 flex-grow leading-relaxed line-clamp-3 font-mono">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag, idx) => (
          <span key={idx} className="text-[10px] uppercase font-semibold px-3 py-1.5 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.1)] group-hover:border-[hsl(var(--primary)/0.3)] transition-colors">
            {tag}
          </span>
        ))}
      </div>

      {/* Hover 'Click to Preview' Hint */}
      <div className="absolute inset-0 bg-[hsl(var(--background)/0.8)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
        <span className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_15px_hsl(var(--primary)/0.4)]">
          <Monitor size={16} /> Preview Project
        </span>
      </div>
    </div>
  );
};

const LogoMarqueeIconsOnly = ({ items, speedSeconds, direction = 'left' }) => {
  return (
    <div className="relative flex overflow-hidden w-full mask-gradient-x py-8">
      <div
        className={cn("flex gap-16 min-w-full animate-scroll", direction === 'right' && 'direction-reverse')}
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {[...items, ...items].map((item, idx) => (
          <div key={`${item.name}-${idx}`} className="flex items-center justify-center min-w-[60px] grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100">
            <img src={item.src} alt={item.name} className="w-10 h-10 object-contain" />
          </div>
        ))}
      </div>
      <style>{`
        .mask-gradient-x {
          mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll linear infinite;
        }
        .direction-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  );
};

// --- Main Projects Section ---
const ProjectsSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter projects based on active category
  const filteredProjects = projects.filter(project =>
    activeCategory === 'All' || project.category === activeCategory
  );

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-mono">
      {/* INJECTED STYLES: Keep existing style block */}
      <style>{`
        :root {
          --background: 226 50% 7%;
          --foreground: 210 40% 98%;
          --card: 226 45% 10%;
          --card-foreground: 210 40% 98%;
          --popover: 226 45% 10%;
          --popover-foreground: 210 40% 98%;
          --primary: 190 95% 50%;
          --primary-foreground: 222 60% 6%;
          --secondary: 265 90% 65%;
          --secondary-foreground: 210 40% 98%;
          --muted: 222 25% 16%;
          --muted-foreground: 215 20% 70%;
          --accent: 265 90% 65%;
          --accent-foreground: 210 40% 98%;
          --destructive: 0 84% 60%;
          --destructive-foreground: 210 40% 98%;
          --border: 220 20% 18%;
          --input: 220 20% 14%;
          --ring: 190 95% 50%;
          --radius: 0.75rem;
        }
        .grid-pattern {
            background-image: 
                linear-gradient(hsl(var(--primary) / 0.03) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--primary) / 0.03) 1px, transparent 1px);
            background-size: 56px 56px;
        }
      `}</style>

      <section id="projects" className="py-24 relative overflow-hidden" ref={sectionRef}>
        <div className="absolute inset-0 grid-pattern opacity-100 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[hsl(var(--primary)/0.05)] blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          {/* Section header */}
          <div
            className={cn(
              "text-center mb-12 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <p className="font-mono text-[hsl(var(--primary))] mb-4 tracking-wider text-sm">
              {'// '}<span className="text-[hsl(var(--muted-foreground))]">featured work</span>
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--foreground))]">
              My <span className="text-[hsl(var(--primary))] drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]">Projects</span>
            </h2>
          </div>

          {/* Category Filter */}
          <div
            className={cn(
              "flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border",
                  activeCategory === category
                    ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border-[hsl(var(--primary))] shadow-[0_0_15px_hsl(var(--primary)/0.4)]"
                    : "bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--foreground))]"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 min-h-[400px]">
            {filteredProjects.map((project, index) => (
              <div
                key={project.title}
                className={cn(
                  "transition-all duration-500 animate-in fade-in zoom-in-95",
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard
                  {...project}
                  onClick={() => setSelectedProject(project)}
                />
              </div>
            ))}
            {filteredProjects.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center text-[hsl(var(--muted-foreground))] py-20">
                <Folder size={48} className="mb-4 opacity-20" />
                <p>No projects found in this category.</p>
              </div>
            )}
          </div>

          {/* View more link */}
          <div
            className={cn(
              "text-center mt-16 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: isVisible ? '800ms' : '0ms' }}
          >
            <a
              href="https://github.com/ITZBOBO"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-[hsl(var(--primary))] hover:text-[hsl(var(--primary)/0.8)] transition-colors group border-b border-[hsl(var(--primary)/0.2)] hover:border-[hsl(var(--primary)/0.5)] pb-1"
            >
              View all projects on GitHub
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Logo Marquee */}
          <div
            className={cn(
              "mt-24 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: isVisible ? '900ms' : '0ms' }}
          >
            <div className="max-w-4xl mx-auto border-t border-[hsl(var(--border)/0.5)] pt-10">
              <LogoMarqueeIconsOnly items={LOGOS} speedSeconds={30} direction="left" />
            </div>
          </div>
        </div>
      </section>

      {/* Live Preview Modal Overlay */}
      {selectedProject && (
        <PreviewModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectsSection;