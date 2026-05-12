import { useState } from 'react';
import { Menu, X, AtSign } from 'lucide-react';
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [{
    label: 'Home',
    href: '#home'
  }, {
    label: 'Projects',
    href: '#projects'
  }, {
    label: 'Skills',
    href: '#skills'
  }, {
    label: 'Contact',
    href: '#contact'
  }];
  return <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <AtSign className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
            <span className="font-display font-bold text-lg neon-text">SHAZEAT.DEV</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => <a key={item.label} href={item.href} className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
              </a>)}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-primary" aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && <div className="md:hidden py-4 border-t border-primary/20">
            {navItems.map(item => <a key={item.label} href={item.href} className="block py-3 font-mono text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                {'> '}{item.label}
              </a>)}
          </div>}
      </div>
    </nav>;
};
export default NavBar;