import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/portfolio';
import { iconLink, muted } from './styles';

const Footer = () => (
  <footer className="w-full py-8 px-4 border-t border-stone-200 dark:border-stone-800">
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className={`text-sm font-mono ${muted} mb-4 md:mb-0`}>
          © {new Date().getFullYear()} {profile.name}
        </p>
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
