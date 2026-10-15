// Shared Tailwind class strings. Light/dark variants use Tailwind's `dark:` class strategy.
// emerald-700 is used for light-mode text and for button fills so text meets WCAG AA contrast.
export const muted = 'text-stone-600 dark:text-stone-400';
export const accent = 'text-emerald-700 dark:text-emerald-500';
export const card = 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-8';
export const hoverBg = 'hover:bg-stone-100 dark:hover:bg-stone-800';
export const btnPrimary =
  'inline-flex items-center bg-emerald-700 hover:bg-emerald-800 text-white rounded-md font-medium transition-colors';
export const btnSecondary =
  `inline-flex items-center bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-md font-medium ${hoverBg} transition-colors`;
export const iconLink = `${muted} hover:text-emerald-700 dark:hover:text-emerald-500 transition-colors`;
