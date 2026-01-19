import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  speed?: number;
  deleteSpeed?: number;
  pause?: number;
  loop?: boolean;
}

interface UseTypewriterReturn {
  displayText: string;
  isTyping: boolean;
  isDeleting: boolean;
  currentIndex: number;
}

export function useTypewriter(
  phrases: string[],
  options: UseTypewriterOptions = {}
): UseTypewriterReturn {
  const {
    speed = 50,
    deleteSpeed = 30,
    pause = 2000,
    loop = true,
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentPhrase = phrases[currentPhraseIndex] || '';

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setDisplayText(currentPhrase);
      setIsTyping(false);
      return;
    }

    let timeout: NodeJS.Timeout;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pause);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setIsTyping(true);
        const nextIndex = loop 
          ? (currentPhraseIndex + 1) % phrases.length 
          : Math.min(currentPhraseIndex + 1, phrases.length - 1);
        setCurrentPhraseIndex(nextIndex);
        return;
      }

      timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
      }, deleteSpeed);
    } else if (isTyping) {
      if (displayText.length === currentPhrase.length) {
        setIsTyping(false);
        setIsPaused(true);
        return;
      }

      timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    currentPhrase,
    currentPhraseIndex,
    isTyping,
    isDeleting,
    isPaused,
    speed,
    deleteSpeed,
    pause,
    loop,
    phrases.length,
  ]);

  return {
    displayText,
    isTyping,
    isDeleting,
    currentIndex: currentPhraseIndex,
  };
}

export default useTypewriter;