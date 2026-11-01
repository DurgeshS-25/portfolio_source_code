import { useCallback, useEffect, useState } from 'react';
import { education, experience, projects, sectionIds, usesSkill } from '../data/portfolio';
import useActiveSection from '../hooks/useActiveSection';
import useTheme from '../hooks/useTheme';
import Contact from './Contact';
import EducationTimeline from './EducationTimeline';
import ExperienceCard from './ExperienceCard';
import Hero from './Hero';
import ProjectCard from './ProjectCard';
import Section from './Section';
import SiteLayout from './SiteLayout';

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

  // Links from other pages (e.g. /blog) arrive as /#section. The browser can't jump there itself
  // because the sections don't exist until React renders, so do it once on mount.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!sectionIds.includes(id)) return;
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView();
  }, [setActiveSection]);

  const matchState = (item) => {
    if (!selectedSkill) return { highlighted: false, dimmed: false };
    const match = usesSkill(item, selectedSkill);
    return { highlighted: match, dimmed: !match };
  };

  return (
    <SiteLayout
      activeSection={activeSection}
      onNavigate={scrollToSection}
      isDark={isDark}
      onToggleTheme={toggleTheme}
    >
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
    </SiteLayout>
  );
};

export default Portfolio;
