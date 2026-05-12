import SkillBar from './SkillBar';
import { Code2, Database, Palette, Cloud } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const skills = {
  frontend: [
    { name: 'React / Next.js', level: 80 },
    { name: 'TypeScript', level: 75 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'Three.js / WebGL', level: 65 },
    { name: 'HTMl ', level: 90 },
  ],
  backend: [
    { name: 'Node.js', level: 88 },
    { name: 'Python', level: 82 },
    { name: 'PostgreSQL', level: 65 },
    { name: 'GraphQL', level: 58 },
    { name: 'Firebase', level: 75 },
  ],
};

const categories = [
  { icon: Code2, label: 'Frontend', color: 'text-primary' },
  { icon: Database, label: 'Backend', color: 'text-secondary' },
  { icon: Palette, label: 'Design', color: 'text-accent' },
  { icon: Cloud, label: 'DevOps', color: 'text-neon-blue' },
];

const SkillsSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="skills" className="py-24 relative" ref={sectionRef}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="font-mono text-primary mb-4">
            {'// '}<span className="text-secondary">what I do</span>
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Technical <span className="neon-text-magenta">Skills</span>
          </h2>
        </div>

        {/* Category icons */}
        <div className="flex justify-center gap-8 mb-16">
          {categories.map(({ icon: Icon, label, color }, index) => (
            <div 
              key={label} 
              className={cn(
                "text-center group transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: isVisible ? `${200 + index * 100}ms` : '0ms' }}
            >
              <div className="w-16 h-16 mx-auto mb-3 glass-card neon-border rounded-xl flex items-center justify-center hover-glow transition-all duration-300 group-hover:scale-110">
                <Icon className={`w-8 h-8 ${color}`} />
              </div>
              <span className="text-xs font-mono text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Frontend */}
          <div 
            className={cn(
              "glass-card neon-border p-8 rounded-xl transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            )}
            style={{ transitionDelay: isVisible ? '400ms' : '0ms' }}
          >
            <h3 className="font-display text-xl font-semibold text-primary mb-6 flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              Frontend Development
            </h3>
            <div className="space-y-6">
              {skills.frontend.map((skill, index) => (
                <SkillBar 
                  key={skill.name} 
                  {...skill} 
                  color="cyan"
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>

          {/* Backend */}
          <div 
            className={cn(
              "glass-card neon-border-magenta p-8 rounded-xl transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            )}
            style={{ transitionDelay: isVisible ? '500ms' : '0ms' }}
          >
            <h3 className="font-display text-xl font-semibold text-secondary mb-6 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Backend Development
            </h3>
            <div className="space-y-6">
              {skills.backend.map((skill, index) => (
                <SkillBar 
                  key={skill.name} 
                  {...skill} 
                  color="magenta"
                  index={index + skills.frontend.length}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
