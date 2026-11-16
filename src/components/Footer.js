import { CodeXml, Coffee, Donut, Github, Linkedin, Mail, Pizza } from 'lucide-react';
import { profile } from '../data/portfolio';
import { iconLink, muted } from './styles';

const Footer = () => (
  <footer className="w-full py-8 px-4 border-t border-stone-200 dark:border-stone-800">
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className={`text-sm font-mono ${muted} mb-4 md:mb-0 text-center md:text-left`}>
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p className="mt-1 inline-flex items-center gap-1.5 text-xs">
            built with
            <Coffee size={14} className="text-amber-700 dark:text-amber-400" aria-hidden="true" />
            <Pizza size={14} className="text-orange-700 dark:text-orange-400" aria-hidden="true" />
            <Donut size={14} className="text-pink-700 dark:text-pink-400" aria-hidden="true" />
            <span className="sr-only">coffee, pizza, sweets</span>
            &amp;
            <CodeXml size={14} className="text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
            <span className="sr-only">code</span>
          </p>
        </div>
        <div className="flex items-center space-x-6">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="GitHub">
            <Github size={20} aria-hidden="true" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="LinkedIn">
            <Linkedin size={20} aria-hidden="true" />
          </a>
          <a href={`mailto:${profile.email}`} className={iconLink} aria-label="Email">
            <Mail size={20} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
