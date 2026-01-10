import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import { teamSections } from '../data/teamData';
import './Team.css';

// Simple LinkedIn Icon Component
const LinkedInIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="linkedin-icon"
  >
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.22-.6-1.93-1.84-1.93-1 0-1.62.67-1.62 1.93V19h-3v-9h3v1.2c.49-.76 1.48-1.39 2.63-1.39C17.55 9.81 19 11.23 19 14v5z"/>
  </svg>
);

const Team = () => {
  const [activeTab, setActiveTab] = useState('core');
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [mobileRevealOpen, setMobileRevealOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || (navigator.maxTouchPoints && navigator.maxTouchPoints > 1) 
        || window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Helper to find data
  const coreSection = teamSections.find(s => s.id === 'core');
  const currentSection = teamSections.find(s => s.id === activeTab);

  // --- FILTERING LOGIC ---
  let leftSidebarMembers = [];
  let rightContentMembers = [];

  if (activeTab === 'core') {
    // LEFT: Still just President & VP for the spotlight
    leftSidebarMembers = coreSection?.members.filter(m => 
      m.role.toLowerCase().includes('president')
    ) || [];
    
    // RIGHT: Includes everyone (President, VP, Leads)
    rightContentMembers = coreSection?.members || []; 

  } else {
    const leadKeywords = {
      tech: 'tech lead',
      management: 'management lead',
      research: 'research lead',
      media: 'media' 
    };
    const keyword = leadKeywords[activeTab];

    const coreLeads = coreSection?.members.filter(m => 
      m.role.toLowerCase().includes(keyword)
    ) || [];

    const sectionLeads = currentSection?.members.filter(m => 
        m.role.toLowerCase().includes('lead')
    ) || [];

    leftSidebarMembers = [...coreLeads, ...sectionLeads];
    // Remove duplicates if any
    leftSidebarMembers = [...new Set(leftSidebarMembers)];

    const rawMembers = currentSection?.members || [];
    const nonLeads = rawMembers.filter(m => !m.role.toLowerCase().includes('lead'));

    const getPriority = (role) => {
      const r = role.toLowerCase();
      if (r.includes('associate')) return 1;
      if (r.includes('head coordinator')) return 2;
      return 3; 
    };

    rightContentMembers = nonLeads.sort((a, b) => 
      getPriority(a.role) - getPriority(b.role)
    );
  }

  // --- CAROUSEL LOGIC ---
  useEffect(() => {
    setSpotlightIndex(0);
    setMobileRevealOpen(false);
  }, [activeTab]);

  useEffect(() => {
    setMobileRevealOpen(false);
  }, [spotlightIndex]);

  useEffect(() => {
    if (leftSidebarMembers.length <= 1) return;
    const interval = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % leftSidebarMembers.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [leftSidebarMembers.length, activeTab]);

  const currentSpotlightMember = leftSidebarMembers[spotlightIndex];

  return (
    <>
      <Header />
      
      <div className="team-container">
        
        {/* --- LEFT STATIC SIDEBAR --- */}
        <div className="left-panel">
          
          <motion.div
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // CHANGED: Reduced delay from 1.5 to 0.2 for faster load
            transition={{ duration: 0.8, delay: 0.2 }} 
          >
            <AnimatePresence mode="wait">
              {currentSpotlightMember ? (
                <motion.div 
                  key={currentSpotlightMember.name} 
                  className={`profile-spotlight ${isMobile ? 'mobile-mode' : ''}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }} 
                >
                  
                  <div className="spotlight-img">
                    <img 
                      src={currentSpotlightMember.image} 
                      alt={currentSpotlightMember.name} 
                      onError={(e) => e.target.src="https://via.placeholder.com/200"}
                    />
                  </div>

                  <h2 className="spotlight-name">{currentSpotlightMember.name}</h2>
                  <p className="spotlight-role">{currentSpotlightMember.role}</p>

                  <div className="spotlight-reveal">
                    {currentSpotlightMember.branch && (
                      <div className="spotlight-branch">{currentSpotlightMember.branch}</div>
                    )}

                    {currentSpotlightMember.linkedin && (
                      <a 
                        href={currentSpotlightMember.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="spotlight-social"
                        title="Connect on LinkedIn"
                      >
                        <LinkedInIcon />
                      </a>
                    )}

                    <p className="spotlight-desc">
                      {currentSpotlightMember.description || "Building the future with Protege."}
                    </p>
                  </div>

                </motion.div>
              ) : (
                <div className="profile-spotlight">
                   <h2 className="spotlight-name">{teamSections.find(s=>s.id===activeTab)?.title}</h2>
                </div>
              )}
            </AnimatePresence>

            {leftSidebarMembers.length > 1 && (
              <div className="carousel-dots">
                {leftSidebarMembers.map((_, idx) => (
                  <button
                    key={idx}
                    className={`dot ${idx === spotlightIndex ? 'active' : ''}`}
                    onClick={() => setSpotlightIndex(idx)}
                  />
                ))}
              </div>
            )}
          </motion.div>

        </div>

        {/* --- RIGHT PANEL --- */}
        <div className="right-panel">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            // CHANGED: Reduced delay from 1.5 to 0.2 for faster load
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="right-header">
              <h1 className="section-title">Meet the <span className="highlight">Team</span></h1>
              
              <div className="nav-tabs">
                {teamSections.map((section) => (
                  <button 
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`tab-item ${activeTab === section.id ? 'active' : ''}`}
                  >
                    {section.title.replace(" Team", "")}
                    {activeTab === section.id && <motion.div layoutId="underline" className="active-line" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid-area">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }} 
                >
                  {activeTab === 'core' && (
                     <div className="members-grid">
                        {rightContentMembers.map((member, idx) => (
                          <TeamCard key={idx} member={member} />
                        ))}
                     </div>
                  )}

                  {activeTab !== 'core' && (
                    <div className="department-layout">
                      {renderGroup(rightContentMembers, 'associate', 'Associates')}
                      {renderGroup(rightContentMembers, 'head coordinator', 'Head Coordinators')}
                      {renderGroup(rightContentMembers, 'coordinator', 'Coordinators')}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </div>
    </>
  );
};

const renderGroup = (members, roleKeyword, title) => {
  const group = members.filter(m => {
    const r = m.role.toLowerCase();
    if (roleKeyword === 'coordinator') {
      return r.includes('coordinator') && !r.includes('head');
    }
    return r.includes(roleKeyword);
  });

  if (group.length === 0) return null;

  return (
    <div className="group-section">
      <h3 className="group-title">{title}</h3>
      <div className="members-grid">
        {group.map((member, idx) => (
          <TeamCard key={idx} member={member} />
        ))}
      </div>
    </div>
  );
};

const TeamCard = ({ member }) => (
  <motion.div className="team-card" whileHover={{ y: -5 }}>
    <div className="card-img-circle">
      <img src={member.image} alt={member.name} onError={(e) => e.target.src="https://via.placeholder.com/150"}/>
    </div>
    <div className="card-info">
      <h4>{member.name}</h4>
      <p>{member.role}</p>
    </div>
  </motion.div>
);

export default Team;