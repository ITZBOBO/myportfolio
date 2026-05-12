import { Code } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="py-8 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            <span className="font-display font-bold neon-text">SHAZEAT.DEV</span>
          </div>

          {/* Copyright */}
          <p className="font-mono text-sm text-muted-foreground">
            © {currentYear} AGBOOLA ENOCH. Built with {'SHAZEAT '}
            <span className="text-secondary">{'<'}</span>
            <span className="text-primary">code</span>
            <span className="text-secondary">{' />'}</span>
          </p>

          {/* Status */}
          <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Available for work
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;