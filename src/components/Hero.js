import { useState } from 'react';
import { FileText, Github, Linkedin } from 'lucide-react';
import { profile } from '../data/portfolio';
import Section from './Section';
import Skills from './Skills';
import { accent, btnPrimary, btnSecondary, muted } from './styles';

const ProfilePhoto = () => {
  const [failed, setFailed] = useState(false);

  return (
    <div className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-emerald-600 dark:border-emerald-500 shadow-xl mx-auto md:mx-0">
      {failed ? (
        <div className="w-full h-full flex items-center justify-center bg-emerald-700 text-white text-6xl font-bold" aria-label={profile.name} role="img">
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
            className="w-full h-full object-cover"
            onError={() => setFailed(true)}
          />
        </picture>
      )}
    </div>
  );
};

const Hero = () => (
  <Section id="about" width="max-w-6xl">
    <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
      <div className="flex-shrink-0">
        <ProfilePhoto />
      </div>

      <div className="flex-1">
        <div className="mb-6">
          <p className={`font-mono text-sm ${accent} mb-2`} aria-hidden="true">$ whoami</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">{profile.name}</h1>
          <p className={`text-xl md:text-2xl ${muted} font-light`}>{profile.title}</p>
        </div>

        <p className={`text-lg ${muted} mb-8 leading-relaxed`}>{profile.bio}</p>

        <div className="flex flex-wrap gap-3">
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} px-5 py-2.5`}>
            <FileText size={16} className="mr-2" aria-hidden="true" />
            Resume
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className={`${btnSecondary} px-5 py-2.5`}>
            <Github size={16} className="mr-2" aria-hidden="true" />
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={`${btnSecondary} px-5 py-2.5`}>
            <Linkedin size={16} className="mr-2" aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </div>
    </div>

    <Skills />
  </Section>
);

export default Hero;
