import { AnimatePresence, motion } from 'motion/react';
import { ArrowDown, Terminal, X } from 'lucide-react';
import { experience, projects, skills, usesSkill } from '../data/portfolio';
import Reveal from './Reveal';
import { accent, card, muted } from './styles';

const matchCount = (skill) => ({
  projects: projects.filter((p) => usesSkill(p, skill)).length,
  roles: experience.filter((e) => usesSkill(e, skill)).length,
});

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

const Chip = ({ skill, selected, onSelect }) => {
  const { projects: p, roles: r } = matchCount(skill);
  const base = 'px-3 py-1.5 rounded-full text-sm border transition-colors';

  // Skills not tied to any project or role aren't filterable, so they render as plain tags.
  if (!p && !r) {
    return <span className={`${base} border-stone-200 dark:border-stone-800 ${muted}`}>{skill}</span>;
  }

  return (
    <motion.button
      type="button"
      layout
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.94 }}
      aria-pressed={selected}
      onClick={() => onSelect(selected ? null : skill)}
      className={`${base} ${
        selected
          ? 'bg-emerald-700 border-emerald-700 text-white shadow-md shadow-emerald-700/30'
          : 'border-emerald-500/30 bg-emerald-500/5 text-stone-800 dark:text-stone-200 hover:border-emerald-500/70 hover:bg-emerald-500/10'
      }`}
    >
      {skill}
    </motion.button>
  );
};

const Skills = ({ selectedSkill, onSelectSkill, onNavigate }) => {
  const counts = selectedSkill ? matchCount(selectedSkill) : null;

  return (
    <Reveal className={`${card} mt-16`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
        <h2 className="text-lg font-semibold flex items-center">
          <Terminal size={20} className={`mr-2 ${accent}`} aria-hidden="true" />
          Technical Stack
        </h2>
        <p className={`text-xs font-mono ${muted}`}>Click a highlighted skill to see where I've used it</p>
      </div>

      <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map(({ category, items }) => (
          <div key={category}>
            <dt className={`text-xs font-mono uppercase tracking-wider ${muted} mb-3`}>{category}</dt>
            <dd className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <Chip key={skill} skill={skill} selected={selectedSkill === skill} onSelect={onSelectSkill} />
              ))}
            </dd>
          </div>
        ))}
      </dl>

      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div role="status" className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center gap-3 text-sm">
              <span>
                <span className={`font-semibold ${accent}`}>{selectedSkill}</span>{' '}
                <span className={muted}>
                  shows up in{' '}
                  {[counts.projects && plural(counts.projects, 'project'), counts.roles && plural(counts.roles, 'role')]
                    .filter(Boolean)
                    .join(' and ')}
                </span>
              </span>
              <button
                type="button"
                onClick={() => onNavigate(counts.projects ? 'projects' : 'experience')}
                className={`inline-flex items-center gap-1 font-medium ${accent} hover:underline`}
              >
                View <ArrowDown size={14} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onSelectSkill(null)}
                className={`inline-flex items-center gap-1 ${muted} hover:text-stone-900 dark:hover:text-stone-100`}
              >
                <X size={14} aria-hidden="true" /> Clear
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
};

export default Skills;
