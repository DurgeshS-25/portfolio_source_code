import { accent, muted } from './styles';

const BulletList = ({ items, compact = false }) => (
  <ul className={`${compact ? 'space-y-2 text-sm' : 'space-y-3'} ${muted}`}>
    {items.map((item) => (
      <li key={item} className="flex items-start">
        <span className={`${compact ? 'mr-2 mt-0.5' : 'mr-3 mt-1'} ${accent}`} aria-hidden="true">▹</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export default BulletList;
