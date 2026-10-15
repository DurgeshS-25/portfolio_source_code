import { useCallback, useState } from 'react';
import { flushSync } from 'react-dom';

// The inline script in public/index.html applies the saved (or OS-preferred) theme to <html>
// before React loads, so the DOM class is the source of truth.
const isDarkNow = () => document.documentElement.classList.contains('dark');

const applyTheme = (dark) => {
  const root = document.documentElement;
  root.classList.toggle('dark', dark);
  root.style.colorScheme = dark ? 'dark' : 'light';
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  } catch {
    // Storage unavailable (private mode, blocked cookies); the choice just won't persist.
  }
};

const useTheme = () => {
  const [isDark, setIsDark] = useState(isDarkNow);

  // `origin` is the element the reveal circle grows from (defaults to the viewport center).
  const toggleTheme = useCallback((origin) => {
    const next = !isDarkNow();
    const swap = () => {
      applyTheme(next);
      flushSync(() => setIsDark(next));
    };

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduceMotion) {
      swap();
      return;
    }

    const rect = origin?.getBoundingClientRect?.();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const root = document.documentElement;
    root.classList.add('theme-switching');
    const transition = document.startViewTransition(swap);
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 600, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
        );
      })
      .catch(() => {});
    transition.finished.finally(() => root.classList.remove('theme-switching'));
  }, []);

  return { isDark, toggleTheme };
};

export default useTheme;
