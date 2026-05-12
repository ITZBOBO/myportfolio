import { cn } from '@/lib/utils';

interface SkillBarProps {
  name: string;
  level: number;
  color: 'cyan' | 'magenta' | 'purple';
  index: number;
  isVisible?: boolean;
}

const SkillBar = ({ name, level, color, index, isVisible = true }: SkillBarProps) => {
  const colorClasses = {
    cyan: 'from-primary to-neon-blue',
    magenta: 'from-secondary to-neon-magenta',
    purple: 'from-accent to-neon-purple',
  };

  const glowClasses = {
    cyan: 'shadow-[0_0_20px_hsl(var(--primary)/0.5)]',
    magenta: 'shadow-[0_0_20px_hsl(var(--secondary)/0.5)]',
    purple: 'shadow-[0_0_20px_hsl(var(--accent)/0.5)]',
  };

  return (
    <div 
      className={cn(
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      )}
      style={{
        '--transition-delay': isVisible ? `${600 + index * 100}ms` : '0ms',
        transitionDelay: `var(--transition-delay)`
      } as React.CSSProperties}
    >
      <div className="flex justify-between mb-2">
        <span className="font-mono text-sm text-foreground">{name}</span>
        <span className="font-mono text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={cn(
            `h-full rounded-full bg-gradient-to-r ${colorClasses[color]} ${glowClasses[color]} transition-all duration-1000 ease-out`,
            isVisible ? "" : "!w-0"
          )}
          style={{
            width: isVisible ? `${level}%` : '0%',
            '--bar-transition-delay': isVisible ? `${700 + index * 100}ms` : '0ms',
            transitionDelay: `var(--bar-transition-delay)`,
            animation: isVisible ? 'pulse-neon 2s ease-in-out infinite' : 'none'
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
};

export default SkillBar;
