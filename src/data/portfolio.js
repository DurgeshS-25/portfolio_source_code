// All site content lives here. Updating the portfolio should only require editing this file.

export const profile = {
  name: 'Durgesh Sakhardande',
  initials: 'DS',
  title: 'Software Development Engineer',
  bio:
    'Backend engineer with a year of production experience building data ingestion ' +
    'pipelines, microservices, and search systems. I work mostly in Python and Java, ' +
    'and I care about the parts nobody sees: schema validation, failure handling, ' +
    'and knowing why a system is slow before touching it.',
  email: 'durgeshss25@gmail.com',
  location: 'Irving, TX — open to remote',
  focus: 'Python · Java · data pipelines · microservices · search',
  status: 'open to SDE and backend roles',
  resume: 'https://drive.google.com/file/d/1tdaY9bh36MepJ3EtwMQkw_HhABttV6I7/view?usp=sharing',
  github: 'https://github.com/DurgeshS-25',
  linkedin: 'https://www.linkedin.com/in/durgesh-s/',
  contactBlurb:
    "I'm currently seeking roles in Software Development and Backend Engineering. " +
    "Let's connect if you have an opportunity or just want to chat.",
};

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const skills = [
  { category: 'Languages', items: ['Java', 'Python', 'JavaScript', 'SQL', 'TypeScript'] },
  { category: 'Backend & APIs', items: ['Spring Boot', 'Node.js', 'FastAPI', 'RESTful APIs', 'Microservices'] },
  { category: 'Infrastructure', items: ['Docker', 'AWS', 'Azure', 'RabbitMQ', 'PostgreSQL', 'MongoDB'] },
  { category: 'Frameworks & Tools', items: ['Eureka', 'Keycloak', 'Spring Cloud', 'React', 'Elasticsearch'] },
  { category: 'Visualization', items: ['Tableau', 'Power BI', 'AWS QuickSight'] },
  { category: 'Certifications', items: ['AWS Certified Cloud Practitioner (CLF-C02)'] },
];

export const experience = [
  {
    role: 'Software Development Engineer',
    company: 'Community Dreams Foundation',
    period: 'Jun 2025 - Jun 2026',
    stack: ['TypeScript', 'Deno', 'Supabase', 'Google Vision API', 'ETL'],
    // Stages shown in the animated pipeline diagram on the experience card.
    pipeline: [
      { label: 'Upload', icon: 'upload', description: 'Documents arrive through Supabase Edge Functions written in TypeScript on Deno.' },
      { label: 'OCR', icon: 'ocr', description: 'Google Vision API extracts the raw text from each uploaded document.' },
      { label: 'Validate', icon: 'validate', description: 'Schema validation rejects malformed results. Failures are tracked and logged, never dropped silently.' },
      { label: 'Normalize', icon: 'normalize', description: 'Clinical biomarker names and values are normalized into one consistent schema.' },
      { label: 'Store', icon: 'store', description: 'Clean records are persisted, with structured logs tracing every ingestion end to end.' },
    ],
    bullets: [
      'Engineered Supabase Edge Functions (TypeScript, Deno) for end-to-end OCR ingestion service with Google Vision API',
      'Implemented production-grade ETL pipeline with schema validation and normalization for clinical biomarker processing',
      'Added observability through structured logging and failure-state tracking for asynchronous ingestion workflows',
    ],
  },
];

export const education = [
  {
    degree: 'Master of Science in Information Systems',
    school: 'Northeastern University',
    period: 'Sep 2023 - May 2025',
  },
  {
    degree: 'Bachelor of Engineering in Electronics and Telecommunication',
    school: 'University of Mumbai',
    period: 'Aug 2018 - May 2022',
  },
];

// `stack` is shown on each card; `tags` adds skills the work demonstrates that aren't in the stack line.
// Both are matched (case-insensitively) against the skill chips to power the skill filter.
export const usesSkill = (item, skill) =>
  [...(item.stack || []), ...(item.tags || [])].some((s) => s.toLowerCase() === skill.toLowerCase());

export const projects = [
  {
    name: 'AI Fitness Tracker',
    repo: 'https://github.com/DurgeshS-25/AIFitnessTracker',
    stack: ['Spring Boot', 'RabbitMQ', 'Eureka', 'OpenAI API', 'MongoDB'],
    tags: ['Java', 'Microservices', 'Keycloak'],
    bullets: [
      'Architected microservices-based fitness tracker with Spring Boot, RabbitMQ, and Eureka for modular scalability',
      'Integrated OpenAI API for personalized fitness insights from real-time wearable data',
      'Implemented OAuth 2.0 authentication with Keycloak and API Gateway for unified security',
    ],
  },
  {
    name: 'Intelligent Research Assistant',
    repo: 'https://github.com/DurgeshS-25/Intelligent-Research-Assistant',
    stack: ['FastAPI', 'Elasticsearch', 'Streamlit', 'Python', 'Ollama API'],
    bullets: [
      'Built AI-powered research assistant indexing 500+ papers with FastAPI and Elasticsearch',
      'Integrated Ollama API for automated summarization over the indexed corpus',
    ],
  },
  {
    name: 'Urban Traffic Collision Pipeline',
    repo: 'https://github.com/DurgeshS-25/Urban-Traffic-Collision-Pipeline',
    stack: ['Python', 'MySQL', 'Power BI', 'Tableau', 'ETL'],
    tags: ['SQL'],
    bullets: [
      'Constructed ETL pipeline consolidating 85K+ collision records with data validation in Python',
      'Designed dimensional data model with 8 tables optimized for analytical queries',
    ],
  },
];
