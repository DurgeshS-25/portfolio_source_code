import { Braces, CakeSlice, Candy, CodeXml, Coffee, Cookie, Croissant, Donut, IceCreamCone, Pizza, Terminal } from 'lucide-react';

export const doodleIcons = {
  coffee: Coffee,
  pizza: Pizza,
  donut: Donut,
  cookie: Cookie,
  cake: CakeSlice,
  icecream: IceCreamCone,
  candy: Candy,
  croissant: Croissant,
  code: CodeXml,
  braces: Braces,
  terminal: Terminal,
};

// [icon, top %, left %, size px, rotation deg]. Kept near the edges so they sit behind margins, not text.
// Entries marked `wide` only show from the md breakpoint up, so phones stay uncluttered.
const patterns = {
  // The lower half of the hero is covered by the Technical Stack card, so these stay in the top half.
  hero: [
    ['coffee', 3, 36, 48, -12],
    ['code', 2, 57, 32, 8, 'wide'],
    ['cake', 4, 76, 36, -6, 'wide'],
    ['pizza', 9, 92, 48, 14],
    ['donut', 40, 1, 36, 10, 'wide'],
    ['braces', 36, 96, 30, -8, 'wide'],
    ['cookie', 55, 51, 38, 18, 'wide'],
    ['icecream', 50, 93, 40, -14, 'wide'],
  ],
  left: [
    ['coffee', 12, 2, 36, -10],
    ['braces', 58, 4, 28, 12, 'wide'],
    ['donut', 84, 93, 32, 16, 'wide'],
  ],
  right: [
    ['pizza', 10, 93, 38, 12],
    ['cookie', 54, 96, 28, -10, 'wide'],
    ['code', 86, 3, 30, 6, 'wide'],
  ],
  scatter: [
    ['coffee', 8, 4, 36, -10],
    ['pizza', 14, 90, 40, 12],
    ['candy', 48, 2, 30, 20, 'wide'],
    ['croissant', 46, 95, 32, -6, 'wide'],
    ['code', 82, 8, 30, 4, 'wide'],
    ['icecream', 80, 88, 36, -12],
  ],
};

// Faint, slowly floating coffee / food / code outlines for section backgrounds. Purely decorative.
const Doodles = ({ pattern = 'scatter' }) => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    {patterns[pattern].map(([icon, top, left, size, rotate, wide], i) => {
      const Icon = doodleIcons[icon];
      return (
        <span
          key={`${icon}-${i}`}
          className={`doodle absolute text-emerald-700/20 dark:text-emerald-400/[0.16] ${wide ? 'hidden md:block' : ''}`}
          style={{ top: `${top}%`, left: `${left}%`, '--doodle-rotate': `${rotate}deg`, animationDelay: `${-i * 1.7}s` }}
        >
          <Icon size={size} strokeWidth={1.5} />
        </span>
      );
    })}
  </div>
);

export default Doodles;
