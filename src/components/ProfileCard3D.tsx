import { useState, useRef, useEffect } from 'react';
import { Github, Mail, Linkedin, MapPin, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const ProfileCard3D = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [commitCount, setCommitCount] = useState<string>('1k+');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await fetch('https://api.github.com/search/commits?q=author:ITZBOBO');
        if (response.ok) {
          const data = await response.json();
          // Display the exact count, fallback to 1k+ if it fails.
          setCommitCount(data.total_count.toString());
        }
      } catch (error) {
        console.error('Failed to fetch commit count:', error);
      }
    };
    fetchCommits();
  }, []);

  
  const profileImageUrl = "/profile.png";

  const profilePreviewImageUrl = "/profile_preview.png";

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    // Disable 3D tilt on mobile for better UX
    if (window.innerWidth < 768) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20; // Softened the rotation (was /10)
    const rotateY = (centerX - x) / 20;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <>
      {/* Image Preview Modal */}
      <Dialog
        open={isPreviewOpen}
        onOpenChange={(open) => {
          setIsPreviewOpen(open);
          if (!open) setZoomLevel(1);
        }}
      >
        <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-xl border-primary/30 p-0 overflow-hidden">
          <DialogClose className="absolute right-4 top-4 z-20 rounded-full bg-background/80 p-2 hover:bg-background transition-colors neon-border">
            <X className="h-5 w-5 text-foreground" />
          </DialogClose>

          {/* Zoom Controls */}
          <div className="absolute left-4 top-4 z-20 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomOut}
              className="rounded-full bg-background/80 hover:bg-background neon-border"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleResetZoom}
              className="rounded-full bg-background/80 hover:bg-background neon-border"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomIn}
              className="rounded-full bg-background/80 hover:bg-background neon-border"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <span className="flex items-center px-3 rounded-full bg-background/80 neon-border text-sm font-medium">
              {Math.round(zoomLevel * 100)}%
            </span>
          </div>

          {/* ✅ Portrait Frame Container (replaces hex shape in modal) */}
          <div className="relative p-8 flex items-center justify-center min-h-[500px] overflow-auto">
            {/* Decorative glow rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full border-2 border-primary/15 animate-pulse" />
              <div className="absolute w-96 h-96 rounded-full border border-secondary/10" />
            </div>

            {/* Portrait image frame */}
            <div
              className="relative transition-transform duration-300 ease-out"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Soft glow behind portrait */}
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent opacity-35 blur-2xl" />

              {/* Border wrapper */}
              <div className="relative p-[2px] rounded-3xl bg-gradient-to-r from-primary via-secondary to-primary">
                {/* Inner background */}
                <div className="bg-background/80 p-2 rounded-3xl">
                  <img
                    src={profilePreviewImageUrl}
                    alt="Profile Preview"
                    className="w-[340px] h-[440px] sm:w-[380px] sm:h-[500px] object-cover rounded-2xl animate-scale-in"
                  />
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-5 h-5 border-l-2 border-t-2 border-primary/60 rounded-sm" />
              <div className="absolute -top-2 -right-2 w-5 h-5 border-r-2 border-t-2 border-primary/60 rounded-sm" />
              <div className="absolute -bottom-2 -left-2 w-5 h-5 border-l-2 border-b-2 border-secondary/60 rounded-sm" />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 border-r-2 border-b-2 border-secondary/60 rounded-sm" />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div
        className="card-3d w-full max-w-sm mx-auto"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        ref={cardRef}
      >
        <div
          className="card-3d-inner relative"
          style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
        >
          {/* Glow effect */}
          <div
            className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-75 blur-lg transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-50'
            }`}
          />

          {/* Card content */}
          <div className="relative glass-card neon-border p-8 rounded-2xl">
            {/* Avatar */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse-neon" />
                <button
                  onClick={() => setIsPreviewOpen(true)}
                  className="relative w-full h-full rounded-full overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {/* ✅ Shows the FIRST image on the card */}
                  <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                </button>
              </div>
            </div>

            {/* Name & Title */}
            <h2 className="font-display text-2xl font-bold text-center neon-text mb-2">AGBOOLA ENOCH</h2>
            <p className="text-center text-secondary font-medium mb-4">Frontend Developer</p>

            {/* Location */}
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm">MOWE OGUN STATE, NIGERIA</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Projects', value: '15+' },
                { label: 'Years Exp', value: '2+' },
                { label: 'Commits', value: commitCount },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-xl font-display font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              {[
                { icon: Github, href: 'https://github.com/ITZBOBO', label: 'GitHub' },
                {
                  icon: Linkedin,
                  href: 'https://www.linkedin.com/in/enoch-agboola-239aa1293/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BaW6C7Ms6TrO6Hlwr93rxXA%3D%3D',
                  label: 'LinkedIn',
                },
                
                { icon: Mail, href: 'mailto:enochbobo28@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-3 rounded-lg neon-border hover-glow transition-all duration-300 hover:scale-110 group"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-primary group-hover:text-secondary transition-colors" />
                </a>
              ))}
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-primary/50" />
            <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-primary/50" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-secondary/50" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-secondary/50" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard3D;
