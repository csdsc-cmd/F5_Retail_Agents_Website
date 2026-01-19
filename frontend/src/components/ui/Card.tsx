import React, { useRef, useState, MouseEvent } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  spotlight?: boolean;
  hover?: boolean;
}

export function Card({ children, className = '', spotlight = false, hover = true }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!spotlight || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const baseClasses = 'relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden transition-all duration-300';
  
  const hoverClasses = hover 
    ? 'hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1' 
    : '';

  return (
    <div
      ref={cardRef}
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {spotlight && isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`,
            inset: 0,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}