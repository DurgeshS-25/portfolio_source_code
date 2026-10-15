import Reveal from './Reveal';
import { accent } from './styles';

// Page section wrapper. When `title` is given, renders the standard numbered heading.
// `background` renders decorative layers behind the content.
const Section = ({ id, number, title, width = 'max-w-5xl', background, children }) => (
  <section
    id={id}
    className="relative w-full py-20 px-4 scroll-mt-16"
    aria-labelledby={title ? `${id}-heading` : undefined}
  >
    {background}
    <div className={`relative ${width} mx-auto`}>
      {title && (
        <Reveal>
          <h2 id={`${id}-heading`} className="text-3xl font-bold mb-10 tracking-tight flex items-center">
            {number && <span className={`font-mono text-sm ${accent} mr-3`}>{number}.</span>}
            {title}
            <span aria-hidden="true" className="ml-4 h-px flex-1 max-w-xs bg-gradient-to-r from-emerald-500/40 to-transparent" />
          </h2>
        </Reveal>
      )}
      {children}
    </div>
  </section>
);

export default Section;
