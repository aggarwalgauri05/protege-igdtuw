import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import { teamSections } from '../data/teamData';
import './Team.css';

const Team = () => {
  const [activeTab, setActiveTab] = useState('core');

  // Helper to find data
  const coreSection = teamSections.find(s => s.id === 'core');
  const currentSection = teamSections.find(s => s.id === activeTab);

  // --- FILTERING LOGIC ---
  let leftSidebarMembers = [];
  let rightContentMembers = [];

  if (activeTab === 'core') {
    // CORE: Left = President & VP | Right = All Leads
    leftSidebarMembers = coreSection?.members.filter(m => 
      m.role.toLowerCase().includes('president')
    ) || [];
    
    rightContentMembers = coreSection?.members.filter(m => 
      !m.role.toLowerCase().includes('president')
    ) || [];

  } else {
    // DEPARTMENTS: Left = Specific Lead | Right = Everyone else (EXCLUDING Leads)
    
    // 1. Identify the Lead for this section (usually found in Core or the section itself)
    const leadKeywords = {
      tech: 'tech lead',
      management: 'management lead',
      research: 'research lead',
      media: 'media' 
    };
    const keyword = leadKeywords[activeTab];

    // Try finding lead in Core first (as per your data structure)
    const coreLeads = coreSection?.members.filter(m => 
      m.role.toLowerCase().includes(keyword)
    ) || [];

    // If not in core, check current section
    const sectionLeads = currentSection?.members.filter(m => 
        m.role.toLowerCase().includes('lead')
    ) || [];

    leftSidebarMembers = [...coreLeads, ...sectionLeads];
    // Remove duplicates if any
    leftSidebarMembers = [...new Set(leftSidebarMembers)];

    // 2. Get Right Members (Exclude anyone who is a Lead)
    const rawMembers = currentSection?.members || [];
    const nonLeads = rawMembers.filter(m => !m.role.toLowerCase().includes('lead'));

    // 3. Sort Priority: Associate -> Head Coord -> Coord
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

  return (
    <>
      <Header />
      
      <div className="team-container">
        
        {/* --- LEFT STATIC SIDEBAR (TEAL) --- */}
        <div className="left-panel">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              className="left-content-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              {leftSidebarMembers.length > 0 ? (
                leftSidebarMembers.map((member, idx) => (
                  <div key={idx} className="profile-spotlight">
                    <div className="spotlight-img">
                      <img src={member.image} alt={member.name} onError={(e) => e.target.src="https://via.placeholder.com/200"}/>
                    </div>
                    <h2 className="spotlight-name">{member.name}</h2>
                    <p className="spotlight-role">{member.role}</p>
                  </div>
                ))
              ) : (
                // Fallback for empty left side
                <div className="profile-spotlight">
                   <h2 className="spotlight-name">{teamSections.find(s=>s.id===activeTab)?.title}</h2>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- RIGHT SCROLLABLE CONTENT (BLACK) --- */}
        <div className="right-panel">
          
          <div className="right-header">
            <h1 className="section-title">Meet the <span className="highlight">Team</span></h1>
            
            {/* NAVIGATION TABS */}
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
                {/* CORE TEAM GRID */}
                {activeTab === 'core' && (
                   <div className="members-grid">
                      {rightContentMembers.map((member, idx) => (
                        <TeamCard key={idx} member={member} />
                      ))}
                   </div>
                )}

                {/* DEPARTMENT GRID (Grouped) */}
                {activeTab !== 'core' && (
                  <div className="department-layout">
                    {/* Associates */}
                    {renderGroup(rightContentMembers, 'associate', 'Associates')}
                    {/* Head Coordinators */}
                    {renderGroup(rightContentMembers, 'head coordinator', 'Head Coordinators')}
                    {/* Coordinators */}
                    {renderGroup(rightContentMembers, 'coordinator', 'Coordinators')}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </>
  );
};

// Helper to render groups (prevents duplicate code)
const renderGroup = (members, roleKeyword, title) => {
  // Filter Logic: 
  // If "coordinator", we must exclude "head coordinator" specifically
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