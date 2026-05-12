import ProfileCard3D from './ProfileCard3D';
import TypingText from './TypingText';
import { ChevronDown } from 'lucide-react';



const heroTexts = ['Pixel-Perfect', 'Creative', 'Passionate', 'Performance-Driven'];

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-neon" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] animate-pulse-neon" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <p className="font-mono text-primary mb-4 animate-fade-in">
              {'<'}<span className="text-secondary">hello</span>{' />'}
            </p>
            
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
              I'm a{' '}
              <TypingText texts={heroTexts} className="text-gradient-neon" />
              <br />
              Developer
            </h1>
            
            <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Building futuristic digital experiences with clean code and innovative design. 
              Obsessed with high-performance animations and cyber-aesthetics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '300ms' }}>
              <a 
                href="#projects"
                className="px-8 py-3 font-display font-semibold text-sm uppercase tracking-wider bg-primary text-primary-foreground rounded-lg hover-glow transition-all duration-300 hover:scale-105"
              >
                View Projects
              </a>
              <a 
                href="#contact"
                className="px-8 py-3 font-display font-semibold text-sm uppercase tracking-wider neon-border-magenta rounded-lg text-secondary hover:bg-secondary/10 transition-all duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Right content - 3D Card */}
          <div className="order-1 lg:order-2 animate-scale-in" style={{ animationDelay: '400ms' }}>
            <ProfileCard3D />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a 
        href="#projects"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors animate-float"
      >
        <span className="text-xs font-mono uppercase tracking-wider">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </a>
    </section>
  );
};

export default HeroSection;
