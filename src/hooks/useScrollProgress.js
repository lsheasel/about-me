import { useState, useEffect } from 'react';

export function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start: Section ist am unteren Rand sichtbar (rect.top = windowHeight)
      // Ende: Section ist mittig (rect.top = windowHeight/2)
      const start = windowHeight;
      const end = windowHeight / 2;

      let prog = (start - rect.top) / (start - end);
      prog = Math.min(Math.max(prog, 0), 1);

      setProgress(prog);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return progress;
}