import { useState } from 'react';

interface ImageWithOverlayProps {
  src: string;
  alt: string;
  overlayGradient?: string;
  overlayOpacity?: number;
  className?: string;
  children?: React.ReactNode;
}

export function ImageWithOverlay({
  src,
  alt,
  overlayGradient = 'from-black/60 to-transparent',
  overlayOpacity = 1,
  className = '',
  children,
}: ImageWithOverlayProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
          <span className="text-white/50 text-sm">Image unavailable</span>
        </div>
      )}

      {/* Image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />

      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${overlayGradient}`}
        style={{ opacity: overlayOpacity }}
      />

      {/* Children (content over image) */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}