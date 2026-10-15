import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { GraduationCap } from 'lucide-react';
import Reveal from './Reveal';
import { card, muted } from './styles';

// Vertical timeline whose emerald line draws itself as the section scrolls into view.
const EducationTimeline = ({ items }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className="relative pl-12">
      <div aria-hidden="true" className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-stone-200 dark:bg-stone-800 rounded-full" />
      <motion.div
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute left-[19px] top-2 bottom-2 w-0.5 origin-top rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600"
      />

      <ol className="space-y-8">
        {items.map(({ degree, school, period }, i) => (
          <li key={degree} className="relative">
            <motion.span
              aria-hidden="true"
              className="absolute -left-12 top-6 w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-stone-900 border-2 border-emerald-500 text-emerald-700 dark:text-emerald-400 shadow-md shadow-emerald-700/20"
              initial={{ scale: 0, rotate: -45 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 1, margin: '0px 0px -25% 0px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            >
              <GraduationCap size={18} />
            </motion.span>
            <Reveal delay={i * 0.1}>
              <article className={`${card} glow-card`}>
                <p className={`text-sm font-mono ${muted} mb-2`}>{period}</p>
                <h3 className="text-xl font-semibold">{degree}</h3>
                <p className={`${muted} font-medium`}>{school}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default EducationTimeline;
