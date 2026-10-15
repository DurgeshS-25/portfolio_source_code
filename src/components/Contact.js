import { Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/portfolio';
import Reveal from './Reveal';
import Section from './Section';
import { accent, btnPrimary, btnSecondary, card, muted } from './styles';

const Contact = ({ number }) => (
  <Section id="contact">
    <Reveal className="text-center mb-12">
      <p className={`font-mono text-sm ${accent} mb-4`}>{number}. What's Next?</p>
      <h2 className="text-3xl font-bold mb-4 tracking-tight">Get In Touch</h2>
      <p className={`text-lg ${muted} max-w-xl mx-auto`}>{profile.contactBlurb}</p>
    </Reveal>

    <Reveal delay={0.1} className="flex flex-wrap justify-center gap-4 mb-12">
      <a href={`mailto:${profile.email}`} className={`${btnPrimary} px-6 py-3`}>
        <Mail size={18} className="mr-2" aria-hidden="true" />
        Send Email
      </a>
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={`${btnSecondary} px-6 py-3`}>
        <Linkedin size={18} className="mr-2" aria-hidden="true" />
        LinkedIn
      </a>
    </Reveal>

    <Reveal delay={0.2} className={`${card} glow-card max-w-md mx-auto`}>
      <dl className="space-y-4 text-center">
        <div>
          <dt className={`text-xs font-mono uppercase tracking-wider ${muted} mb-1`}>Email</dt>
          <dd className="font-medium">{profile.email}</dd>
        </div>
        <div>
          <dt className={`text-xs font-mono uppercase tracking-wider ${muted} mb-1`}>Location</dt>
          <dd className="font-medium">{profile.location}</dd>
        </div>
      </dl>
    </Reveal>
  </Section>
);

export default Contact;
