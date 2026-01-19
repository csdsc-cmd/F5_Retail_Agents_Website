import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  format?: 'number' | 'currency' | 'percent';
  decimals?: number;
  className?: string;
  triggerOnView?: boolean;
}

// Easing function: ease-out-expo for dramatic effect
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function formatNumber(
  value: number,
  format: 'number' | 'currency' | 'percent',
  decimals: number
): string {
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value);
    case 'percent':
      return `${value.toFixed(decimals)}%`;
    case 'number':
    default:
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value);
  }
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2000,
  prefix = '',
  suffix = '',
  format = 'number',
  decimals = 0,
  className = '',
  triggerOnView = true,
}: AnimatedCounterProps) {
  const [currentValue, setCurrentValue] = useState(from);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setCurrentValue(to);
      setHasAnimated(true);
      return;
    }

    const animate = () => {
      if (hasAnimated) return;

      const startTime = performance.now();

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const newValue = from + (to - from) * easedProgress;

        setCurrentValue(newValue);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(step);
        } else {
          setCurrentValue(to);
          setHasAnimated(true);
        }
      };

      animationRef.current = requestAnimationFrame(step);
    };

    if (!triggerOnView) {
      animate();
      return;
    }

    // Use Intersection Observer to trigger animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animate();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [from, to, duration, triggerOnView, hasAnimated]);

  const displayValue = formatNumber(currentValue, format, decimals);

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export default AnimatedCounter;