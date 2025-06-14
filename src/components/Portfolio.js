import { useState } from 'react';
import { Mail, FileText, Database, Cloud, Code, ChevronRight, Menu, X } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Image URLs from Imgur (reliable image hosting service)
  const images = {
    // Primary images
    profile: "https://imgur.com/blX822m.jpg",
    northeastern: "https://imgur.com/ubkAsem.jpg",
    mumbai: "https://imgur.com/I4iNoyP.jpg",
    // Fallback images in case primary images fail
    profileFallback: "https://placehold.co/400x400/3B0764/FFFFFF?text=DS",
    northeasternFallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/NortheasternSeal.svg/1200px-NortheasternSeal.svg.png",
    mumbaiFallback: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ51Xxsm9KoAIbZYz9d6X2eWGrOV19w-iVguYjlPiCGYQ&s"
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    
    // Standard smooth scroll without offset adjustment since header is not fixed
    element.scrollIntoView({ behavior: 'smooth' });
    
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      {/* Main header - static, not fixed */}
      <header className="bg-black shadow-md z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 animate-pulse">DS</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <button 
                  onClick={() => scrollToSection('home')}
                  className={`${activeSection === 'home' ? 'text-purple-400' : 'text-gray-300'} hover:text-purple-400 px-2 py-1 text-sm font-medium transition-all duration-300 ease-in-out hover:-translate-y-1`}
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className={`${activeSection === 'about' ? 'text-purple-400' : 'text-gray-300'} hover:text-purple-400 px-2 py-1 text-sm font-medium transition-all duration-300 ease-in-out hover:-translate-y-1`}
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('skills')}
                  className={`${activeSection === 'skills' ? 'text-purple-400' : 'text-gray-300'} hover:text-purple-400 px-2 py-1 text-sm font-medium transition-all duration-300 ease-in-out hover:-translate-y-1`}
                >
                  Skills
                </button>
                <button 
                  onClick={() => scrollToSection('projects')}
                  className={`${activeSection === 'projects' ? 'text-purple-400' : 'text-gray-300'} hover:text-purple-400 px-2 py-1 text-sm font-medium transition-all duration-300 ease-in-out hover:-translate-y-1`}
                >
                  Projects
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className={`${activeSection === 'contact' ? 'text-purple-400' : 'text-gray-300'} hover:text-purple-400 px-2 py-1 text-sm font-medium transition-all duration-300 ease-in-out hover:-translate-y-1`}
                >
                  Contact
                </button>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-purple-400 focus:outline-none transition-transform duration-300 ease-in-out hover:rotate-90"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 pt-2 pb-4 px-2 animate-slideUp">
          <div className="flex flex-col space-y-2">
            <button 
              onClick={() => scrollToSection('home')}
              className={`${activeSection === 'home' ? 'bg-gray-700 text-purple-400' : 'text-gray-300'} hover:bg-gray-700 hover:text-purple-400 px-3 py-2 rounded-md text-base font-medium text-left transition-all duration-300 ease-in-out`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={`${activeSection === 'about' ? 'bg-gray-700 text-purple-400' : 'text-gray-300'} hover:bg-gray-700 hover:text-purple-400 px-3 py-2 rounded-md text-base font-medium text-left transition-all duration-300 ease-in-out`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className={`${activeSection === 'skills' ? 'bg-gray-700 text-purple-400' : 'text-gray-300'} hover:bg-gray-700 hover:text-purple-400 px-3 py-2 rounded-md text-base font-medium text-left transition-all duration-300 ease-in-out`}
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className={`${activeSection === 'projects' ? 'bg-gray-700 text-purple-400' : 'text-gray-300'} hover:bg-gray-700 hover:text-purple-400 px-3 py-2 rounded-md text-base font-medium text-left transition-all duration-300 ease-in-out`}
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`${activeSection === 'contact' ? 'bg-gray-700 text-purple-400' : 'text-gray-300'} hover:bg-gray-700 hover:text-purple-400 px-3 py-2 rounded-md text-base font-medium text-left transition-all duration-300 ease-in-out`}
            >
              Contact
            </button>
          </div>
        </div>
      )}

      {/* Content without top padding since header is not fixed */}
      <main>
        {/* Home Section */}
        <section id="home" className="py-20 bg-gray-900 flex items-center justify-center min-h-screen relative overflow-hidden">
          {/* Background animated elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-64 h-64 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
            <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-300"></div>
          </div>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
            <div>
              <div className="w-80 h-80 bg-gray-800 rounded-full overflow-hidden flex items-center justify-center mb-8 border-4 border-purple-500 animate-glow relative">
                {/* Profile image with better cropping - Using external URL */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src={images.profile} 
                    alt="Durgesh Sakhardande" 
                    className="min-w-full min-h-full object-cover"
                    style={{ 
                      objectPosition: 'center center'
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = images.profileFallback;
                      // If fallback also fails, show initials
                      e.target.onError = () => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-800 text-7xl font-bold text-purple-400">DS</div>';
                      };
                    }}
                  />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slideUp">
                Durgesh Sakhardande
              </h1>
              <div className="flex flex-col md:flex-row md:items-center justify-center space-y-2 md:space-y-0 md:space-x-4 mb-6 animate-slideUp delay-200">
                <span className="text-xl text-purple-400 font-semibold">Software Development Engineer</span>
                <span className="hidden md:block text-gray-300">|</span>
                <span className="text-xl text-purple-400 font-semibold">Data Engineer</span>
              </div>
              <p className="text-gray-300 mb-8 max-w-lg mx-auto animate-slideUp delay-300">
                Graduate student seeking roles in SDE and Data Engineering with expertise in cloud technologies and building scalable data solutions.
              </p>
              <div className="flex justify-center space-x-4 animate-slideUp delay-400">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium flex items-center hover-scale"
                >
                  View Projects <ChevronRight className="ml-1" size={18} />
                </button>
                <a 
                  href="https://drive.google.com/file/d/1N6nsE9O7CNgyqlcm_octnmB_DSe11fdz/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="border border-purple-600 text-purple-400 hover:bg-gray-800 px-6 py-2 rounded-md font-medium hover-scale flex items-center"
                >
                  <span className="mr-2">📄</span> Resume
                </a>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="border border-purple-600 text-purple-400 hover:bg-gray-800 px-6 py-2 rounded-md font-medium hover-scale"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-black relative overflow-hidden">
          {/* Background animation */}
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-purple-900 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-blue-900 rounded-full filter blur-3xl opacity-10 animate-pulse delay-500"></div>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl font-bold text-white mb-8 text-center animate-fadeIn">About Me</h2>
            <div className="bg-gray-800 shadow-lg rounded-lg p-8 border border-gray-700 animate-slideUp">
              <p className="text-gray-300 mb-6 animate-slideFromLeft delay-200">
                I'm a graduate Masters student at Northeastern University, pursuing a Master of Science in Information Systems. With a strong foundation in data pipelines, 
                cloud architecture, and business intelligence solutions, my expertise spans AWS and Azure cloud platforms,
                where I design and implement scalable data architectures.
              </p>
              <p className="text-gray-300 mb-6 animate-slideFromRight delay-300">
                With a background in Electronics and Telecommunication Engineering from the University of Mumbai,
                I bring a unique perspective to technology challenges. I'm passionate about transforming raw data 
                into actionable insights through efficient ETL processes and visualization, and I'm currently seeking roles
                in Software Engineering and Data Engineering.
              </p>
              
              {/* Education Section with University Images */}
              <div className="mt-8 animate-fadeIn delay-400">
                <h3 className="text-xl font-semibold text-purple-400 mb-6 text-center">Education</h3>
                
                {/* Northeastern University - Using external URL */}
                <div className="mb-10 bg-gray-900 rounded-lg p-6 border border-gray-700 hover-scale">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-1/3 flex justify-center">
                      <div className="w-40 h-40 rounded-lg overflow-hidden border-2 border-purple-500">
                        <img 
                          src={images.northeastern} 
                          alt="Northeastern University" 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = images.northeasternFallback;
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-2/3">
                      <div className="font-medium text-white text-xl">Northeastern University, Boston, MA</div>
                      <div className="text-purple-400 font-medium">Master of Science in Information Systems, May 2025</div>
                      <div className="text-gray-400 mt-2">
                        <p className="font-semibold mb-1">Relevant Coursework:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Data Management and Database Design</li>
                          <li>Designing Advanced Data Architectures for Business Intelligence</li>
                          <li>Data Science Engineering Methods and Tools</li>
                          <li>Application Engineering and Development</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* University of Mumbai - Using external URL */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 hover-scale">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-1/3 flex justify-center">
                      <div className="w-40 h-40 rounded-lg overflow-hidden border-2 border-purple-500">
                        <img 
                          src={images.mumbai} 
                          alt="University of Mumbai" 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = images.mumbaiFallback;
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-2/3">
                      <div className="font-medium text-white text-xl">University of Mumbai, Mumbai, India</div>
                      <div className="text-purple-400 font-medium">Bachelor of Science in Electronics and Telecommunication Engineering, May 2022</div>
                     <div className="text-gray-400 mt-2">
                        <p className="font-semibold mb-1">Relevant Coursework:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Applied Mathematics</li>
                          <li>Object Oriented Programming</li>
                          <li>Data Compression & Encryption</li>
                          <li>Big Data Analytics</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-gray-900 relative overflow-hidden">
          {/* Background animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 opacity-10 animate-gradient"></div>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl font-bold text-white mb-8 text-center animate-fadeIn">Technical Skills</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Languages */}
              <div className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700 hover-scale animate-slideFromLeft">
                <div className="flex items-center mb-4">
                  <Code className="text-purple-400 mr-3" size={24} />
                  <h3 className="text-xl font-semibold text-white">Languages</h3>
                </div>
                <ul className="space-y-2">
                  <li className="text-gray-300">Python</li>
                  <li className="text-gray-300">MySQL</li>
                  <li className="text-gray-300">PostgreSQL</li>
                  <li className="text-gray-300">JavaScript</li>
                  <li className="text-gray-300">Java</li>
                </ul>
              </div>
              
              {/* Technologies */}
              <div className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700 hover-scale animate-slideUp">
                <div className="flex items-center mb-4">
                  <Database className="text-purple-400 mr-3" size={24} />
                  <h3 className="text-xl font-semibold text-white">Technologies</h3>
                </div>
                <ul className="space-y-2">
                  <li className="text-gray-300">Azure Data Factory</li>
                  <li className="text-gray-300">Data Modeling</li>
                  <li className="text-gray-300">Apache Airflow</li>
                  <li className="text-gray-300">AWS S3, Glue, Redshift</li>
                  <li className="text-gray-300">Azure Synapse Analytics</li>
                </ul>
              </div>
              
              {/* Frameworks */}
              <div className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700 hover-scale animate-slideFromRight">
                <div className="flex items-center mb-4">
                  <Code className="text-purple-400 mr-3" size={24} />
                  <h3 className="text-xl font-semibold text-white">Frameworks</h3>
                </div>
                <ul className="space-y-2">
                  <li className="text-gray-300">Pandas</li>
                  <li className="text-gray-300">NumPy</li>
                  <li className="text-gray-300">PySpark</li>
                  <li className="text-gray-300">Matplotlib</li>
                  <li className="text-gray-300">Scikit-Learn</li>
                </ul>
              </div>
              
              {/* Visualization */}
              <div className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700 hover-scale animate-slideFromLeft delay-300">
                <div className="flex items-center mb-4">
                  <FileText className="text-purple-400 mr-3" size={24} />
                  <h3 className="text-xl font-semibold text-white">Visualization</h3>
                </div>
                <ul className="space-y-2">
                  <li className="text-gray-300">Power BI</li>
                  <li className="text-gray-300">Tableau</li>
                  <li className="text-gray-300">AWS QuickSight</li>
                </ul>
              </div>
              
              {/* Cloud Platforms */}
              <div className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700 hover-scale animate-slideUp delay-300">
                <div className="flex items-center mb-4">
                  <Cloud className="text-purple-400 mr-3 animate-pulse" size={24} />
                  <h3 className="text-xl font-semibold text-white">Cloud Platforms</h3>
                </div>
                <ul className="space-y-2">
                  <li className="text-gray-300">Microsoft Azure</li>
                  <li className="text-gray-300">Amazon Web Services (AWS)</li>
                </ul>
              </div>
              
              {/* Certifications */}
              <div className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700 hover-scale animate-slideFromRight delay-300">
                <div className="flex items-center mb-4">
                  <FileText className="text-purple-400 mr-3" size={24} />
                  <h3 className="text-xl font-semibold text-white">Certifications</h3>
                </div>
                <ul className="space-y-2">
                  <li className="text-gray-300">AWS Cloud Practitioner</li>
                  <li className="text-gray-300">AWS Data Engineer Associate (in progress)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section with Flip Cards */}
        <section id="projects" className="py-20 bg-black relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-900 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-900 rounded-full filter blur-3xl opacity-10 animate-pulse delay-500"></div>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl font-bold text-white mb-2 text-center animate-fadeIn">Projects</h2>
            <p className="text-gray-400 text-center mb-10 animate-fadeIn delay-200">Some of my recent work</p>
            
            {/* Project Grid - 2x2 Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Project 1 - Flip Card */}
              <div className="flip-card h-96 w-full perspective-1000 animate-slideFromLeft">
                <div className="flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-3d hover:rotate-y-180">
                  {/* Front of card */}
                  <div className="flip-card-front absolute w-full h-full backface-hidden bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-6 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2">Intelligent Research Assistant</h3>
                    <div className="text-sm text-purple-400 mb-4">FastAPI, Elasticsearch, Streamlit, Python, Ollama API</div>
                    <p className="text-gray-300 flex-grow">
                      AI-powered research assistant for efficient search and summarization of research papers, using FastAPI and Elasticsearch for backend processing and Streamlit for an interactive user interface.
                    </p>
                    <p className="text-purple-300 text-sm mt-4 italic">Hover to see details</p>
                  </div>
                  
                  {/* Back of card */}
                  <div className="flip-card-back absolute w-full h-full backface-hidden bg-gray-800 rounded-lg shadow-xl border border-purple-700 p-6 flex flex-col rotate-y-180">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Key Features</h3>
                    <ul className="space-y-2 mb-4 flex-grow">
                      <li className="flex items-start">
                        <ChevronRight className="text-purple-400 mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-300">Developed an AI-powered research assistant enabling efficient search and summarization</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="text-purple-400 mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-300">Integrated Ollama API for real-time text summarization</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="text-purple-400 mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-300">Built an interactive Streamlit UI for optimal user experience</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="text-purple-400 mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-300">Implemented scalable FastAPI endpoints, reducing query latency</span>
                      </li>
                    </ul>
                    <div className="flex space-x-4 mt-2">
                      <a href="https://github.com/shalakapadalkar16/Intelligent-Research-Assistant" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 flex items-center hover-bright">
                        <span className="mr-1">📁</span> Repository
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Project 2 - Flip Card */}
              <div className="flip-card h-96 w-full perspective-1000 animate-slideFromRight">
                <div className="flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-3d hover:rotate-y-180">
                  {/* Front of card */}
                  <div className="flip-card-front absolute w-full h-full backface-hidden bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-6 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2">AdventureWorks Data Pipeline</h3>
                    <div className="text-sm text-purple-400 mb-4">Azure Data Factory, Azure Databricks, Synapse Analytics</div>
                    <p className="text-gray-300 flex-grow">
                      End-to-end ETL pipeline for the AdventureWorks dataset, demonstrating expertise in Azure cloud technologies and data transformation techniques.
                    </p>
                    <p className="text-purple-300 text-sm mt-4 italic">Hover to see details</p>
                  </div>
                  
                  {/* Back of card */}
                  <div className="flip-card-back absolute w-full h-full backface-hidden bg-gray-800 rounded-lg shadow-xl border border-purple-700 p-6 flex flex-col rotate-y-180">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Key Features</h3>
                    <ul className="space-y-2 mb-4 flex-grow">
                      <li className="flex items-start">
                        <ChevronRight className="text-purple-400 mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-300">Implemented a scalable ETL pipeline using Azure Data Factory and Databricks</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="text-purple-400 mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-300">Transformed data with aggregations, timestamp conversions, and business logic</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="text-purple-400 mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-300">Configured Synapse Analytics for external tables and optimized queries</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="text-purple-400 mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-300">Developed Power BI dashboards for visualization and insights</span>
                      </li>
                    </ul>
                    <div className="flex space-x-4 mt-2">
                      <a href="https://github.com/DurgeshS-25/Adventure-works-Piepline" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 flex items-center hover-bright">
                        <span className="mr-1">📁</span> Repository
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Project 3 - Flip Card */}
              <div className="flip-card h-96 w-full perspective-1000 animate-slideFromLeft delay-300">
                <div className="flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-3d hover:rotate-y-180">
                  {/* Front of card */}
                  <div className="flip-card-front absolute w-full h-full backface-hidden bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-6 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2">Reddit Data Pipeline</h3>
                    <div className="text-sm text-purple-400 mb-4">AWS (S3, Glue, Athena, Redshift, QuickSight), Reddit API</div>
                    <p className="text-gray-300 flex-grow">
                      Comprehensive data pipeline extracting and analyzing Reddit data, showcasing proficiency in AWS services and API integration.
                    </p>
                    <p className="text-purple-300 text-sm mt-4 italic">Hover to see details</p>
                  </div>
                  
                  {/* Back of card */}
                  <div className="flip-card-back absolute w-full h-full backface-hidden bg-gray-800 rounded-lg shadow-xl border border-purple-700 p-6 flex flex-col rotate-y-180">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Key Features</h3>
                    <ul className="space-y-2 mb-4 flex-grow">
                      <li className="flex items-start">
                        <ChevronRight className="text-purple-400 mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-300">Designed an end-to-end data pipeline with the Reddit API and Apache Airflow</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="text-purple-400 mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-300">Transformed raw data in S3 using AWS Glue and validated with Athena</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="text-purple-400 mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-300">Configured Redshift cluster for scalable analytics and insights</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="text-purple-400 mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-300">Created interactive QuickSight dashboards for data visualization</span>
                      </li>
                    </ul>
                    <div className="flex space-x-4 mt-2">
                      <a href="https://github.com/DurgeshS-25/Reddit-Pipeline" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 flex items-center hover-bright">
                        <span className="mr-1">📁</span> Repository
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Project 4 - Flip Card */}
              <div className="flip-card h-96 w-full perspective-1000 animate-slideFromRight delay-300">
                <div className="flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-3d hover:rotate-y-180">
                  {/* Front of card */}
                  <div className="flip-card-front absolute w-full h-full backface-hidden bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-6 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2">Urban Traffic Collision Pipeline</h3>
                    <div className="text-sm text-purple-400 mb-4">Data Modeling, Dimension Modeling, PowerBI, Tableau</div>
                    <p className="text-gray-300 flex-grow">
                      ETL pipeline for urban traffic collision data from multiple cities, featuring dimensional modeling and interactive visualizations.
                    </p>
                    <p className="text-purple-300 text-sm mt-4 italic">Hover to see details</p>
                  </div>
                  
                  {/* Back of card */}
                  <div className="flip-card-back absolute w-full h-full backface-hidden bg-gray-800 rounded-lg shadow-xl border border-purple-700 p-6 flex flex-col rotate-y-180">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Key Features</h3>
                    <ul className="space-y-2 mb-4 flex-grow">
                      <li className="flex items-start">
                        <ChevronRight className="text-purple-400 mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-300">Built an ETL pipeline to consolidate collision data from three cities</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="text-purple-400 mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-300">Conducted data profiling and designed a dimensional model using MySQL</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="text-purple-400 mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-300">Developed interactive dashboards in Power BI and Tableau</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="text-purple-400 mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-300">Enabled stakeholders to analyze trends and make data-driven decisions</span>
                      </li>
                    </ul>
                    <div className="flex space-x-4 mt-2">
                      <a href="https://github.com/DurgeshS-25/Urban-Traffic-Collision-Pipeline" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 flex items-center hover-bright">
                        <span className="mr-1">📁</span> Repository
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-900 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-purple-900 opacity-30 rounded-full filter blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-900 opacity-30 rounded-full filter blur-xl animate-pulse delay-700"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-900 opacity-20 rounded-full filter blur-xl animate-pulse delay-300"></div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl font-bold text-white mb-2 text-center animate-fadeIn">Get In Touch</h2>
            <p className="text-gray-400 text-center mb-10 animate-fadeIn delay-200">I'd love to hear about your project or opportunity</p>
            
            <div className="bg-gray-800 shadow-lg rounded-lg p-8 border border-gray-700 animate-slideUp">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="animate-slideFromLeft">
                  <h3 className="text-xl font-semibold text-purple-400 mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start hover-scale group">
                      <div className="bg-gray-700 p-3 rounded-lg mr-4 group-hover:bg-purple-600 transition-colors duration-300">
                        <Mail className="text-purple-400 group-hover:text-white transition-colors duration-300" size={20} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Email</div>
                        <a href="mailto:sakhardande.d@northeastern.edu" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">sakhardande.d@northeastern.edu</a>
                      </div>
                    </div>
                    <div className="flex items-start hover-scale group">
                      <div className="bg-gray-700 p-3 rounded-lg mr-4 group-hover:bg-purple-600 transition-colors duration-300">
                        <div className="text-purple-400 group-hover:text-white transition-colors duration-300">
                          <span style={{ fontSize: '20px' }}>🔗</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">LinkedIn</div>
                        <a href="https://www.linkedin.com/in/durgesh-s/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">linkedin.com/in/durgesh-s</a>
                      </div>
                    </div>
                    <div className="flex items-start hover-scale group">
                      <div className="bg-gray-700 p-3 rounded-lg mr-4 group-hover:bg-purple-600 transition-colors duration-300">
                        <div className="text-purple-400 group-hover:text-white transition-colors duration-300">
                          <span style={{ fontSize: '20px' }}>📁</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">GitHub</div>
                        <a href="https://github.com/DurgeshS-25" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">github.com/DurgeshS-25</a>
                      </div>
                    </div>
                    <div className="flex items-start hover-scale group">
                      <div className="bg-gray-700 p-3 rounded-lg mr-4 group-hover:bg-purple-600 transition-colors duration-300">
                        <div className="text-purple-400 group-hover:text-white transition-colors duration-300">
                          <span style={{ fontSize: '20px' }}>📱</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Phone</div>
                        <a href="tel:8573347980" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">(857) 334-7980</a>
                      </div>
                    </div>
                    <div className="flex items-start hover-scale group">
                      <div className="bg-gray-700 p-3 rounded-lg mr-4 group-hover:bg-purple-600 transition-colors duration-300">
                        <div className="text-purple-400 group-hover:text-white transition-colors duration-300">
                          <span style={{ fontSize: '20px' }}>📄</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Resume</div>
                        <a href="https://drive.google.com/file/d/1N6nsE9O7CNgyqlcm_octnmB_DSe11fdz/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">View or Download Resume</a>
                      </div>
                    </div>
                  </div>
                </div>
                
                    <div className="animate-slideFromRight">
                  <h3 className="text-xl font-semibold text-purple-400 mb-6">Send Message</h3>
                  <div className="space-y-4">
                    <p className="text-gray-300">For direct contact, please reach out via email or phone. You can also connect with me on LinkedIn.</p>
                    
                    <div className="flex flex-col space-y-2">
                      <a 
                        href="mailto:sakhardande.d@northeastern.edu" 
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium hover-scale w-full flex items-center justify-center"
                      >
                        <Mail className="mr-2" size={18} /> Email Me Directly
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/durgesh-s/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium hover-scale w-full flex items-center justify-center"
                      >
                        <span className="mr-2">🔗</span> Connect on LinkedIn
                      </a>
                      <a 
                        href="https://github.com/DurgeshS-25" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md font-medium hover-scale w-full flex items-center justify-center"
                      >
                        <span className="mr-2">📁</span> Follow on GitHub
                      </a>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
                      <p className="text-gray-300 text-center">I'm currently looking for roles in Software Development and Data Engineering. Let's connect!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-8 relative overflow-hidden">
          {/* Footer background animation */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0 animate-slideFromLeft">
                <div className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Durgesh Sakhardande</div>
                <div className="text-gray-400 text-sm">Software Development Engineer | Data Engineer</div>
              </div>
              <div className="flex space-x-6 animate-slideFromRight">
                <a href="https://www.linkedin.com/in/durgesh-s/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-all duration-300 ease-in-out hover:-translate-y-1">
                  <span style={{ fontSize: '20px' }}>🔗</span>
                </a>
                <a href="https://github.com/DurgeshS-25" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-all duration-300 ease-in-out hover:-translate-y-1">
                  <span style={{ fontSize: '20px' }}>📁</span>
                </a>
                <a href="mailto:sakhardande.d@northeastern.edu" className="text-gray-400 hover:text-purple-400 transition-all duration-300 ease-in-out hover:-translate-y-1">
                  <Mail size={20} />
                </a>
              </div>
            </div>
            <div className="mt-6 text-center text-gray-400 text-sm animate-fadeIn delay-500">
              © {new Date().getFullYear()} Durgesh Sakhardande. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Portfolio;