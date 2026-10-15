import { accent } from './styles';

// Page section wrapper. When `title` is given, renders the standard numbered heading.
const Section = ({ id, number, title, width = 'max-w-5xl', children }) => (
  <section
    id={id}
    className="w-full py-20 px-4 scroll-mt-16"
    aria-labelledby={title ? `${id}-heading` : undefined}
  >
    <div className={`${width} mx-auto`}>
      {title && (
        <h2 id={`${id}-heading`} className="text-3xl font-bold mb-10 tracking-tight flex items-center">
          {number && <span className={`font-mono text-sm ${accent} mr-3`}>{number}.</span>}
          {title}
        </h2>
      )}
      {children}
    </div>
  </section>
);

export default Section;
