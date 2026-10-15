import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { navItems } from '../data/portfolio';
import { accent, hoverBg, muted } from './styles';

const ThemeToggle = ({ isDark, onToggle }) => (
  <button
    type="button"
    onClick={(e) => onToggle(e.currentTarget)}
    aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    className={`p-2 rounded-lg ${hoverBg} transition-colors overflow-hidden`}
  >
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={isDark ? 'sun' : 'moon'}
        className="block"
        initial={{ rotate: -90, scale: 0, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
      </motion.span>
    </AnimatePresence>
  </button>
);

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="absolute left-0 right-0 -bottom-px h-0.5 origin-left bg-gradient-to-r from-emerald-500 to-emerald-300"
    />
  );
};

const Header = ({ activeSection, onNavigate, isDark, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close the mobile menu on Escape or when the viewport grows to the desktop layout.
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setIsMenuOpen(false);
    const desktop = window.matchMedia('(min-width: 768px)');
    const onResize = (e) => e.matches && setIsMenuOpen(false);
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [isMenuOpen]);

  const navigate = (id) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-stone-950/80 border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            type="button"
            onClick={() => navigate('about')}
            className={`group font-mono font-bold text-lg tracking-tight ${accent}`}
            aria-label="Back to top"
          >
            ~/durgesh
            <span className="terminal-cursor ml-0.5 opacity-70" aria-hidden="true">_</span>
          </button>

          <nav aria-label="Primary" className="hidden md:flex items-center space-x-1">
            {navItems.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => navigate(id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive ? accent : `${muted} hover:text-stone-900 dark:hover:text-stone-100`
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-md bg-emerald-500/10 ring-1 ring-emerald-500/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </button>
              );
            })}
            <div className="pl-3">
              <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            </div>
          </nav>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="p-2"
            >
              {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="md:hidden overflow-hidden bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="px-4 py-3 space-y-2">
              {navItems.map(({ id, label }, i) => (
                <motion.button
                  key={id}
                  type="button"
                  onClick={() => navigate(id)}
                  aria-current={activeSection === id ? 'location' : undefined}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className={`w-full px-3 py-2 rounded-md text-left transition-colors ${
                    activeSection === id ? 'bg-emerald-700 text-white' : hoverBg
                  }`}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <ScrollProgress />
    </header>
  );
};

export default Header;
