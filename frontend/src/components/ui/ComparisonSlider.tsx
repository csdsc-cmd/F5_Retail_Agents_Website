import { useState, useRef, useCallback, useEffect } from 'react';

interface ComparisonSliderProps {
  beforeContent: React.ReactNode;
  afterContent: React.ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
}

export function ComparisonSlider({
  beforeContent,
  afterContent,
  beforeLabel = 'Before',
  afterLabel = 'After',
  initialPosition = 50,
}: ComparisonSliderProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setHasInteracted(true);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  }, [isDragging, updatePosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setHasInteracted(true);
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    updatePosition(e.touches[0].clientX);
  }, [isDragging, updatePosition]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  // Initial animation to show interaction hint
  useEffect(() => {
    if (hasInteracted) return;
    
    const timer = setTimeout(() => {
      let frame = 0;
      const animate = () => {
        frame++;
        if (frame <= 30) {
          setPosition(50 + Math.sin(frame * 0.2) * 15);
          requestAnimationFrame(animate);
        } else {
          setPosition(50);
        }
      };
      animate();
    }, 1000);

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[400px] overflow-hidden rounded-xl cursor-ew-resize select-none"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* After Content (Full width, underneath) */}
      <div className="absolute inset-0 w-full h-full">
        {afterContent}
        <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/90 text-white text-sm font-medium rounded-full">
          {afterLabel}
        </div>
      </div>

      {/* Before Content (Clipped) */}
      <div
        className="absolute inset-0 h-full overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div className="absolute inset-0 w-full h-full" style={{ width: `${10000 / position}%` }}>
          {beforeContent}
        </div>
        <div className="absolute top-4 left-4 px-3 py-1 bg-red-500/90 text-white text-sm font-medium rounded-full">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg transition-transform"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200">
          <div className="flex gap-0.5">
            <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
            <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Interaction Hint */}
      {!hasInteracted && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/70 text-white text-sm rounded-full animate-pulse">
          Drag to compare
        </div>
      )}
    </div>
  );
}