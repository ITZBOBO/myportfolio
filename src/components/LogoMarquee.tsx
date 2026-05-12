import React, { useMemo } from "react";

type LogoItem = { name: string; src: string; href?: string };

type Props = {
  items: LogoItem[];
  speedSeconds?: number;
  direction?: "left" | "right";
  className?: string;
};

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function LogoMarqueeIconsOnly({
  items,
  speedSeconds = 16,
  direction = "left",
  className,
}: Props) {
  // Repeat enough times so it never shows gaps
  const repeats = 5;
  const loopItems = useMemo(
    () => Array.from({ length: repeats }, () => items).flat(),
    [items]
  );
  const shiftPercent = 100 / repeats; // seamless shift

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur",
        "px-5 py-4",
        className
      )}
    >
      {/* edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-950/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-950/80 to-transparent" />

      <div
        className={cn(
          "marquee-track flex w-max items-center gap-4",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        )}
        style={
          {
            "--marquee-duration": `${speedSeconds}s`,
            "--marquee-shift": `${shiftPercent}%`,
          } as React.CSSProperties
        }
      >
        {loopItems.map((item, i) => (
          <a
            key={`${item.name}-${i}`}
            href={item.href || "#"}
            target={item.href ? "_blank" : undefined}
            rel={item.href ? "noopener noreferrer" : undefined}
            aria-label={item.name}
            title={item.name}
            className={cn(
              "group relative grid place-items-center shrink-0",
              "h-12 w-12 rounded-2xl",
              "border border-white/10 bg-white/5",
              "shadow-[0_6px_18px_rgba(0,0,0,0.25)]",
              "transition-all duration-300",
              "hover:-translate-y-1 hover:bg-white/8 hover:shadow-[0_10px_26px_rgba(0,0,0,0.35)]"
            )}
          >
            {/* soft sheen */}
            <span
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(120% 80% at 30% 10%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0) 70%)",
              }}
            />

            <img
              src={item.src}
              alt={item.name}
              className={cn(
                "relative z-10 h-7 w-7 object-contain opacity-90",
                "transition-transform duration-300",
                "group-hover:opacity-100 group-hover:scale-[1.08]"
              )}
              loading="lazy"
              draggable={false}
            />
          </a>
        ))}
      </div>

      <style>{`
        .marquee-track {
          will-change: transform;
          transform: translate3d(0,0,0);
          backface-visibility: hidden;
        }
        @keyframes marqueeLeft {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(calc(-1 * var(--marquee-shift)),0,0); }
        }
        @keyframes marqueeRight {
          0% { transform: translate3d(calc(-1 * var(--marquee-shift)),0,0); }
          100% { transform: translate3d(0,0,0); }
        }
        .animate-marquee-left {
          animation: marqueeLeft var(--marquee-duration, 18s) linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight var(--marquee-duration, 18s) linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-left, .animate-marquee-right { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
