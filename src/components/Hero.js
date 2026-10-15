import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Github, Linkedin } from 'lucide-react';
import { profile } from '../data/portfolio';
import Section from './Section';
import Skills from './Skills';
import Terminal from './Terminal';
import { accent, btnPrimary, btnSecondary, muted } from './styles';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const ProfilePhoto = () => {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0">
      <div className="absolute -inset-1 rounded-full avatar-ring opacity-90" aria-hidden="true" />
      <div className="absolute inset-0.5 rounded-full overflow-hidden bg-stone-50 dark:bg-stone-950 p-0.5">
        {failed ? (
          <div
            role="img"
            aria-label={profile.name}
            className="w-full h-full rounded-full flex items-center justify-center bg-emerald-700 text-white text-3xl font-bold"
          >
            {profile.initials}
          </div>
        ) : (
          <picture>
            <source srcSet="/profile.webp" type="image/webp" />
            <img
              src="/profile.jpg"
              alt={profile.name}
              width="640"
              height="640"
              className="w-full h-full rounded-full object-cover"
              onError={() => setFailed(true)}
            />
          </picture>
        )}
      </div>
    </div>
  );
};

// Each word of the name slides up from behind a mask.
const AnimatedName = ({ text }) => (
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight" aria-label={text}>
    {text.split(' ').map((word, i) => (
      <span key={word} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.25em]" aria-hidden="true">
        <motion.span
          className="inline-block"
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      </span>
    ))}
  </h1>
);

const HeroBackground = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 hero-grid" />
    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] max-w-full rounded-full hero-glow" />
  </div>
);

const Hero = ({ onNavigate, onToggleTheme, selectedSkill, onSelectSkill }) => (
  <Section id="about" width="max-w-6xl" background={<HeroBackground />}>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="flex items-center gap-5 mb-6">
          <ProfilePhoto />
          <div>
            <p className={`font-mono text-sm ${accent}`} aria-hidden="true">$ whoami</p>
            <p className={`font-mono text-xs ${muted} mt-1`}>{profile.location}</p>
          </div>
        </motion.div>

        <AnimatedName text={profile.name} />

        <motion.p variants={item} className={`text-xl md:text-2xl ${muted} font-light mb-6`}>
          {profile.title}
        </motion.p>

        <motion.p variants={item} className={`text-lg ${muted} mb-8 leading-relaxed`}>
          {profile.bio}
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-3">
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnPrimary} px-5 py-2.5 shadow-lg shadow-emerald-700/20`}
          >
            <FileText size={16} className="mr-2" aria-hidden="true" />
            Resume
          </motion.a>
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnSecondary} px-5 py-2.5`}
          >
            <Github size={16} className="mr-2" aria-hidden="true" />
            GitHub
          </motion.a>
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnSecondary} px-5 py-2.5`}
          >
            <Linkedin size={16} className="mr-2" aria-hidden="true" />
            LinkedIn
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Terminal onNavigate={onNavigate} onToggleTheme={onToggleTheme} />
      </motion.div>
    </div>

    <Skills selectedSkill={selectedSkill} onSelectSkill={onSelectSkill} onNavigate={onNavigate} />
  </Section>
);

export default Hero;
