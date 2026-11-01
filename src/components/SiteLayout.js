import { MotionConfig } from 'motion/react';
import Footer from './Footer';
import Header from './Header';

// Shared page shell: skip link, header, main landmark, and footer.
// Header props are passed through; see Header for what each page provides.
const SiteLayout = ({ children, ...headerProps }) => (
  <MotionConfig reducedMotion="user">
    <div className="w-full min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-md focus:bg-emerald-700 focus:text-white"
      >
        Skip to content
      </a>

      <Header {...headerProps} />

      <main id="main" className="w-full">
        {children}
      </main>

      <Footer />
    </div>
  </MotionConfig>
);

export default SiteLayout;
