import { Terminal } from 'lucide-react';
import { skills } from '../data/portfolio';
import { accent, card, muted } from './styles';

const Skills = () => (
  <div className={`${card} mt-16`}>
    <h2 className="text-lg font-semibold mb-6 flex items-center">
      <Terminal size={20} className={`mr-2 ${accent}`} aria-hidden="true" />
      Technical Stack
    </h2>
    <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skills.map(({ category, items }) => (
        <div key={category}>
          <dt className={`text-xs font-mono uppercase tracking-wider ${muted} mb-3`}>{category}</dt>
          <dd>{items.join(', ')}</dd>
        </div>
      ))}
    </dl>
  </div>
);

export default Skills;
