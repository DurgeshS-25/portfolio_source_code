import { GraduationCap } from 'lucide-react';
import { accent, card, muted } from './styles';

const EducationCard = ({ degree, school, period }) => (
  <article className={card}>
    <div className="flex items-start">
      <GraduationCap size={22} className={`mr-3 mt-0.5 ${accent} flex-shrink-0`} aria-hidden="true" />
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{degree}</h3>
        <p className={`${muted} font-medium`}>{school}</p>
        <p className={`text-sm font-mono ${muted} mt-2`}>{period}</p>
      </div>
    </div>
  </article>
);

export default EducationCard;
