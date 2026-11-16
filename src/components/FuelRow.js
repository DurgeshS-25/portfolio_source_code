import { fuel } from '../data/portfolio';
import { doodleIcons } from './Doodles';
import { muted } from './styles';

// Full-color accents for the "fuelled by" row. -700 in light mode keeps the labels at WCAG AA.
const tones = {
  coffee: 'text-amber-700 dark:text-amber-400 bg-amber-500/10 ring-amber-500/30',
  pizza: 'text-orange-700 dark:text-orange-400 bg-orange-500/10 ring-orange-500/30',
  sweets: 'text-pink-700 dark:text-pink-400 bg-pink-500/10 ring-pink-500/30',
  code: 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 ring-emerald-500/30',
};

const FuelRow = () => (
  <div className="flex flex-wrap items-center gap-2 mt-6">
    <span className={`font-mono text-xs ${muted} mr-1`} aria-hidden="true">fuelled by</span>
    <ul className="flex flex-wrap gap-2" aria-label="Fuelled by">
      {fuel.map(({ id, label, icon }) => {
        const Icon = doodleIcons[icon];
        return (
          <li
            key={id}
            className={`wiggle inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ring-1 font-mono text-xs ${tones[id]}`}
          >
            <Icon size={14} aria-hidden="true" />
            {label}
          </li>
        );
      })}
    </ul>
  </div>
);

export default FuelRow;
