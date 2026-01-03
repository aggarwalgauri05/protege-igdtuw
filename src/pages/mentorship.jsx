import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Users, Clock, Target, Quote, Linkedin, Sparkles } from 'lucide-react';
import SplashScreen from "../components/SplashScreenNew";
import FindMyMentorForm from "../components/findMyMentorForm";
import Header from '../components/Header';

const MentorshipLanding = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [stats, setStats] = useState({ mentorships: 0, hours: 0, domains: 0 });
  const mentorScrollRef = useRef(null);
  const [titleText, setTitleText] = useState('XSEED');
  const [isHovering, setIsHovering] = useState(false);
  const [currentHWW, setCurrentHWW] = useState('how');
  const [testimonialOffset, setTestimonialOffset] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sectionVisibility, setSectionVisibility] = useState({
    hww: false,
    team: false,
    story: false,
    cta: false
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

  // Sample data
  const mentors = [
    { 
      name: "Arjun Sharma", 
      role: "Full Stack Developer", 
      company: "SDE-2 @ Google",
      img: "https://i.pravatar.cc/300?img=12",
      linkedin: "https://linkedin.com/in/arjunsharma"
    },
    { 
      name: "Priya Singh", 
      role: "ML Engineer", 
      company: "ML Lead @ Microsoft",
      img: "https://i.pravatar.cc/300?img=45",
      linkedin: "https://linkedin.com/in/priyasingh"
    },
    { 
      name: "Rohan Gupta", 
      role: "UI/UX Designer", 
      company: "Design @ Figma",
      img: "https://i.pravatar.cc/300?img=33",
      linkedin: "https://linkedin.com/in/rohangupta"
    },
    { 
      name: "Ananya Das", 
      role: "DevOps Lead", 
      company: "DevOps @ AWS",
      img: "https://i.pravatar.cc/300?img=47",
      linkedin: "https://linkedin.com/in/ananyadas"
    },
    { 
      name: "Karan Mehta", 
      role: "Data Scientist", 
      company: "DS @ Netflix",
      img: "https://i.pravatar.cc/300?img=56",
      linkedin: "https://linkedin.com/in/karanmehta"
    },
    { 
      name: "Sneha Reddy", 
      role: "Product Manager", 
      company: "PM @ Meta",
      img: "https://i.pravatar.cc/300?img=38",
      linkedin: "https://linkedin.com/in/snehareddy"
    }
  ];

  const testimonials = [
    { name: "Rahul K.", text: "Found my mentor in 2 days. The guidance I received helped me land my first job at a top tech company!", batch: "2023", role: "Software Engineer" },
    { name: "Isha M.", text: "From confused fresher to confident developer. My mentor helped me master full-stack development in 6 months.", batch: "2024", role: "Full Stack Dev" },
    { name: "Vikram S.", text: "My mentor helped me land my dream internship at Google. The personalized approach made all the difference!", batch: "2023", role: "SDE Intern" },
    { name: "Nisha P.", text: "Learning has never been this personalized. Weekly sessions with my mentor transformed my coding skills.", batch: "2024", role: "ML Engineer" },
    { name: "Aditya R.", text: "More than a mentor, found a lifelong guide. The industry insights I gained were invaluable.", batch: "2022", role: "DevOps Lead" },
    { name: "Priya T.", text: "The best investment in my career. My mentor's real-world experience helped me navigate complex projects.", batch: "2023", role: "Backend Dev" },
    { name: "Arjun M.", text: "Went from zero to deployment in 3 months. The structured guidance was exactly what I needed.", batch: "2024", role: "Frontend Dev" },
    { name: "Sneha K.", text: "My mentor didn't just teach me code, they taught me how to think like an engineer.", batch: "2023", role: "Software Dev" }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px',
      threshold: 0.2
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

  // Mouse position tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
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

  // Continuous testimonial scroll
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setTestimonialOffset(prev => prev + 4);
    }, 25);

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

  // Particle effect
  const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];
      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#20B2AA';
        ctx.strokeStyle = '#20B2AA33';

        particles.forEach((p, i) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          particles.forEach((p2, j) => {
            if (i !== j) {
              const dx = p.x - p2.x;
              const dy = p.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.globalAlpha = 1 - dist / 120;
                ctx.stroke();
                ctx.globalAlpha = 1;
              }
            }
          });
        });

        requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <canvas ref={canvasRef} className="particle-canvas" />;
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

      {/* Hero Section */}
      <section className="hero-section">
        <ParticleBackground />

        <div className="hero-content" style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}>
          <div className="sparkle-container">
            <Sparkles className="sparkle-icon sparkle-1" size={24} />
            <Sparkles className="sparkle-icon sparkle-2" size={18} />
            <Sparkles className="sparkle-icon sparkle-3" size={20} />
          </div>
          
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
     
      {/* How Why What Section - Interactive */}
      <section 
        className={`interactive-hww-section ${sectionVisibility.hww ? 'visible' : ''}`}
        data-section="hww"
      >
        <div className="hww-container">
          <div className="hww-left">
            <div 
              className={`hww-item ${currentHWW === 'how' ? 'active' : ''}`}
              onMouseEnter={() => setCurrentHWW('how')}
            >
              HOW
            </div>
            <div 
              className={`hww-item ${currentHWW === 'why' ? 'active' : ''}`}
              onMouseEnter={() => setCurrentHWW('why')}
            >
              WHY
            </div>
            <div 
              className={`hww-item ${currentHWW === 'what' ? 'active' : ''}`}
              onMouseEnter={() => setCurrentHWW('what')}
            >
              WHAT
            </div>
          </div>
          <div className="hww-right">
            <div className="hww-content-box">
              {currentHWW === 'how' && (
                <p>Apply with your goals, get matched with your ideal mentor, connect through our platform, and grow together. Track progress, schedule sessions, and unlock your potential step by step.</p>
              )}
              {currentHWW === 'why' && (
                <p>Every great journey needs a guide. We believe personalized mentorship is the bridge between where you are and where you want to be. One-on-one connections create transformative learning experiences.</p>
              )}
              {currentHWW === 'what' && (
                <p>We match you with experienced mentors who've walked your path. Through our intelligent pairing system, you get guidance tailored to your goals, learning style, and aspirations in tech.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team / Mentor Showcase */}
      <section 
        className={`our-team-section ${sectionVisibility.team ? 'visible' : ''}`}
        data-section="team"
      >
        <h2 className="team-title">OUR MENTORS</h2>
        
        <div 
          className="team-scroll-container"
          ref={mentorScrollRef}
          onMouseMove={(e) => {
            const container = mentorScrollRef.current;
            if (!container) return;
            
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const containerWidth = rect.width;
            
            if (x < containerWidth * 0.15) {
              const speed = (1 - x / (containerWidth * 0.15)) * 8;
              container.scrollLeft -= speed;
            }
            else if (x > containerWidth * 0.85) {
              const speed = ((x - containerWidth * 0.85) / (containerWidth * 0.15)) * 8;
              container.scrollLeft += speed;
            }
          }}
        >
          <div className="team-cards-wrapper">
            {mentors.map((mentor, idx) => (
              <div key={idx} className="team-member-card">
                <div className={`card-outer-frame ${idx % 2 === 0 ? 'frame-white' : 'frame-teal'}`}>
                  <div className="card-photo-wrapper">
                    <img src={mentor.img} alt={mentor.name} className="member-photo-img" />
                    <div className="photo-overlay"></div>
                  </div>
                  <div className="card-bottom-info">
                    <div className="yellow-name-box">
                      <h3 className="mentor-name-text">{mentor.name}</h3>
                      <p className="mentor-role-text">{mentor.company}</p>
                    </div>
                    <a
                      href={mentor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="linkedin-inside-card"
                    >
                      <Linkedin size={22} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                  transform: `translateY(-${testimonialOffset % (testimonials.length * 280)}px)`
                }}
              >
                {/* Duplicate testimonials for seamless loop */}
                {[...testimonials, ...testimonials].map((testimonial, idx) => (
                  <div key={idx} className="testimonial-card-slide">
                    <div className="testimonial-avatar-compact">
                      {testimonial.name.charAt(0)}
                    </div>
                    <h4 className="testimonial-name-compact">{testimonial.name}</h4>
                    <p className="testimonial-role-compact">{testimonial.role}</p>
                    <p className="testimonial-batch-compact">Batch of {testimonial.batch}</p>
                    <p className="testimonial-text-compact">{testimonial.text}</p>
                    <Quote className="quote-icon-compact" size={30} />
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

        .landing-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #000;
          color: #fff;
          overflow-x: hidden;
        }

        /* Scroll Progress - Enhanced */
        .scroll-progress {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 60px;
          height: 60px;
          z-index: 1000;
        }

        .progress-ring {
          transform: rotate(-90deg);
        }

        .progress-ring-circle {
          transition: stroke-dashoffset 0.3s ease;
          filter: drop-shadow(0 0 8px rgba(32, 178, 170, 0.6));
        }

        .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-weight: 700;
          font-size: 14px;
          color: #20B2AA;
        }

        /* Hero Section - Enhanced */
        .hero-section {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: radial-gradient(circle at 50% 50%, rgba(32, 178, 170, 0.1) 0%, transparent 50%);
        }

        .particle-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.3;
        }

        .hero-content {
          text-align: center;
          z-index: 10;
          animation: fadeInUp 1s ease;
          transition: transform 0.1s ease-out;
        }

        .sparkle-container {
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 100px;
        }

        .sparkle-icon {
          position: absolute;
          color: #20B2AA;
          opacity: 0;
          animation: sparkle 3s infinite;
        }

        .sparkle-1 {
          left: 20%;
          top: 0;
          animation-delay: 0s;
        }

        .sparkle-2 {
          right: 20%;
          top: 20px;
          animation-delay: 1s;
        }

        .sparkle-3 {
          left: 50%;
          top: 40px;
          animation-delay: 2s;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
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

        /* Interactive How Why What Section - Enhanced with Scroll Animation */
        .interactive-hww-section {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #0d4d4a 0%, #20B2AA 50%, #0d4d4a 100%);
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(60px);
          transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .interactive-hww-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .interactive-hww-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 25%),
            radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 25%);
          pointer-events: none;
        }

        .hww-container {
          max-width: 1400px;
          width: 100%;
          display: flex;
          gap: 5rem;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .hww-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 500px;
        }

        .hww-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 600px;
        }

        .hww-item {
          font-size: 7rem;
          font-weight: 900;
          letter-spacing: -4px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          color: #fff;
          -webkit-text-stroke: 3px #fff;
          -webkit-text-fill-color: transparent;
          font-family: 'Arial Black', sans-serif;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2));
        }

        .hww-item.active {
          -webkit-text-fill-color: #000;
          color: #000;
          transform: translateX(15px) scale(1.05);
          text-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
          filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.4));
        }

        .hww-item:hover {
          transform: translateX(10px) scale(1.02);
        }

        .hww-content-box {
          background: #fff;
          padding: 4rem;
          border-radius: 30px;
          min-height: 350px;
          width: 100%;
          max-width: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
        }

        .hww-content-box::before {
          content: '';
          position: absolute;
          left: -25px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 25px solid transparent;
          border-bottom: 25px solid transparent;
          border-right: 25px solid #fff;
          filter: drop-shadow(-5px 0 10px rgba(0, 0, 0, 0.2));
        }

        .hww-content-box p {
          color: #000;
          font-size: 1.3rem;
          line-height: 2;
          margin: 0;
          font-weight: 400;
        }

        /* Our Team Section - Enhanced with Scroll Animation */
        .our-team-section {
          padding: 5rem 0 8rem 0;
          background: #000;
          overflow: hidden;
          position: relative;
          opacity: 0;
          transform: translateY(60px);
          transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .our-team-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .our-team-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(32, 178, 170, 0.5) 50%,
            transparent 100%
          );
        }

        .team-title {
          font-size: 1.3rem;
          font-weight: 400;
          color: #fff;
          text-align: left;
          padding-left: 4rem;
          margin-bottom: 3.5rem;
          letter-spacing: 4px;
          position: relative;
        }

        .team-title::after {
          content: '';
          position: absolute;
          top: 50%;
          left: calc(4rem + 170px);
          width: calc(100% - 4rem - 190px);
          height: 1px;
          background: rgba(255, 255, 255, 0.2);
        }

        .team-scroll-container {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 1rem 0 4rem 0;
          cursor: default;
          scroll-behavior: smooth;
        }

        .team-scroll-container::-webkit-scrollbar {
          display: none;
        }

        .team-cards-wrapper {
          display: flex;
          gap: 2.5rem;
          padding: 0 4rem;
          width: max-content;
        }

        .team-member-card {
          flex-shrink: 0;
          width: 300px;
          position: relative;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .team-member-card:hover {
          transform: translateY(-15px);
        }

        .card-outer-frame {
          width: 100%;
          padding: 20px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .frame-white {
          background: #fff !important;
        }

        .frame-teal {
          background: #20B2AA !important;
        }

        .team-member-card:hover .card-outer-frame {
          box-shadow: 0 20px 50px rgba(32, 178, 170, 0.6);
        }

        .card-photo-wrapper {
          width: 100%;
          height: 320px;
          background: #fff !important;
          border-radius: 15px;
          overflow: hidden;
          margin-bottom: 20px;
          position: relative;
        }

        .photo-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(32, 178, 170, 0.2) 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .team-member-card:hover .photo-overlay {
          opacity: 1;
        }

        .member-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: grayscale(100%) contrast(1.15);
          transition: filter 0.4s ease, transform 0.4s ease;
        }

        .team-member-card:hover .member-photo-img {
          filter: grayscale(0%) contrast(1);
          transform: scale(1.05);
        }

        .card-bottom-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 15px;
        }

        .yellow-name-box {
          background: #d3e10aff !important;
          padding: 15px 18px;
          border-radius: 12px;
          flex: 1;
          transition: all 0.3s ease;
        }

        .team-member-card:hover .yellow-name-box {
          transform: translateX(-5px);
        }

        .mentor-name-text {
          font-size: 1.2rem;
          font-weight: 700;
          color: #000 !important;
          margin: 0 0 5px 0;
          line-height: 1.2;
        }

        .mentor-role-text {
          font-size: 0.82rem;
          color: #1a1a1a !important;
          margin: 0;
          line-height: 1.3;
          font-weight: 400;
        }

        .linkedin-inside-card {
          width: 42px;
          height: 42px;
          background: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0077B5;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .linkedin-inside-card:hover {
          background: #0077B5;
          color: #fff;
          transform: translateY(-5px) rotate(360deg);
          box-shadow: 0 10px 25px rgba(0,119,181,0.6);
        }

        /* Our Story Section - Redesigned with Full Video and Scroll Animation */
        .story-section {
          background: #000;
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(60px);
          transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .story-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .story-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(32, 178, 170, 0.5) 50%,
            transparent 100%
          );
        }

        .section-title-story {
          font-size: 3rem;
          font-weight: 700;
          color: #20B2AA;
          text-align: center;
          margin-bottom: 4rem;
          letter-spacing: 3px;
          padding: 0 2rem;
          text-transform: uppercase;
        }

        .story-container {
          max-width: 100%;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 700px;
        }

        /* Video Side - Full Half */
        .story-video-side {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .story-video-full {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.5) 50%,
            rgba(0, 0, 0, 0.7) 100%
          );
          pointer-events: none;
        }

        /* Testimonials Side */
        .story-testimonials-side {
          background: linear-gradient(135deg, #0a0a0a 0%, #0d1117 100%);
          position: relative;
          overflow: hidden;
          padding: 3rem 4rem;
          display: flex;
          align-items: center;
        }

        .testimonials-scroll-wrapper {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
        }

        .testimonials-continuous-track {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          transition: transform 0.05s linear;
        }

        .testimonial-card-slide {
          background: linear-gradient(135deg, rgba(32, 178, 170, 0.08) 0%, rgba(32, 178, 170, 0.04) 100%);
          border: 1px solid rgba(32, 178, 170, 0.2);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          transition: all 0.3s ease;
          flex-shrink: 0;
          height: 260px;
          display: flex;
          flex-direction: column;
          backdrop-filter: blur(10px);
        }

        .testimonial-card-slide:hover {
          background: linear-gradient(135deg, rgba(32, 178, 170, 0.15) 0%, rgba(32, 178, 170, 0.08) 100%);
          border-color: rgba(32, 178, 170, 0.4);
          transform: translateX(10px);
          box-shadow: 0 10px 40px rgba(32, 178, 170, 0.2);
        }

        .testimonial-avatar-compact {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #20B2AA 0%, #16a89e 100%);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          box-shadow: 0 4px 15px rgba(32, 178, 170, 0.3);
        }

        .testimonial-name-compact {
          font-size: 1.2rem;
          font-weight: 700;
          color: #20B2AA;
          margin-bottom: 0.3rem;
        }

        .testimonial-role-compact {
          font-size: 0.95rem;
          color: #d3e10aff;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }

        .testimonial-batch-compact {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 1rem;
        }

        .testimonial-text-compact {
          color: rgba(255, 255, 255, 0.85);
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
          flex-grow: 1;
        }

        .quote-icon-compact {
          position: absolute;
          bottom: 15px;
          right: 15px;
          color: rgba(32, 178, 170, 0.15);
        }

        /* CTA Section - Enhanced with Scroll Animation */
        .cta-section {
          padding: 8rem 2rem;
          text-align: center;
          background: linear-gradient(135deg, #000 0%, #0a0a0a 50%, #000 100%);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(60px);
          transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
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
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #20B2AA;
          font-weight: 700;
        }

        .cta-section p {
          font-size: 1.3rem;
          color: #999;
          margin-bottom: 3rem;
        }

        .cta-button-large {
          background: #20B2AA;
          color: #000;
          border: none;
          padding: 1.5rem 3rem;
          font-size: 1.3rem;
          font-weight: 700;
          border-radius: 50px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .cta-button-large::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }

        .cta-button-large:hover::before {
          width: 400px;
          height: 400px;
        }

        .cta-button-large:hover {
          background: #1a9b94;
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(32, 178, 170, 0.6);
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

  @keyframes glitch1 {
  /* DELETE THIS ENTIRE ANIMATION */
}

@keyframes glitch2 {
  /* DELETE THIS ENTIRE ANIMATION */
}
        /* Responsive */
        @media (max-width: 768px) {
          .sparkle-container {
            display: none;
          }

          .team-title {
            padding-left: 2rem;
            font-size: 1.1rem;
            letter-spacing: 3px;
          }

          .team-title::after {
            left: calc(4rem + 160px);
            width: 240px;
            background: linear-gradient(
              to right,
              rgba(255,255,255,0.4),
              rgba(255,255,255,0.05)
            );
          }

          .team-cards-wrapper {
            padding: 0 2rem;
            gap: 2rem;
          }

          .team-member-card {
            width: 260px;
          }

          .card-outer-frame {
            padding: 16px;
          }

          .card-photo-wrapper {
            height: 280px;
            margin-bottom: 16px;
          }

          .mentor-name-text {
            font-size: 1.05rem;
          }

          .mentor-role-text {
            font-size: 0.75rem;
          }

          .hero-stats-below {
            flex-direction: column;
            gap: 1.5rem;
            margin-top: 3rem;
            align-items: center;
          }

          .stat-card {
            min-width: auto;
            width: 100%;
            max-width: 300px;
          }

          .hww-container {
            flex-direction: column;
            gap: 3rem;
          }

          .hww-item {
            font-size: 3.5rem;
            text-align: center;
          }

          .hww-content-box {
            padding: 2rem;
            min-height: 250px;
          }

          .hww-content-box::before {
            display: none;
          }

          .hww-content-box p {
            font-size: 1rem;
          }

          .hero-title {
            font-size: 3rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          /* Story Section - Mobile */
          .story-container {
            grid-template-columns: 1fr;
            height: auto;
          }

          .story-video-side {
            height: 400px;
          }

          .story-testimonials-side {
            padding: 2rem;
            height: 500px;
          }

          .section-title-story {
            font-size: 2rem;
            margin-bottom: 2rem;
          }

          .testimonial-card-slide {
            padding: 1.5rem;
            height: 240px;
          }

          .cta-section h2 {
            font-size: 2rem;
          }

          .cta-section p {
            font-size: 1.1rem;
          }

          .cta-button-large {
            padding: 1.2rem 2.5rem;
            font-size: 1.1rem;
          }
        }
      `}</style>

    </div>
  );
};

export default MentorshipLanding;