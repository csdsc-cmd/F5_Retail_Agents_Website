import React, { useRef, useEffect, useState } from 'react';

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
  gap?: number;
}

export function InfiniteMarquee({
  children,
  speed = 50,
  direction = 'left',
  pauseOnHover = true,
  className = '',
  gap = 24,
}: InfiniteMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const animationDuration = `${speed}s`;
  const animationDirection = direction === 'left' ? 'normal' : 'reverse';

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      <div
        className="flex"
        style={{
          gap: `${gap}px`,
          animation: prefersReducedMotion 
            ? 'none' 
            : `marquee ${animationDuration} linear infinite ${animationDirection}`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {/* First copy */}
        <div className="flex shrink-0" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        {/* Second copy for seamless loop */}
        <div className="flex shrink-0" style={{ gap: `${gap}px` }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

export default InfiniteMarquee;