'use client';

import React, { useState, useEffect, useRef } from 'react';

// --- Mocks ---
function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

function useScrollAnimation({ threshold = 0.1, rootMargin = "0px" } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

// 🆕 NEW: Scroll Proximity Hook for the "Brighten Up" Effect
function useScrollProximity(ref) {
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      
      // Calculate distance from center
      const distance = Math.abs(viewportCenter - elementCenter);
      const maxDistance = viewportHeight * 0.6; // Fade out range
      
      // Calculate intensity (0 to 1)
      let value = 1 - (distance / maxDistance);
      value = Math.max(0, Math.min(1, value)); // Clamp between 0 and 1
      
      setIntensity(value);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return intensity;
}

// --- Scatter Text Component ---
const ScatterText = ({ text, isVisible, className, delay = 0 }) => {
  return (
    <span className={cn("inline-flex whitespace-pre", className)}>
      {text.split("").map((char, i) => {
        const x = (i % 2 === 0 ? 1 : -1) * ((i * 12) % 40 + 10);
        const y = (i % 3 === 0 ? 1 : -1) * ((i * 7) % 40 + 10);
        const rotate = ((i * 23) % 90) - 45;
        
        return (
          <span
            key={i}
            className={cn(
              "inline-block transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              isVisible ? "opacity-100 translate-x-0 translate-y-0 rotate-0 blur-0" : "opacity-0 blur-sm"
            )}
            style={{
              transform: isVisible ? "none" : `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
              transitionDelay: isVisible ? `${delay + (i * 30)}ms` : '0ms'
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

// --- MAIN COMPONENT ---
export default function App() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-mono overflow-x-hidden selection:bg-[hsl(var(--primary)/0.3)] selection:text-[hsl(var(--primary-foreground))]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600&display=swap');

        :root {
          /* Cyber Navy Theme */
          --background: 226 40% 7%;
          --foreground: 210 20% 98%;

          --card: 226 30% 10%;
          
          /* Muted Accents */
          --primary: 190 80% 60%; 
          --secondary: 265 70% 70%; 

          --muted: 222 25% 16%;
          --muted-foreground: 215 20% 70%;
          
          --radius: 0.75rem;
        }

        body {
          font-family: 'JetBrains Mono', monospace;
        }

        .font-display { 
          font-family: 'Orbitron', sans-serif; 
          letter-spacing: 0.02em; 
        }
        
        .font-mono {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
        }

        .text-outline { 
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1); 
          color: transparent; 
          transition: all 0.5s; 
        }

        .neon-text {
          color: hsl(var(--primary));
          text-shadow: 0 0 10px hsl(var(--primary) / 0.4);
        }

        .neon-text-magenta {
          color: hsl(var(--secondary));
          text-shadow: 0 0 10px hsl(var(--secondary) / 0.4);
        }

        .grid-pattern {
          background-image: 
            linear-gradient(hsl(var(--primary) / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.03) 1px, transparent 1px);
          background-size: 56px 56px;
        }

        .glass-card {
          background: linear-gradient(135deg, hsl(226 45% 12% / 0.72) 0%, hsl(226 50% 7% / 0.88) 100%);
          backdrop-filter: blur(12px);
          border: 1px solid hsl(226 50% 20%);
          border-radius: var(--radius);
        }

        .image-fade-bottom {
          mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
        }
        
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up-fade {
          animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @keyframes progressFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progressFill 5s linear forwards;
        }

        .hover-glow:hover {
          box-shadow: 0 0 22px hsl(var(--primary) / 0.35), 0 0 44px hsl(var(--primary) / 0.18);
        }
        
        .filter-glitch {
            filter: drop-shadow(-2px 0 red) drop-shadow(2px 0 cyan) brightness(1.2) contrast(1.1);
        }
        
        .perspective-container {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        
        .tilt-inner {
          transition: transform 0.1s ease-out;
          transform-style: preserve-3d;
        }
      `}</style>
      <AboutSection />
    </div>
  );
}

function BioRotator() {
  const [index, setIndex] = useState(0);

  const slides = [
    {
      label: "01 // THE INTRO",
      text: "I’m Agboola Enoch (Bobo), a Frontend Developer based in Nigeria. I build futuristic, high-performance digital experiences that blend clean code, creativity, and modern design."
    },
    {
      label: "02 // THE STACK",
      text: "I specialize in JavaScript, React, TypeScript, and AI-assisted workflows. I actively leverage AI tools to improve productivity and create smarter, scalable digital solutions."
    },
    {
      label: "03 // THE VISION",
      text: "Founder of Shazeat. My journey started from curiosity—wanting to understand how digital products work. Now I build portfolios, web apps, and creative interfaces."
    },
    {
      label: "04 // OFFLINE",
      text: "Beyond coding, I’m into video editing, content creation, and building business concepts. I have a strong builder mindset... and I definitely enjoy sleep! "
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000); 

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative glass-card p-4 md:p-6 shadow-2xl">
      <div key={index} className="animate-slide-up-fade">
        <span className="neon-text font-mono text-[10px] md:text-xs mb-2 md:mb-3 block tracking-widest uppercase font-bold">
          {slides[index].label}
        </span>
        <p className="text-[hsl(var(--foreground))] text-sm md:text-base lg:text-lg leading-relaxed font-light min-h-[120px] md:min-h-[140px] drop-shadow-md">
          {slides[index].text}
        </p>
      </div>
      <div className="flex gap-2 mt-2">
        {slides.map((_, i) => (
          <div key={i} className="h-1 flex-1 bg-[hsl(var(--primary)/0.15)] rounded-full overflow-hidden">
            {i === index && (
              <div className="h-full bg-[hsl(var(--primary))] animate-progress" />
            )}
            {i < index && <div className="h-full bg-[hsl(var(--primary))]" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [isImageHovered, setIsImageHovered] = useState(false);
  
  // 3D Tilt Coordinates
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const imageWrapperRef = useRef(null);
  
  // Refs for Scroll Interaction
  const textLayerRef = useRef(null);
  const pillRef = useRef(null);
  const textIntensity = useScrollProximity(textLayerRef);
  const pillIntensity = useScrollProximity(pillRef);

  // Calculate 3D Tilt
  const handleMouseMove = (e) => {
    if (!imageWrapperRef.current) return;
    
    const rect = imageWrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
    setIsImageHovered(true);
  };

  const handleMouseLeave = () => {
    setIsImageHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative min-h-[100vh] flex flex-col items-center justify-end pb-0 overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[hsl(var(--secondary)/0.15)] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-40" />

      {/* 1. TOP INTRO - REACTIVE PILL */}
      <div 
        ref={pillRef}
        className={cn(
          "absolute top-24 z-30 text-center transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
        style={{
          transform: `scale(${0.9 + (pillIntensity * 0.15)}) translateY(${isVisible ? 0 : -20}px)`,
        }}
      >
        <div 
          className="relative overflow-hidden bg-[hsl(var(--background)/0.8)] px-5 py-2.5 rounded-full backdrop-blur-md shadow-xl flex items-center gap-3 group transition-all duration-500"
          style={{
            borderColor: `rgba(255,255,255, ${0.1 + (pillIntensity * 0.3)})`, // More subtle border
            boxShadow: `0 0 ${pillIntensity * 15}px rgba(255,255,255, ${pillIntensity * 0.1})` // White glow instead of neon
          }}
        >
           
           <img 
             src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" 
             alt="User Avatar" 
             className="w-6 h-6 rounded-full object-cover border border-white/20 shadow-sm" 
           />

           <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[hsl(var(--primary))]" style={{ boxShadow: `0 0 5px hsl(var(--primary))` }}></span>
           </span>
           <span className="text-[hsl(var(--muted-foreground))] text-xs uppercase tracking-wider font-medium">Profile</span>
           <span className="text-[hsl(var(--primary))]">/</span>
           <ScatterText 
             text="agboola enoch aduragbemi" 
             isVisible={isVisible} 
             className="text-[hsl(var(--foreground))] font-semibold text-sm tracking-wide z-10" 
             delay={200}
           />
        </div>
      </div>

      {/* 2. MASSIVE TEXT LAYER - BLUE HOLE GLOW EFFECT */}
      <div 
        ref={textLayerRef}
        className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 select-none"
      >
        <h1 
          className={cn(
            "font-display font-black text-[18vw] md:text-[16rem] leading-[0.8] mix-blend-normal transition-all duration-300",
            isVisible ? "translate-y-0" : "translate-y-12"
          )}
          style={{
            color: `hsl(var(--foreground) / ${0.03 + (textIntensity * 0.15)})`, 
            textShadow: `0 0 ${textIntensity * 30}px hsl(var(--foreground) / ${textIntensity * 0.1})`
          }}
        >
          ABOUT
        </h1>
        <h1 
          className={cn(
            "font-display font-black text-[18vw] md:text-[16rem] leading-[0.8] text-outline transition-all duration-300",
            isVisible ? "translate-y-0" : "translate-y-12"
          )}
          style={{
            // "Blue Hole" Effect: Stroke turns Cyan/Primary and glows intensely on approach
            WebkitTextStrokeColor: `hsl(var(--primary) / ${0.2 + (textIntensity * 0.8)})`, 
            filter: `drop-shadow(0 0 ${textIntensity * 50}px hsl(var(--primary) / ${textIntensity * 0.6}))`
          }}
        >
          BOBO
        </h1>
      </div>

      {/* 3. BIO CONTENT */}
      <div className="absolute top-40 lg:top-1/2 left-4 right-4 lg:left-12 lg:right-auto lg:-translate-y-1/2 z-30 max-w-[360px] mx-auto lg:mx-0 text-left">
          <div className={cn("transition-all duration-1000 delay-500", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
             <BioRotator />
          </div>
       </div>

      {/* 4. IMAGE LAYER */}
      <div 
        ref={imageWrapperRef}
        className={cn(
          "relative z-10 w-full max-w-[600px] mt-auto flex justify-center perspective-container",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{ transition: 'opacity 1s ease-out 0.3s' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div 
            className="relative tilt-inner w-full flex justify-center"
            style={{ 
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            }}
        >
            {/* Image 1: Normal View */}
            <img 
              src="https://i.ibb.co/MxsLf9bv/Chat-GPT-Image-Feb-6-2026-08-24-50-PM-removebg-preview.png" 
              alt="Agboola Enoch Cutout" 
              className={cn(
                "w-auto h-[55vh] md:h-[75vh] object-contain image-fade-bottom drop-shadow-2xl transition-opacity duration-200 ease-out pointer-events-none",
                isImageHovered ? "opacity-0" : "opacity-100"
              )}
            />
            
            {/* Image 2: The "Glitch" View (Developer Mode) */}
            <img 
              src="https://i.ibb.co/LDf2vwqk/Chat-GPT-Image-Feb-14-2026-11-42-26-PM.png" 
              alt="Cyber Enoch" 
              className={cn(
                "absolute top-0 w-auto h-[55vh] md:h-[75vh] object-contain image-fade-bottom transition-opacity duration-100 ease-out pointer-events-none filter-glitch",
                isImageHovered ? "opacity-100 translate-x-1 -translate-y-1" : "opacity-0"
              )}
            />
        </div>
        
        {/* 5. BUTTONS LAYER */}
        <div 
            className="absolute bottom-12 left-0 right-0 flex flex-col md:flex-row items-center justify-center gap-4 px-4 z-20 pointer-events-auto"
            style={{ 
                transform: `translateZ(40px) translateX(${rotation.y * -0.5}px)` 
            }}
        >
          {/* 3D POP-UP BUTTON - MATTE FINISH (Primary) */}
          <a 
            href="#contact" 
            className="group relative px-8 py-3.5 bg-[#1a1a1a] rounded-xl overflow-hidden transition-all duration-200 ease-out w-full md:w-auto text-center font-mono 
            border-b-[4px] border-r-[2px] border-white/10 border-t border-l border-t-white/5 border-l-white/5
            shadow-[0_10px_20px_-5px_rgba(0,0,0,0.5)]
            hover:-translate-y-1 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.6)] hover:border-white/20 hover:border-b-[4px]
            active:translate-y-[2px] active:border-b-[1px] active:shadow-none"
          >
            <span className="relative text-sm text-neutral-200 font-bold tracking-wide flex items-center justify-center gap-2 group-hover:text-white transition-colors">
              <span className="text-white/40 group-hover:text-white transition-colors">{`>`}</span>
              let's_talk()
            </span>
          </a>

          {/* 3D POP-UP BUTTON - MATTE FINISH (Secondary) */}
          <a 
            href="#projects" 
            className="group relative px-8 py-3.5 bg-[#1a1a1a] rounded-xl overflow-hidden transition-all duration-200 ease-out w-full md:w-auto text-center font-mono
            border-b-[4px] border-r-[2px] border-white/10 border-t border-l border-t-white/5 border-l-white/5
            shadow-[0_10px_20px_-5px_rgba(0,0,0,0.5)]
            hover:-translate-y-1 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.6)] hover:border-white/20 hover:border-b-[4px]
            active:translate-y-[2px] active:border-b-[1px] active:shadow-none"
          >
            <span className="relative text-sm text-neutral-400 font-bold tracking-wide group-hover:text-white transition-colors">
               view_projects()
            </span>
          </a>
        </div>
      </div>

      {/* 6. SIDE ELEMENTS */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2 hidden lg:flex flex-col gap-6 z-20">
         <span className="text-[10px] neon-text-magenta font-mono tracking-widest uppercase rotate-90 origin-center mb-4 font-bold">STACK</span>
         {[].map((tech, i) => (
           <span 
             key={tech} 
             style={{ transitionDelay: `${500 + i * 100}ms` }} 
             className={cn(
               "text-sm text-[hsl(var(--muted-foreground))] font-mono rotate-90 origin-center transition-all duration-700 hover:neon-text cursor-default whitespace-nowrap font-medium", 
               isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
             )}
           >
             {tech}
           </span>
         ))}
      </div>

    </section>
  );
}