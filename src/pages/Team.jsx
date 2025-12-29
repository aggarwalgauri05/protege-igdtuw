import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // <--- The magic library
import Header from '../components/Header';
import { teamSections } from '../data/teamData';
import './Team.css';

const Team = () => {
  const [activeTab, setActiveTab] = useState('core');
  const currentSection = teamSections.find(section => section.id === activeTab);
  const scrollRef = useRef(null);

  // Scroll logic for Core carousel
  const scrollCarousel = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      direction === 'left' 
        ? current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        : current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header />
      <div className="team-page-container">
        
        {/* HEADER WITH FADE IN */}
        <motion.div 
          className="team-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="page-title">Meet the <span className="highlight">Team</span></h1>
          <p className="page-subtitle">The architects of the future.</p>
        </motion.div>

        {/* GROUP PHOTO (Subtle scale in) */}
        <motion.div 
          className="group-photo-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
           <img src="/team/group-photo.jpg" alt="Core Team" className="group-photo" onError={(e) => e.target.style.display = 'none'} />
        </motion.div>

        {/* --- ANIMATED SLIDING TABS --- */}
        <div className="team-nav-container">
          <div className="team-nav-scroll">
            {teamSections.map((section) => (
              <button 
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`nav-box ${activeTab === section.id ? 'active' : ''}`}
              >
                {/* The "Floating Pill" Background */}
                {activeTab === section.id && (
                  <motion.div 
                    layoutId="activeTab" 
                    className="active-pill"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="nav-text">{section.title.replace(" Team", "")}</span>
              </button>
            ))}
          </div>
        </div>

        {/* --- CONTENT AREA WITH STAGGERED ENTRANCE --- */}
        <div className="team-content-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab ? activeTab : "empty"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <section className="department-section">
                
                {currentSection && currentSection.id === 'core' ? (
                  // CAROUSEL VIEW (Core)
                  <div className="carousel-wrapper">
                    <button className="nav-btn left-btn" onClick={() => scrollCarousel('left')}>&#8249;</button>
                    <div className="carousel-container" ref={scrollRef}>
                      {currentSection.members.map((member, idx) => (
                        <TeamCard key={idx} member={member} index={idx} />
                      ))}
                    </div>
                    <button className="nav-btn right-btn" onClick={() => scrollCarousel('right')}>&#8250;</button>
                  </div>
                ) : (
                  // GRID VIEW (Others)
                  <div className="members-grid centered-grid">
                    {currentSection && currentSection.members.map((member, idx) => (
                       <TeamCard key={idx} member={member} index={idx} />
                    ))}
                  </div>
                )}

              </section>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </>
  );
};

// --- NEW COMPONENT: THE HOLOGRAPHIC CARD ---
const TeamCard = ({ member, index }) => {
  return (
    <motion.div 
      className="member-card"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }} // Stagger effect
      whileHover={{ y: -10 }} // Float up on hover
    >
      <div className="card-image-box">
        <img 
          src={member.image} 
          alt={member.name} 
          onError={(e) => e.target.src="https://via.placeholder.com/150"} 
        />
        {/* Overlay Effect */}
        <div className="image-overlay"></div>
      </div>
      
      <div className="card-info">
        <h3>{member.name}</h3>
        <p className="member-role">{member.role}</p>
        
        {/* Hidden LinkedIn Button that slides up */}
        <a href={member.linkedin || "#"} className="linkedin-link">
          Connect &rarr;
        </a>
      </div>
    </motion.div>
  );
};

export default Team;