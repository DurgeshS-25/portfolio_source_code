import BulletList from './BulletList';
import { accent, card, muted } from './styles';

const ExperienceCard = ({ role, company, period, bullets }) => (
  <article className={card}>
    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
      <div>
        <h3 className="text-xl font-semibold">{role}</h3>
        <p className={`${accent} font-medium`}>{company}</p>
      </div>
      <span className={`text-sm font-mono ${muted} mt-1 md:mt-0`}>{period}</span>
    </div>
    <BulletList items={bullets} />
  </article>
);

export default ExperienceCard;
