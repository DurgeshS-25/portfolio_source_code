import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { navItems } from '../data/portfolio';
import { accent, hoverBg, muted } from './styles';

const ThemeToggle = ({ isDark, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    className={`p-2 rounded-lg ${hoverBg} transition-colors`}
  >
    {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
  </button>
);

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
    <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-stone-950/90 border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            type="button"
            onClick={() => navigate('about')}
            className={`font-mono font-bold text-lg tracking-tight ${accent}`}
            aria-label="Back to top"
          >
            ~/durgesh
          </button>

          <nav aria-label="Primary" className="hidden md:flex items-center space-x-8">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => navigate(id)}
                aria-current={activeSection === id ? 'location' : undefined}
                className={`text-sm font-medium transition-colors ${
                  activeSection === id ? accent : `${muted} hover:text-stone-900 dark:hover:text-stone-100`
                }`}
              >
                {label}
              </button>
            ))}
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
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

      {isMenuOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="md:hidden bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
          <div className="px-4 py-3 space-y-2">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => navigate(id)}
                aria-current={activeSection === id ? 'location' : undefined}
                className={`w-full px-3 py-2 rounded-md text-left transition-colors ${
                  activeSection === id ? 'bg-emerald-700 text-white' : hoverBg
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
