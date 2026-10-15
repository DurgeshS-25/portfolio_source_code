import { education, experience, navItems, projects } from '../data/portfolio';
import useActiveSection from '../hooks/useActiveSection';
import useTheme from '../hooks/useTheme';
import Contact from './Contact';
import EducationCard from './EducationCard';
import ExperienceCard from './ExperienceCard';
import Footer from './Footer';
import Header from './Header';
import Hero from './Hero';
import ProjectCard from './ProjectCard';
import Section from './Section';

const sectionIds = navItems.map((item) => item.id);

// Sections after "about" get numbered headings (01., 02., ...) in nav order.
const sectionNumber = (id) => String(sectionIds.indexOf(id)).padStart(2, '0');

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

const Portfolio = () => {
  const { isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useActiveSection(sectionIds);

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-md focus:bg-emerald-700 focus:text-white"
      >
        Skip to content
      </a>

      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main id="main" className="w-full">
        <Hero />

        <Section id="experience" number={sectionNumber('experience')} title="Experience">
          <div className="space-y-6">
            {experience.map((job) => (
              <ExperienceCard key={`${job.company}-${job.period}`} {...job} />
            ))}
          </div>
        </Section>

        <Section id="education" number={sectionNumber('education')} title="Education">
          <div className="space-y-6">
            {education.map((edu) => (
              <EducationCard key={edu.degree} {...edu} />
            ))}
          </div>
        </Section>

        <Section id="projects" number={sectionNumber('projects')} title="Featured Work">
          <div className="space-y-6">
            {projects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </div>
        </Section>

        <Contact number={sectionNumber('contact')} />
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
