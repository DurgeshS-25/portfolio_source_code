import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import Reveal from './Reveal';
import { accent, iconLink, muted } from './styles';

const tagList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const tag = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

const Bullet = ({ text }) => (
  <li className="flex items-start">
    <span className={`mr-2 mt-0.5 ${accent}`} aria-hidden="true">▹</span>
    <span>{text}</span>
  </li>
);

const ProjectCard = ({ name, repo, stack, bullets, selectedSkill, dimmed, highlighted, featured, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [first, ...rest] = bullets;
  const headingId = `project-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const detailsId = `${headingId}-details`;

  return (
    // Outer element handles the scroll reveal; the article handles filter dimming and hover,
    // so the two animations don't fight over opacity.
    <Reveal delay={index * 0.08} className={featured ? 'md:col-span-2' : ''}>
      <motion.article
        layout
        aria-labelledby={headingId}
        data-dimmed={dimmed || undefined}
        animate={{ opacity: dimmed ? 0.35 : 1, scale: dimmed ? 0.97 : 1, filter: dimmed ? 'grayscale(1)' : 'grayscale(0)' }}
        whileHover={dimmed ? undefined : { y: -6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`glow-card h-full rounded-xl p-8 bg-white dark:bg-stone-900 border shadow-sm hover:shadow-xl hover:shadow-emerald-900/10 transition-shadow ${
          highlighted ? 'border-emerald-500/70 ring-1 ring-emerald-500/40' : 'border-stone-200 dark:border-stone-800'
        }`}
      >
        <div className="flex justify-between items-start mb-3 gap-4">
          <h3 id={headingId} className="text-xl font-semibold">
            <a href={repo} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 dark:hover:text-emerald-500 transition-colors">
              {name}
            </a>
          </h3>
          <a href={repo} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label={`${name} on GitHub`}>
            <ExternalLink size={20} aria-hidden="true" />
          </a>
        </div>

        <motion.ul
          className="flex flex-wrap gap-2 mb-5"
          aria-label="Tech stack"
          variants={tagList}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {stack.map((s) => {
            const match = selectedSkill && s.toLowerCase() === selectedSkill.toLowerCase();
            return (
              <motion.li
                key={s}
                variants={tag}
                className={`px-2 py-0.5 rounded font-mono text-xs border transition-colors ${
                  match
                    ? 'bg-emerald-700 border-emerald-700 text-white'
                    : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                }`}
              >
                {s}
              </motion.li>
            );
          })}
        </motion.ul>

        <ul className={`space-y-2 text-sm ${muted}`}>
          <Bullet text={first} />
        </ul>

        {rest.length > 0 && (
          <>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.ul
                  id={detailsId}
                  key="details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`overflow-hidden text-sm ${muted}`}
                >
                  {rest.map((b, i) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06 }}
                      className="flex items-start pt-2"
                    >
                      <span className={`mr-2 mt-0.5 ${accent}`} aria-hidden="true">▹</span>
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls={detailsId}
              className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${accent} hover:underline`}
            >
              {expanded ? 'Show less' : `Show ${rest.length} more`}
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} className="inline-flex">
                <ChevronDown size={16} aria-hidden="true" />
              </motion.span>
            </button>
          </>
        )}
      </motion.article>
    </Reveal>
  );
};

export default ProjectCard;
