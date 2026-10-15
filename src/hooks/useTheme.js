import { useCallback, useState } from 'react';

// The inline script in public/index.html applies the saved (or OS-preferred) theme to <html>
// before React loads, so the initial state is read from the DOM to avoid a flash.
const readInitialTheme = () => document.documentElement.classList.contains('dark');

const useTheme = () => {
  const [isDark, setIsDark] = useState(readInitialTheme);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      document.documentElement.style.colorScheme = next ? 'dark' : 'light';
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light');
      } catch {
        // Storage unavailable (private mode, blocked cookies); the choice just won't persist.
      }
      return next;
    });
  }, []);

  return { isDark, toggleTheme };
};

export default useTheme;
