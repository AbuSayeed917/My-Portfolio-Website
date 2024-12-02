import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Smooth loading transition
    const timer = setTimeout(() => setIsLoading(false), 1500);

    // Scroll progress indicator
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);

      // Active section detection
      const sections = ['home', 'skills', 'projects', 'achievements'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false);
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">MAS</div>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className={`navbar ${activeSection !== 'home' ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <div className="logo">
            <span className="logo-text">MAS</span>
          </div>
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {['Home', 'Skills', 'Projects', 'Achievements'].map((item) => (
              <button
                key={item}
                className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                onClick={() => handleNavClick(item.toLowerCase())}
              >
                {item}
              </button>
            ))}
          </div>
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Muhammad Abu Sayeed
            <div className="title-background"></div>
          </h1>
          <h2 className="hero-subtitle">Developer & Tech Enthusiast</h2>
          <p className="hero-bio">
            BSc Computer Science student at Brunel University London, 
            crafting innovative digital solutions.
          </p>
          <div className="cta-container">
            <button 
              onClick={() => handleNavClick('projects')} 
              className="cta-button primary"
            >
              View Projects
            </button>
            <a 
              href="mailto:muhammadabusayeed084@gmail.com" 
              className="cta-button secondary"
            >
              Contact Me
            </a>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse"></div>
          <div className="arrow"></div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <h2 className="section-title">Technical Expertise</h2>
        <div className="skills-grid">
          {[
            {
              title: "Programming & Development",
              skills: ["Python", "Java", "JavaScript", "React", "Spring Boot"],
              icon: "💻"
            },
            {
              title: "Data & Databases",
              skills: ["MySQL", "MongoDB", "SPSS", "Data Analysis"],
              icon: "🔍"
            },
            {
              title: "Tools & Technologies",
              skills: ["Git", "AWS", "Linux", "JIRA"],
              icon: "🛠️"
            }
          ].map((category, index) => (
            <div key={index} className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              <ul className="skill-list">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {[
            {
              title: "Digital Twin Simulation",
              description: "AI-powered medication prediction system using digital twin technology",
              tech: ["Python", "React", "AI"],
              status: "Ongoing"
            },
            {
              title: "Brunel Fit",
              description: "Health & fitness tracking platform with personalized recommendations",
              tech: ["React", "Spring Boot", "MySQL"],
              status: "Completed"
            },
            {
              title: "Flight Management System",
              description: "Optimized airport operations system for flight scheduling",
              tech: ["Java", "MySQL"],
              status: "Completed"
            }
          ].map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-content">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <span className="project-status">{project.status}</span>
                </div>
                <p>{project.description}</p>
                <div className="tech-stack">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="achievements">
        <h2 className="section-title">Achievements</h2>
        <div className="achievements-grid">
          {[
            {
              icon: "🏆",
              title: "Outstanding Group Presentation Award",
              description: "Recognized for exceptional presentation skills at Brunel University"
            },
            {
              icon: "🎯",
              title: "Brunel Ready Programme Semi-finalist",
              description: "Selected for leadership development initiative, working on UN projects"
            },
            {
              icon: "🔒",
              title: "Google Cybersecurity Certificate",
              description: "Completed comprehensive cybersecurity training program"
            }
          ].map((achievement, index) => (
            <div key={index} className="achievement-card">
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-content">
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="social-links">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/muhammad-abu-sayeed-4955722b3/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:muhammadabusayeed084@gmail.com" 
              className="social-link"
            >
              Email
            </a>
          </div>
          <p className="copyright">
            © {new Date().getFullYear()} Muhammad Abu Sayeed. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;