import React, { useEffect } from 'react';
import Header from '../components/Header';
import './Home.css';

import heartIcon from '../assets/3dicons-notify-heart-front-color.png';
import girlIcon from '../assets/3dicons-girl-front-color.png';
import targetIcon from '../assets/3dicons-target-front-color.png';

const Home = () => {

  // Smooth & slow count-up animation triggered when stats section is visible
  useEffect(() => {
    const animateCounter = (counter) => {
      const target = Number(counter.dataset.target);
      const hasPlus = counter.dataset.hasPlus === 'true';
      const duration = 2500;
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * target);

        if (target >= 1000) {
          counter.innerText = Math.floor(value / 1000) + 'k' + (hasPlus ? '+' : '');
        } else {
          counter.innerText = value + (hasPlus ? '+' : '');
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.number');
          counters.forEach(counter => {
            if (counter.innerText === '0') { // Only animate if not already animated
              animateCounter(counter);
            }
          });
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Empowering Women to <span className="highlight">Lead the Future</span>
          </h1>

          <p className="hero-subtitle">
            Protégé  is a mentorship-driven community nurturing confidence,
            leadership, and excellence among women in tech.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary">Join Us</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>

        <div className="hero-bg-effect"></div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat">
          <img src={heartIcon} alt="Social Reach" className="stat-icon" />
          <h2 className="number" data-target="15000" data-has-plus="true">0</h2>
          <p>Social Reach</p>
        </div>

        <div className="stat">
          <img src={girlIcon} alt="Students" className="stat-icon" />
          <h2 className="number" data-target="5000" data-has-plus="true">0</h2>
          <p>Students</p>
        </div>

        <div className="stat">
          <img src={targetIcon} alt="Competitions" className="stat-icon" />
          <h2 className="number" data-target="15" data-has-plus="true">0</h2>
          <p>Competitions</p>
        </div>
      </section>
    </>
  );
};

export default Home;
