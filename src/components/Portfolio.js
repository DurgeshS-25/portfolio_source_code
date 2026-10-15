import { useCallback, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { education, experience, navItems, projects, usesSkill } from '../data/portfolio';
import useActiveSection from '../hooks/useActiveSection';
import useTheme from '../hooks/useTheme';
import Contact from './Contact';
import EducationTimeline from './EducationTimeline';
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
  // Skill chip selected in the Technical Stack card; dims work that doesn't use it.
  const [selectedSkill, setSelectedSkill] = useState(null);

  const scrollToSection = useCallback(
    (id) => {
      setActiveSection(id);
      document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    },
    [setActiveSection]
  );

  const matchState = (item) => {
    if (!selectedSkill) return { highlighted: false, dimmed: false };
    const match = usesSkill(item, selectedSkill);
    return { highlighted: match, dimmed: !match };
  };

  return (
    <MotionConfig reducedMotion="user">
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
          <Hero
            onNavigate={scrollToSection}
            onToggleTheme={toggleTheme}
            selectedSkill={selectedSkill}
            onSelectSkill={setSelectedSkill}
          />

          <Section id="experience" number={sectionNumber('experience')} title="Experience">
            <div className="space-y-6">
              {experience.map((job) => (
                <ExperienceCard
                  key={`${job.company}-${job.period}`}
                  {...job}
                  {...matchState(job)}
                  selectedSkill={selectedSkill}
                />
              ))}
            </div>
          </Section>

          <Section id="education" number={sectionNumber('education')} title="Education">
            <EducationTimeline items={education} />
          </Section>

          <Section id="projects" number={sectionNumber('projects')} title="Featured Work">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.name}
                  {...project}
                  {...matchState(project)}
                  selectedSkill={selectedSkill}
                  featured={i === 0}
                  index={i}
                />
              ))}
            </div>
          </Section>

          <Contact number={sectionNumber('contact')} />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
};

export default Portfolio;
