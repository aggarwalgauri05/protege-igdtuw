import React, { useState, useEffect, useRef } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const animationRef = useRef(null);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    // Show quote immediately
    setQuoteVisible(true);

    // Progress animation using simpler interval approach
    const duration = 2000; // 2 seconds
    const intervalTime = 30; // Update every 30ms
    const steps = duration / intervalTime;
    const increment = 100 / steps;
    let currentProgress = 0;

    const progressInterval = setInterval(() => {
      currentProgress += increment;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(progressInterval);
        
        // Only call onComplete once
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 300);
        }
      } else {
        setProgress(currentProgress);
      }
    }, intervalTime);

    // Cleanup
    return () => {
      clearInterval(progressInterval);
    };
  }, []); // Empty dependency array - run only once!

  return (
    <div className="splash-screen">
      {/* Animated Background Blob */}
      <div className="blob-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Content */}
      <div className="splash-content">
        <div className={`quote-wrapper ${quoteVisible ? 'visible' : ''}`}>
          <div className="quote-mark">"</div>
          <h2 className="quote-text">
            Every expert was once a beginner
          </h2>
          <div className="quote-author">— Your journey starts here</div>
        </div>

        {/* Progress indicator - separate from quote */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-text">{Math.round(progress)}%</div>
        </div>
      </div>

      <style>{`
        .splash-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
        }

        /* Morphing Blob Background */
        .blob-container {
          position: absolute;
          width: 100%;
          height: 100%;
          filter: blur(80px);
          opacity: 0.6;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          animation: morph 8s ease-in-out infinite;
        }

        .blob-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #20B2AA 0%, transparent 70%);
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .blob-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #1a9b94 0%, transparent 70%);
          bottom: 20%;
          right: 15%;
          animation-delay: -2s;
        }

        .blob-3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, #15847e 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -4s;
        }

        @keyframes morph {
          0%, 100% {
            transform: scale(1) translate(0, 0);
            border-radius: 50% 50% 50% 50%;
          }
          25% {
            transform: scale(1.1) translate(20px, -20px);
            border-radius: 60% 40% 50% 50%;
          }
          50% {
            transform: scale(0.9) translate(-20px, 20px);
            border-radius: 50% 60% 40% 50%;
          }
          75% {
            transform: scale(1.05) translate(10px, 10px);
            border-radius: 50% 50% 60% 40%;
          }
        }

        /* Content Styling */
        .splash-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 700px;
          padding: 2rem;
        }

        .quote-wrapper {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .quote-wrapper.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .quote-mark {
          font-size: 5rem;
          color: #20B2AA;
          font-family: Georgia, serif;
          line-height: 0.5;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .quote-text {
          font-size: 2.5rem;
          font-weight: 300;
          color: #fff;
          margin: 0 0 2rem 0;
          line-height: 1.4;
          font-family: 'Georgia', serif;
          letter-spacing: -0.5px;
        }

        .quote-author {
          font-size: 1.1rem;
          color: #20B2AA;
          margin-bottom: 0;
          font-weight: 400;
          letter-spacing: 1px;
        }

        /* Progress Bar */
        .progress-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.8rem;
          margin-top: 4rem;
        }

        .progress-bar {
          width: 500px;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #20B2AA 0%, #15847e 100%);
          border-radius: 10px;
          transition: width 0.3s ease-out;
          box-shadow: 0 0 10px rgba(32, 178, 170, 0.5);
        }

        .progress-text {
          font-size: 2.2rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 700;
          letter-spacing: 4px;
          font-family: 'Courier New', monospace;
          margin-top: 0.5rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .blob-1 {
            width: 300px;
            height: 300px;
          }

          .blob-2 {
            width: 250px;
            height: 250px;
          }

          .blob-3 {
            width: 200px;
            height: 200px;
          }

          .quote-text {
            font-size: 1.8rem;
          }

          .quote-mark {
            font-size: 3.5rem;
          }

          .quote-author {
            font-size: 0.95rem;
            margin-bottom: 3rem;
          }

          .progress-bar {
            width: 350px;
            height: 5px;
          }

          .progress-text {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 480px) {
          .splash-content {
            padding: 1.5rem;
          }

          .quote-text {
            font-size: 1.5rem;
          }

          .quote-mark {
            font-size: 3rem;
          }

          .quote-author {
            font-size: 0.85rem;
          }

          .blob-container {
            filter: blur(60px);
          }

          .progress-bar {
            width: 280px;
            height: 4px;
          }

          .progress-text {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;