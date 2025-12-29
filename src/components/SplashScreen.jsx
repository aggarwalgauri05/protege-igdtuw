import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import leftLogo from '../assets/logo-left.png';
import rightLogo from '../assets/logo-right.png';
import fullLogo from '../assets/logo-full.png';
import './SplashScreen.css';

const SplashScreen = ({ onFinish }) => {
  const [animationStage, setAnimationStage] = useState('sliding');

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStage('merging'), 1500);
    const timer2 = setTimeout(() => setAnimationStage('forming'), 2500);
    const timer3 = setTimeout(() => setAnimationStage('settling'), 3500);
    const timer4 = setTimeout(() => onFinish(), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        className="splash-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Head */}
        <motion.div
          className="logo-half left-logo"
          initial={{ x: '-100vw', opacity: 0 }}
          animate={{
            x: animationStage === 'sliding' ? '-10vw' : '0vw',
            opacity:
              animationStage === 'sliding'
                ? 1
                : animationStage === 'merging'
                ? 0.8
                : 0
          }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={leftLogo} alt="Left Head" className="logo-image" />
        </motion.div>

        {/* Right Head */}
        <motion.div
          className="logo-half right-logo"
          initial={{ x: '100vw', opacity: 0 }}
          animate={{
            x: animationStage === 'sliding' ? '10vw' : '0vw',
            opacity:
              animationStage === 'sliding'
                ? 1
                : animationStage === 'merging'
                ? 0.8
                : 0
          }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={rightLogo} alt="Right Head" className="logo-image" />
        </motion.div>

        {/* Final Logo */}
        <motion.div
          className="logo-formation"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale:
              animationStage === 'forming' || animationStage === 'settling'
                ? 1
                : 0,
            opacity:
              animationStage === 'forming' || animationStage === 'settling'
                ? 1
                : 0
          }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        >
          <img
            src={fullLogo}
            alt="Protégé Logo"
            className="full-logo-image"
          />

          <motion.div
            className="protege-text"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: animationStage === 'settling' ? 0 : 20,
              opacity: animationStage === 'settling' ? 1 : 0
            }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            PROTÉGÉ
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
