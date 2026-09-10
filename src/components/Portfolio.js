import { useState, useEffect } from 'react';
import { Mail, Menu, X, Github, Linkedin, Sun, Moon, ExternalLink, GraduationCap, Download, Terminal } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setIsDark(saved === 'dark');
    }
    // Set initial background
    document.body.style.backgroundColor = saved === 'dark' ? '#0c0a09' : '#fafaf9';
    document.documentElement.style.backgroundColor = saved === 'dark' ? '#0c0a09' : '#fafaf9';
  }, []);

  useEffect(() => {
    // Update body background color when theme changes
    document.body.style.backgroundColor = isDark ? '#0c0a09' : '#fafaf9';
    document.documentElement.style.backgroundColor = isDark ? '#0c0a09' : '#fafaf9';
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const bg = isDark ? 'bg-stone-950' : 'bg-stone-50';
  const text = isDark ? 'text-stone-100' : 'text-stone-900';
  const textMuted = isDark ? 'text-stone-400' : 'text-stone-600';
  const cardBg = isDark ? 'bg-stone-900' : 'bg-white';
  const border = isDark ? 'border-stone-800' : 'border-stone-200';
  const hover = isDark ? 'hover:bg-stone-800' : 'hover:bg-stone-100';
  const accent = 'text-emerald-500';
  const accentBg = 'bg-emerald-500 hover:bg-emerald-600';

  return (
    <div className={`w-full min-h-screen ${bg} ${text} transition-colors duration-300`} style={{ margin: 0, padding: 0, position: 'relative' }}>
      {/* Header */}
      <header className={`w-full sticky top-0 z-50 backdrop-blur-md ${isDark ? 'bg-stone-950/90' : 'bg-white/90'} border-b ${border}`} style={{ margin: 0 }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => scrollToSection('about')}
              className="font-mono font-bold text-lg tracking-tight text-emerald-500"
            >
              ~/durgesh
            </button>

            <div className="hidden md:flex items-center space-x-8">
              {['About', 'Experience', 'Education', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.toLowerCase()
                      ? accent
                      : `${textMuted} ${isDark ? 'hover:text-stone-100' : 'hover:text-stone-900'}`
                  }`}
                >
                  {item}
                </button>
              ))}
              <button onClick={toggleTheme} className={`p-2 rounded-lg ${hover} transition-colors`}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <button onClick={toggleTheme} className={`p-2 rounded-lg ${hover}`}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className={`md:hidden ${cardBg} border-b ${border}`}>
          <div className="px-4 py-3 space-y-2">
            {['About', 'Experience', 'Education', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`w-full px-3 py-2 rounded-md text-left transition-colors ${
                  activeSection === item.toLowerCase()
                    ? 'bg-emerald-500 text-white'
                    : hover
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <main className="w-full">
        {/* About Section */}
        <section id="about" className="w-full py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
              {/* Profile Photo */}
              <div className="flex-shrink-0 order-first">
                <div className={`w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 ${isDark ? 'border-emerald-500' : 'border-emerald-600'} shadow-xl mx-auto md:mx-0`}>
                  <img
                    src="/profile.jpg"
                    alt="Durgesh Sakhardande"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/400x400/10b981/FFFFFF?text=DS";
                    }}
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="mb-6">
                  <p className={`font-mono text-sm ${accent} mb-2`}>$ whoami</p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                    Durgesh Sakhardande
                  </h1>
                  <p className={`text-xl md:text-2xl ${textMuted} font-light`}>
                    Software Development Engineer
                  </p>
                </div>

                <p className={`text-lg ${textMuted} mb-8 leading-relaxed font-light`}>
                  Backend engineer with a year of production experience building data ingestion
                  pipelines, microservices, and search systems. I work mostly in Python and Java,
                  and I care about the parts nobody sees: schema validation, failure handling,
                  and knowing why a system is slow before touching it.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="/Durgesh_Sakhardande_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-5 py-2.5 ${accentBg} text-white rounded-md font-medium transition-colors`}
                  >
                    <Download size={16} className="mr-2" />
                    Resume
                  </a>
                  <a
                    href="https://github.com/DurgeshS-25"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-5 py-2.5 ${cardBg} border ${border} rounded-md font-medium ${hover} transition-colors`}
                  >
                    <Github size={16} className="mr-2" />
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/durgesh-s/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-5 py-2.5 ${cardBg} border ${border} rounded-md font-medium ${hover} transition-colors`}
                  >
                    <Linkedin size={16} className="mr-2" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className={`${cardBg} border ${border} rounded-xl p-8 mt-16`}>
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Terminal size={20} className={`mr-2 ${accent}`} />
                Technical Stack
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className={`text-xs font-mono uppercase tracking-wider ${textMuted} mb-3`}>Languages</p>
                  <p className="font-light">Java, Python, JavaScript, SQL, TypeScript</p>
                </div>
                <div>
                  <p className={`text-xs font-mono uppercase tracking-wider ${textMuted} mb-3`}>Backend & APIs</p>
                  <p className="font-light">Spring Boot, Node.js, FastAPI, RESTful APIs, Microservices</p>
                </div>
                <div>
                  <p className={`text-xs font-mono uppercase tracking-wider ${textMuted} mb-3`}>Infrastructure</p>
                  <p className="font-light">Docker, AWS, Azure, RabbitMQ, PostgreSQL, MongoDB</p>
                </div>
                <div>
                  <p className={`text-xs font-mono uppercase tracking-wider ${textMuted} mb-3`}>Frameworks & Tools</p>
                  <p className="font-light">Eureka, Keycloak, Spring Cloud, React, Elasticsearch</p>
                </div>
                <div>
                  <p className={`text-xs font-mono uppercase tracking-wider ${textMuted} mb-3`}>Visualization</p>
                  <p className="font-light">Tableau, Power BI, AWS QuickSight</p>
                </div>
                <div>
                  <p className={`text-xs font-mono uppercase tracking-wider ${textMuted} mb-3`}>Certifications</p>
                  <p className="font-light">AWS Certified Cloud Practitioner (CLF-C02)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="w-full py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 tracking-tight flex items-center">
              <span className={`font-mono text-sm ${accent} mr-3`}>01.</span>
              Experience
            </h2>

            <div className={`${cardBg} border ${border} rounded-xl p-8`}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Software Development Engineer</h3>
                  <p className={`${accent} font-medium`}>Community Dreams Foundation</p>
                </div>
                <span className={`text-sm font-mono ${textMuted} mt-1 md:mt-0`}>Jun 2025 - Jun 2026</span>
              </div>
              <ul className={`space-y-3 ${textMuted} font-light`}>
                <li className="flex items-start">
                  <span className={`mr-3 mt-1 ${accent}`}>▹</span>
                  <span>Engineered Supabase Edge Functions (TypeScript, Deno) for end-to-end OCR ingestion service with Google Vision API</span>
                </li>
                <li className="flex items-start">
                  <span className={`mr-3 mt-1 ${accent}`}>▹</span>
                  <span>Implemented production-grade ETL pipeline with schema validation and normalization for clinical biomarker processing</span>
                </li>
                <li className="flex items-start">
                  <span className={`mr-3 mt-1 ${accent}`}>▹</span>
                  <span>Added observability through structured logging and failure-state tracking for asynchronous ingestion workflows</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="w-full py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 tracking-tight flex items-center">
              <span className={`font-mono text-sm ${accent} mr-3`}>02.</span>
              Education
            </h2>

            <div className={`${cardBg} border ${border} rounded-xl p-8 mb-6`}>
              <div className="flex items-start">
                <GraduationCap size={22} className={`mr-3 mt-0.5 ${accent} flex-shrink-0`} />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">Master of Science in Information Systems</h3>
                  <p className={`${textMuted} font-medium`}>Northeastern University</p>
                  <p className={`text-sm font-mono ${textMuted} mt-2`}>Sep 2023 - May 2025</p>
                </div>
              </div>
            </div>

            <div className={`${cardBg} border ${border} rounded-xl p-8`}>
              <div className="flex items-start">
                <GraduationCap size={22} className={`mr-3 mt-0.5 ${accent} flex-shrink-0`} />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">Bachelor of Engineering in Electronics and Telecommunication</h3>
                  <p className={`${textMuted} font-medium`}>University of Mumbai</p>
                  <p className={`text-sm font-mono ${textMuted} mt-2`}>Aug 2018 - May 2022</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 tracking-tight flex items-center">
              <span className={`font-mono text-sm ${accent} mr-3`}>03.</span>
              Featured Work
            </h2>

            <div className="space-y-6">
              {/* AI Fitness Tracker */}
              <div className={`${cardBg} border ${border} rounded-xl p-8 transition-all hover:border-emerald-500/50`}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold">AI Fitness Tracker</h3>
                  <a
                    href="https://github.com/DurgeshS-25/AIFitnessTracker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${textMuted} hover:text-emerald-500 transition-colors`}
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
                <p className={`text-sm font-mono ${textMuted} mb-4`}>
                  Spring Boot • RabbitMQ • Eureka • OpenAI API • MongoDB
                </p>
                <ul className={`space-y-2 ${textMuted} font-light text-sm`}>
                  <li className="flex items-start">
                    <span className={`mr-2 mt-0.5 ${accent}`}>▹</span>
                    <span>Architected microservices-based fitness tracker with Spring Boot, RabbitMQ, and Eureka for modular scalability</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`mr-2 mt-0.5 ${accent}`}>▹</span>
                    <span>Integrated OpenAI API for personalized fitness insights from real-time wearable data</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`mr-2 mt-0.5 ${accent}`}>▹</span>
                    <span>Implemented OAuth 2.0 authentication with Keycloak and API Gateway for unified security</span>
                  </li>
                </ul>
              </div>

              {/* Intelligent Research Assistant */}
              <div className={`${cardBg} border ${border} rounded-xl p-8 transition-all hover:border-emerald-500/50`}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold">Intelligent Research Assistant</h3>
                  <a
                    href="https://github.com/DurgeshS-25/Intelligent-Research-Assistant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${textMuted} hover:text-emerald-500 transition-colors`}
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
                <p className={`text-sm font-mono ${textMuted} mb-4`}>
                  FastAPI • Elasticsearch • Streamlit • Python • Ollama API
                </p>
                <ul className={`space-y-2 ${textMuted} font-light text-sm`}>
                  <li className="flex items-start">
                    <span className={`mr-2 mt-0.5 ${accent}`}>▹</span>
                    <span>Built AI-powered research assistant indexing 500+ papers with FastAPI and Elasticsearch</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`mr-2 mt-0.5 ${accent}`}>▹</span>
                    <span>Integrated Ollama API for automated summarization over the indexed corpus</span>
                  </li>
                </ul>
              </div>

              {/* Urban Traffic Collision Pipeline */}
              <div className={`${cardBg} border ${border} rounded-xl p-8 transition-all hover:border-emerald-500/50`}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold">Urban Traffic Collision Pipeline</h3>
                  <a
                    href="https://github.com/DurgeshS-25/Urban-Traffic-Collision-Pipeline"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${textMuted} hover:text-emerald-500 transition-colors`}
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
                <p className={`text-sm font-mono ${textMuted} mb-4`}>
                  Python • MySQL • Power BI • Tableau • ETL
                </p>
                <ul className={`space-y-2 ${textMuted} font-light text-sm`}>
                  <li className="flex items-start">
                    <span className={`mr-2 mt-0.5 ${accent}`}>▹</span>
                    <span>Constructed ETL pipeline consolidating 85K+ collision records with data validation in Python</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`mr-2 mt-0.5 ${accent}`}>▹</span>
                    <span>Designed dimensional data model with 8 tables optimized for analytical queries</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className={`font-mono text-sm ${accent} mb-4`}>04. What's Next?</p>
              <h2 className="text-3xl font-bold mb-4 tracking-tight">Get In Touch</h2>
              <p className={`text-lg ${textMuted} font-light max-w-xl mx-auto`}>
                I'm currently seeking roles in Software Development and Backend Engineering.
                Let's connect if you have an opportunity or just want to chat.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href="mailto:durgeshss25@gmail.com"
                className={`inline-flex items-center px-6 py-3 ${accentBg} text-white rounded-md font-medium transition-colors`}
              >
                <Mail size={18} className="mr-2" />
                Send Email
              </a>
              <a
                href="https://www.linkedin.com/in/durgesh-s/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-6 py-3 ${cardBg} border ${border} rounded-md font-medium ${hover} transition-colors`}
              >
                <Linkedin size={18} className="mr-2" />
                LinkedIn
              </a>
            </div>

            <div className={`${cardBg} border ${border} rounded-xl p-8 max-w-md mx-auto`}>
              <div className="space-y-4 text-center">
                <div>
                  <p className={`text-xs font-mono uppercase tracking-wider ${textMuted} mb-1`}>Email</p>
                  <p className="font-medium">durgeshss25@gmail.com</p>
                </div>
                <div>
                  <p className={`text-xs font-mono uppercase tracking-wider ${textMuted} mb-1`}>Location</p>
                  <p className="font-medium">Irving, TX — open to remote</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`w-full py-8 px-4 border-t ${border}`}>
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className={`text-sm font-mono ${textMuted} mb-4 md:mb-0`}>
                © 2026 Durgesh Sakhardande
              </p>
              <div className="flex items-center space-x-6">
                <a
                  href="https://github.com/DurgeshS-25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${textMuted} hover:text-emerald-500 transition-colors`}
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/durgesh-s/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${textMuted} hover:text-emerald-500 transition-colors`}
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:durgeshss25@gmail.com"
                  className={`${textMuted} hover:text-emerald-500 transition-colors`}
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Portfolio;