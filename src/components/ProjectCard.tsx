import { ExternalLink, Github, Folder } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  index: number;
  onPreview?: () => void;
}

const ProjectCard = ({ title, description, tags, githubUrl, liveUrl, onPreview }: ProjectCardProps) => {
  return (
    <div 
      className={`group relative glass-card neon-border p-6 rounded-xl hover-glow transition-all duration-500 hover:scale-[1.02] h-full${onPreview ? ' cursor-pointer' : ''}`}
      onClick={onPreview}
      role={onPreview ? 'button' : undefined}
      tabIndex={onPreview ? 0 : undefined}
      onKeyDown={(e) => {
        if (!onPreview) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPreview();
        }
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <Folder className="w-10 h-10 text-primary" />
        <div className="flex gap-3">
          {githubUrl && (
            <a 
              href={githubUrl} 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="View on GitHub"
              onClick={(e) => {
                if (onPreview) e.stopPropagation();
              }}
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {liveUrl && (
            <a 
              href={liveUrl} 
              className="text-muted-foreground hover:text-secondary transition-colors"
              aria-label="View live site"
              onClick={(e) => {
                if (onPreview) e.stopPropagation();
              }}
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span 
            key={tag}
            className="px-3 py-1 text-xs font-mono text-primary/80 bg-primary/10 rounded-full border border-primary/20"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hover glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default ProjectCard;
