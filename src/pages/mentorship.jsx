import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Users, Clock, Target, Quote, Linkedin, Sparkles, Phone, Mail } from 'lucide-react';
import SplashScreen from "../components/SplashScreenNew";
import FindMyMentorForm from "../components/findMyMentorForm";
import Header from '../components/Header';

const MentorshipLanding = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [stats, setStats] = useState({ mentorships: 0, hours: 0, domains: 0 });
  const [titleText, setTitleText] = useState('XSEED');
  const [isHovering, setIsHovering] = useState(false);
  const [currentHWW, setCurrentHWW] = useState('how');
  const [testimonialOffset, setTestimonialOffset] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sectionVisibility, setSectionVisibility] = useState({
    hww: false,
    story: false,
    cta: false,
    contact: false
  });
const [showSplash, setShowSplash] = useState(false);
const [showForm, setShowForm] = useState(false);
const handleFindMyMentor = () => {
  setShowSplash(true);
};

const handleSplashComplete = () => {
  setShowSplash(false);
  setShowForm(true);
};

  // Updated testimonials - relevant to college mentorship program
  const testimonials = [
    { text: "The seniors at Protégé helped me crack my first coding round! Their guidance on DSA made all the difference." },
    { text: "From struggling with arrays to solving medium-level problems confidently. Thank you Protégé!" },
    { text: "Amazing seniors who genuinely care. Weekly sessions helped me stay consistent with DSA practice." },
    { text: "Best college mentorship program! My mentor helped me understand concepts I struggled with for months." },
    { text: "Protégé connected me with a senior who had similar interests. The mentorship was personalized and effective." },
    { text: "Thanks to my mentor at Protégé, I finally understood dynamic programming. Forever grateful!" },
    { text: "The structured approach and constant support from seniors made DSA journey so much easier." },
    { text: "Protégé is more than a program - it's a community of supportive seniors helping juniors succeed." }
  ];

  // Intersection Observer for scroll animations - FASTER
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          setSectionVisibility(prev => ({ ...prev, [sectionId]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  // Mouse position tracking for parallax effect - THROTTLED
  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({
            x: (e.clientX / window.innerWidth - 0.5) * 10,
            y: (e.clientY / window.innerHeight - 0.5) * 10
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll progress - THROTTLED
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = (window.scrollY / totalHeight) * 100;
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stats counter animation
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      setStats({
        mentorships: Math.floor((current / steps) * 247),
        hours: Math.floor((current / steps) * 1842),
        domains: Math.floor((current / steps) * 12)
      });
      if (current >= steps) clearInterval(timer);
    }, increment);

    return () => clearInterval(timer);
  }, []);

  // Optimized testimonial scroll
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setTestimonialOffset(prev => prev + 2);
    }, 50);

    return () => clearInterval(scrollInterval);
  }, []);

  // Typewriter scramble effect
  useEffect(() => {
    const originalText = 'XSEED';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    let iteration = 0;
    
    const interval = setInterval(() => {
      setTitleText(
        originalText
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );
      
      if (iteration >= originalText.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Hover scramble effect
  const handleTitleHover = () => {
    if (window.innerWidth <= 768) return; 
    if (isHovering) return;
    
    setIsHovering(true);
    const originalText = 'XSEED';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    let iteration = 0;
    
    const interval = setInterval(() => {
      setTitleText(
        originalText
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );
      
      if (iteration >= originalText.length) {
        clearInterval(interval);
        setIsHovering(false);
      }
      
      iteration += 1 / 3;
    }, 50);
  };

  
  return (
    <div className="landing-container">
      <Header />
      {/* Scroll Progress */}
      <div className="scroll-progress">
        <svg className="progress-ring" width="60" height="60">
          <circle
            className="progress-ring-circle"
            stroke="#20B2AA"
            strokeWidth="3"
            fill="transparent"
            r="26"
            cx="30"
            cy="30"
            style={{
              strokeDasharray: `${2 * Math.PI * 26}`,
              strokeDashoffset: `${2 * Math.PI * 26 * (1 - scrollProgress / 100)}`
            }}
          />
        </svg>
        <span className="progress-text">{Math.round(scrollProgress)}%</span>
      </div>

      {/* Hero Section - EXACT ORIGINAL */}
      <section className="hero-section">
        <video 
          className="hero-background-video" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="hero-content" style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
        }}>
          <h1 
            className="hero-title" 
            onMouseEnter={handleTitleHover}
            data-text={titleText}
          >
            {titleText}
          </h1>
          <p className="hero-subtitle">Your Journey Begins With A Connection</p>
          <button className="btn--mentor" onClick={handleFindMyMentor}>
            Find Your Mentor
            <span>→</span>
          </button>
          
          {/* Stats below button */}
          <div className="hero-stats-below">
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <Users size={40} />
              </div>
              <h3>{stats.mentorships}+</h3>
              <p>Successful Mentorships</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <Clock size={40} />
              </div>
              <h3>{stats.hours}+</h3>
              <p>Hours of Guidance</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <Target size={40} />
              </div>
              <h3>{stats.domains}+</h3>
              <p>Domains Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section 
        className={`hww-section ${sectionVisibility.hww ? 'visible' : ''}`}
        data-section="hww"
      >
        <h2 className="section-title-hww">HOW IT WORKS</h2>
        
        <div className="hww-container">
          <div 
            className={`hww-item ${currentHWW === 'how' ? 'active' : ''}`}
            onMouseEnter={() => setCurrentHWW('how')}
          >
            <Target size={80} />
            <h3>HOW</h3>
          </div>

          <div 
            className={`hww-item ${currentHWW === 'what' ? 'active' : ''}`}
            onMouseEnter={() => setCurrentHWW('what')}
          >
            <Users size={80} />
            <h3>WHAT</h3>
          </div>

          <div 
            className={`hww-item ${currentHWW === 'when' ? 'active' : ''}`}
            onMouseEnter={() => setCurrentHWW('when')}
          >
            <Clock size={80} />
            <h3>WHEN</h3>
          </div>
        </div>

        <div className="hww-content-box">
          {currentHWW === 'how' && (
            <div className="hww-content">
              <h4>Smart Matching Algorithm</h4>
              <p>
                Our intelligent system pairs you with mentors based on your DSA level, 
                preferred programming language, goals, and learning style for personalized guidance.
              </p>
            </div>
          )}

          {currentHWW === 'what' && (
            <div className="hww-content">
              <h4>Comprehensive Guidance</h4>
              <p>
                Get help with DSA fundamentals, problem-solving strategies, code reviews, 
                interview preparation, and personalized learning paths tailored to your pace.
              </p>
            </div>
          )}

          {currentHWW === 'when' && (
            <div className="hww-content">
              <h4>Flexible Schedule</h4>
              <p>
                Connect with your mentor at times that work for both of you. Weekly sessions, 
                ad-hoc doubt solving, and ongoing support whenever you need it.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Our Story - Video + Testimonials Section */}
      <section 
        className={`story-section ${sectionVisibility.story ? 'visible' : ''}`}
        data-section="story"
      >
        <h2 className="section-title-story">OUR STORY</h2>
        <div className="story-container">
          {/* Left: Full Video Background */}
          <div className="story-video-side">
            <video 
              className="story-video-full" 
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="/story-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-overlay"></div>
          </div>

          {/* Right: Continuous Scrolling Testimonials */}
          <div className="story-testimonials-side">
            <div className="testimonials-scroll-wrapper">
              <div 
                className="testimonials-continuous-track"
                style={{
                  transform: `translateY(-${testimonialOffset % (testimonials.length * 200)}px)`
                }}
              >
                {/* Duplicate testimonials for seamless loop */}
                {[...testimonials, ...testimonials].map((testimonial, idx) => (
                  <div key={idx} className="testimonial-card-slide">
                    <Quote className="quote-icon-compact" size={30} />
                    <p className="testimonial-text-compact">{testimonial.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className={`cta-section ${sectionVisibility.cta ? 'visible' : ''}`}
        data-section="cta"
      >
        <div className="cta-content">
          <h2>Ready to Find Your Guide?</h2>
          <p>Join hundreds of students who've transformed their journey</p>
          <button className="cta-button-large" onClick={handleFindMyMentor}>
            Start Your Journey <ArrowRight size={24} />
          </button>
        </div>
        <div className="cta-decoration"></div>
      </section>

      {/* Contact Section - MOVED AFTER CTA */}
      <section 
        className={`contact-section ${sectionVisibility.contact ? 'visible' : ''}`}
        data-section="contact"
      >
        <div className="contact-decoration"></div>
        <div className="contact-content">
          <h2 className="contact-title">Facing Difficulties?</h2>
          <p className="contact-subtitle">
            Having issues with mentee-mentor mapping on the platform? Our team is here to help!
          </p>
          
          <div className="contact-cards-grid">
            <div className="contact-card">
              <div className="contact-left">
                <div className="contact-avatar">
                  <Phone size={32} />
                </div>
                <h3 className="contact-name">Gauri<br/>Aggarwal</h3>
              </div>
              <a href="tel:7428840698" className="contact-phone">
                <Phone size={18} />
                <span>7428840698</span>
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-left">
                <div className="contact-avatar">
                  <Phone size={32} />
                </div>
                <h3 className="contact-name">Disha<br/>Malhotra</h3>
              </div>
              <a href="tel:9999999999" className="contact-phone">
                <Phone size={18} />
                <span>9999999999</span>
              </a>
            </div>
          </div>

          <p className="contact-footer">
            Feel free to reach out for any queries regarding the platform or mentorship mapping
          </p>
        </div>
      </section>

{showSplash && (
      <SplashScreen onComplete={handleSplashComplete} />
    )}

    {showForm && (
      <FindMyMentorForm onClose={() => setShowForm(false)} />
    )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #000;
          color: #fff;
          overflow-x: hidden;
        }

        .landing-container {
          width: 100%;
          position: relative;
        }

        /* Scroll Progress Indicator - EXACT ORIGINAL */
        .scroll-progress {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 60px;
          height: 60px;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .progress-ring {
          transform: rotate(-90deg);
          position: absolute;
        }

        .progress-ring-circle {
          transition: stroke-dashoffset 0.3s ease;
          filter: drop-shadow(0 0 8px rgba(32, 178, 170, 0.6));
        }

        .progress-text {
          position: relative;
          font-weight: 700;
          font-size: 14px;
          color: #20B2AA;
          z-index: 1;
        }

        /* HERO SECTION - EXACT ORIGINAL CSS */
        .hero-section {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #000;
        }

        .hero-background-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.7;
          z-index: 0;
        }

        .hero-content {
          text-align: center;
          z-index: 10;
          animation: fadeInUp 1s ease;
          transition: transform 0.2s ease-out;
          will-change: transform;
        }

        .hero-stats-below {
          display: flex;
          gap: 3rem;
          margin-top: 4rem;
          justify-content: center;
        }

        .stat-card {
          background: rgba(32, 178, 170, 0.03);
          border: 1px solid rgba(32, 178, 170, 0.15);
          padding: 2rem;
          border-radius: 20px;
          min-width: 200px;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(32, 178, 170, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .stat-card:hover::before {
          opacity: 1;
        }

        .stat-card:hover {
          transform: translateY(-15px);
          background: rgba(32, 178, 170, 0.08);
          border-color: rgba(32, 178, 170, 0.4);
          box-shadow: 0 20px 40px rgba(32, 178, 170, 0.2);
        }

        .stat-icon-wrapper {
          display: inline-block;
          padding: 1rem;
          background: rgba(32, 178, 170, 0.1);
          border-radius: 50%;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .stat-card:hover .stat-icon-wrapper {
          background: rgba(32, 178, 170, 0.2);
          transform: rotateY(360deg);
        }

        .stat-card svg {
          color: #20B2AA;
        }

        .stat-card h3 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #20B2AA;
          margin: 0.5rem 0;
        }

        .stat-card p {
          color: #999;
          font-size: 0.95rem;
          margin: 0;
        }

        .hero-title {
          font-size: 8rem;
          font-weight: 900;
          letter-spacing: 0.05em;
          background: linear-gradient(135deg, #20B2AA 0%, #f2f1f4ff 50%, #20B2AA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          cursor: pointer;
          position: relative;
          font-family: 'Courier New', monospace;
          filter: drop-shadow(1px 1px 0px rgba(0, 0, 0, 0.4));
          transition: all 0.3s ease;
        }

        .hero-title::before {
          content: attr(data-text);
          position: absolute;
          left: 1px;
          top: 1px;
          background: linear-gradient(135deg, #20B2AA 0%, #f2f1f4ff 50%, #20B2AA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0.1;
          z-index: -1;
        }

        .hero-title::after {
          content: attr(data-text);
          position: absolute;
          left: -1px;
          top: -1px;
          background: linear-gradient(135deg, #20B2AA 0%, #f2f1f4ff 50%, #20B2AA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0.1;
          z-index: -1;
        }

        .hero-title:hover {
          transform: scale(1.05);
          filter: drop-shadow(1px 1px 1px rgba(32, 178, 170, 0.5));
        }

        .hero-subtitle {
          font-size: clamp(1.1rem, 2.5vw, 1.5rem);
          font-weight: 400;
          letter-spacing: 3px;
          margin-bottom: 60px;
          color: #cbd5e1;
          font-style: normal;
          text-transform: capitalize;
          line-height: 1.8;
          font-family: 'Georgia', serif;
        }

        .btn--mentor {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 16px 48px;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: capitalize;
          border: 2px solid #20b2aa;
          background: transparent;
          color: #20b2aa;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 50px;
          font-family: 'Georgia', serif;
          font-weight: 600;
        }

        .btn--mentor::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(32, 178, 170, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }

        .btn--mentor:hover::before {
          width: 300px;
          height: 300px;
        }

        .btn--mentor:hover {
          background: rgba(32, 178, 170, 0.1);
          color: #20b2aa;
          box-shadow: 0 8px 20px rgba(32, 178, 170, 0.15);
          transform: translateY(-2px);
        }

        .btn--mentor span {
          transition: transform 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .btn--mentor:hover span {
          transform: translateX(4px);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* How We Work Section */
        .hww-section {
          padding: 4rem 2rem;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(32, 178, 170, 0.03) 25%,
            rgba(211, 225, 10, 0.02) 50%,
            rgba(32, 178, 170, 0.03) 75%,
            rgba(0, 0, 0, 1) 100%
          );
          position: relative;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.4s ease;
          overflow: hidden;
        }

        .hww-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(32, 178, 170, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(211, 225, 10, 0.06) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .hww-section > * {
          position: relative;
          z-index: 1;
        }

        .hww-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section-title-hww {
          text-align: center;
          font-size: 3rem;
          font-weight: 700;
          color: #20B2AA;
          margin-bottom: 3rem;
          letter-spacing: 4px;
        }

        .hww-container {
          display: flex;
          justify-content: center;
          gap: 4rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .hww-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 2rem;
          border-radius: 20px;
        }

        .hww-item h3 {
          font-size: 2rem;
          color: #666;
          transition: all 0.3s ease;
        }

        .hww-item svg {
          color: #333;
          transition: all 0.3s ease;
        }

        .hww-item.active {
          background: rgba(32, 178, 170, 0.1);
        }

        .hww-item.active h3 {
          color: #20B2AA;
        }

        .hww-item.active svg {
          color: #20B2AA;
          transform: scale(1.1);
        }

        .hww-content-box {
          max-width: 800px;
          margin: 0 auto;
          padding: 3rem;
          background: linear-gradient(
            135deg,
            rgba(32, 178, 170, 0.04) 0%,
            rgba(255, 255, 255, 0.02) 50%,
            rgba(32, 178, 170, 0.04) 100%
          );
          border: 1px solid rgba(32, 178, 170, 0.25);
          border-radius: 24px;
          min-height: 200px;
          backdrop-filter: blur(10px);
          box-shadow: 
            0 8px 32px rgba(32, 178, 170, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .hww-content h4 {
          font-size: 1.8rem;
          color: #20B2AA;
          margin-bottom: 1rem;
        }

        .hww-content p {
          font-size: 1.1rem;
          color: #ccc;
          line-height: 1.8;
        }

        /* Our Story Section */
        .story-section {
          padding: 4rem 2rem;
          background: #000;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.4s ease;
        }

        .story-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section-title-story {
          text-align: center;
          font-size: 3rem;
          font-weight: 700;
          color: #20B2AA;
          margin-bottom: 3rem;
          letter-spacing: 4px;
        }

        .story-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 600px;
          max-width: 1400px;
          margin: 0 auto;
          border-radius: 24px;
          overflow: hidden;
          border: 2px solid rgba(32, 178, 170, 0.2);
        }

        .story-video-side {
          position: relative;
          overflow: hidden;
        }

        .story-video-full {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .video-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
        }

        .story-testimonials-side {
          background: rgba(10, 10, 10, 0.9);
          padding: 2rem;
          overflow: hidden;
          position: relative;
        }

        .testimonials-scroll-wrapper {
          height: 100%;
          overflow: hidden;
          position: relative;
        }

        .testimonials-continuous-track {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          transition: transform 0.05s linear;
        }

        .testimonial-card-slide {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(32, 178, 170, 0.2);
          border-radius: 16px;
          padding: 1.5rem;
          min-height: 180px;
          display: flex;
          flex-direction: column;
          position: relative;
          backdrop-filter: blur(10px);
        }

        .quote-icon-compact {
          position: absolute;
          top: 15px;
          right: 15px;
          color: rgba(32, 178, 170, 0.2);
        }

        .testimonial-text-compact {
          color: #ddd;
          font-size: 1rem;
          line-height: 1.7;
          flex-grow: 1;
          margin-top: 2rem;
        }

        /* CTA Section */
        .cta-section {
          padding: 6rem 2rem;
          text-align: center;
          background: linear-gradient(135deg, #000 0%, #0a0a0a 50%, #000 100%);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.4s ease;
        }

        .cta-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cta-decoration {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 30% 50%, rgba(32, 178, 170, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 70% 50%, rgba(32, 178, 170, 0.08) 0%, transparent 40%);
          pointer-events: none;
        }

        .cta-content {
          position: relative;
          z-index: 1;
        }

        .cta-section h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #20B2AA;
          font-weight: 700;
        }

        .cta-section p {
          font-size: 1.2rem;
          color: #999;
          margin-bottom: 2rem;
        }

        .cta-button-large {
          background: #20B2AA;
          color: #000;
          border: none;
          padding: 1.3rem 2.8rem;
          font-size: 1.2rem;
          font-weight: 700;
          border-radius: 50px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .cta-button-large:hover {
          background: #1a9b94;
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(32, 178, 170, 0.4);
        }

        /* Contact Section - FIXED STRUCTURE */
        .contact-section {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #000 0%, #0a0a0a 50%, #000 100%);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.4s ease;
        }

        .contact-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .contact-decoration {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 40% 60%, rgba(32, 178, 170, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 60% 40%, rgba(32, 178, 170, 0.08) 0%, transparent 40%);
          pointer-events: none;
        }

        .contact-content {
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .contact-title {
          font-size: 2.5rem;
          color: #20B2AA;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .contact-subtitle {
          font-size: 1.15rem;
          color: #999;
          margin-bottom: 3.5rem;
          line-height: 1.6;
        }

        .contact-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.5rem;
          margin-bottom: 2.5rem;
        }

        .contact-card {
          background: rgba(255, 255, 255, 0.02);
          border: 2px solid rgba(32, 178, 170, 0.25);
          border-radius: 20px;
          padding: 2rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .contact-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(32, 178, 170, 0.08) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .contact-card:hover::before {
          opacity: 1;
        }

        .contact-card:hover {
          transform: translateY(-5px);
          border-color: rgba(32, 178, 170, 0.5);
          box-shadow: 0 12px 35px rgba(32, 178, 170, 0.15);
        }

        .contact-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .contact-avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, #20B2AA, #1a9b94);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 6px 20px rgba(32, 178, 170, 0.3);
          transition: transform 0.6s ease;
        }

        .contact-card:hover .contact-avatar {
          transform: rotate(360deg);
        }

        .contact-avatar svg {
          color: #000;
        }

        .contact-name {
          font-size: 1.4rem;
          color: #fff;
          font-weight: 600;
          text-align: left;
        }

        .contact-phone {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 1.1rem;
          color: #20B2AA;
          text-decoration: none;
          font-weight: 600;
          padding: 0.85rem 1.75rem;
          background: rgba(32, 178, 170, 0.12);
          border-radius: 50px;
          transition: all 0.3s ease;
          border: 1px solid rgba(32, 178, 170, 0.3);
          flex-shrink: 0;
        }

        .contact-phone:hover {
          background: rgba(32, 178, 170, 0.2);
          border-color: rgba(32, 178, 170, 0.5);
          transform: scale(1.03);
        }

        .contact-footer {
          font-size: 0.95rem;
          color: #666;
          font-style: italic;
          line-height: 1.6;
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .hero-title {
            font-size: 6rem;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: 100vh;
            height: auto;
            padding: 2rem 1rem;
          }

          .hero-content {
            padding: 2rem 0;
          }

          .hero-title {
            font-size: 4rem;
            line-height: 1.1;
            margin-bottom: 1.5rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
            margin-bottom: 2rem;
          }

          .btn--mentor {
            padding: 1rem 2.5rem;
            font-size: 1rem;
          }

          .hero-stats-below {
            flex-direction: column;
            gap: 1.5rem;
            align-items: center;
            margin-top: 2.5rem;
          }

          .stat-card {
            width: 100%;
            max-width: 300px;
            padding: 1.5rem;
          }

          .stat-card h3 {
            font-size: 2rem;
          }

          .stat-card svg {
            width: 32px;
            height: 32px;
          }

          .hww-container {
            flex-direction: column;
            gap: 2rem;
          }

          .hww-item {
            font-size: 2.5rem;
          }

          .hww-content-box {
            padding: 2rem;
          }

          .story-container {
            grid-template-columns: 1fr;
            height: auto;
          }

          .story-video-side {
            height: 300px;
          }

          .story-testimonials-side {
            height: 400px;
          }

          .section-title-story,
          .section-title-hww,
          .contact-title {
            font-size: 2rem;
          }

          .cta-section h2 {
            font-size: 2rem;
          }

          .contact-cards-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .contact-card {
            flex-direction: column;
            text-align: center;
            padding: 2rem 1.5rem;
          }

          .contact-left {
            flex-direction: column;
            text-align: center;
          }

          .contact-name {
            text-align: center;
          }

          .contact-phone {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            min-height: 100vh;
            padding: 1.5rem 1rem;
          }

          .hero-content {
            padding: 5rem 0;
          }

           .hero-title {
    font-size: 6rem !important;
    font-weight: 900;
    letter-spacing: 0.04em;
    transform: none !important;
    filter: none !important;
  }

  .hero-title::before,
  .hero-title::after {
    display: none; /* remove shadow layers on mobile */
  }
          .hero-subtitle {
            font-size: 1rem;
            margin-bottom: 1.5rem;
            padding: 0 1rem;
          }

          .btn--mentor {
            padding: 0.9rem 2rem;
            font-size: 0.95rem;
          }

          .hero-stats-below {
            margin-top: 2rem;
            gap: 1.25rem;
          }

           .stat-card {
    padding: 1.25rem;
    border-radius: 16px;
  }

  .stat-card h3 {
    font-size: 1.8rem;
  }

  .stat-card p {
    font-size: 0.85rem;
  }

  .stat-icon-wrapper {
    padding: 0.6rem;
  }

  .stat-card svg {
    width: 26px;
    height: 26px;
  }

          @media (max-width: 768px) {

  .hww-item {
    padding: 1.5rem;
  }

  .hww-item h3 {
    font-size: 1.4rem;
  }

  .hww-item svg {
    width: 48px;
    height: 48px;
  }

  .hww-content-box {
    padding: 1.5rem;
    min-height: unset;
  }

  .hww-content h4 {
    font-size: 1.4rem;
  }

  .hww-content p {
    font-size: 0.95rem;
    line-height: 1.6;
  }
}


          .contact-card {
            padding: 2rem 1.5rem;
          }

          .cta-button-large {
            padding: 1.1rem 2rem;
            font-size: 1rem;
          }
        }
      `}</style>

    </div>
  );
};

export default MentorshipLanding;