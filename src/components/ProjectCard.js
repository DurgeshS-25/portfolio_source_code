import { ExternalLink } from 'lucide-react';
import BulletList from './BulletList';
import { card, iconLink, muted } from './styles';

const ProjectCard = ({ name, repo, stack, bullets }) => (
  <article className={`${card} transition-all hover:border-emerald-500/50`}>
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-xl font-semibold">
        <a href={repo} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 dark:hover:text-emerald-500 transition-colors">
          {name}
        </a>
      </h3>
      <a href={repo} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label={`${name} on GitHub`}>
        <ExternalLink size={20} aria-hidden="true" />
      </a>
    </div>
    <p className={`text-sm font-mono ${muted} mb-4`}>{stack.join(' • ')}</p>
    <BulletList items={bullets} compact />
  </article>
);

export default ProjectCard;
