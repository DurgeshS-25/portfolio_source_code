import { motion } from 'motion/react';
import BulletList from './BulletList';
import PipelineDiagram from './PipelineDiagram';
import Reveal from './Reveal';
import { accent, muted } from './styles';

const ExperienceCard = ({ role, company, period, stack = [], bullets, pipeline, selectedSkill, highlighted, dimmed }) => (
  <Reveal>
    <motion.article
      animate={{ opacity: dimmed ? 0.45 : 1 }}
      className={`glow-card rounded-xl p-8 bg-white dark:bg-stone-900 border transition-colors ${
        highlighted ? 'border-emerald-500/70 ring-1 ring-emerald-500/40' : 'border-stone-200 dark:border-stone-800'
      }`}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{role}</h3>
          <p className={`${accent} font-medium`}>{company}</p>
        </div>
        <span className={`text-sm font-mono ${muted} mt-1 md:mt-0`}>{period}</span>
      </div>

      {stack.length > 0 && (
        <ul className="flex flex-wrap gap-2 mb-5" aria-label="Tech stack">
          {stack.map((s) => (
            <li
              key={s}
              className={`px-2 py-0.5 rounded font-mono text-xs border transition-colors ${
                selectedSkill && s.toLowerCase() === selectedSkill.toLowerCase()
                  ? 'bg-emerald-700 border-emerald-700 text-white'
                  : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
              }`}
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      <BulletList items={bullets} />

      {pipeline && <PipelineDiagram stages={pipeline} />}
    </motion.article>
  </Reveal>
);

export default ExperienceCard;
