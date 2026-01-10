import { motion } from "framer-motion";
import Header from "../components/Header";
import "./ComingSoon.css";

const ComingSoon = () => {
  return (
    <div className="coming-soon-page">
      <Header />
      
      <motion.section
        className="coming-soon-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="coming-soon-content"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="coming-soon-title">
            Stay <span className="highlight">Tuned</span>
          </h1>
          <p className="coming-soon-subtitle">
            Something amazing is coming soon!
          </p>
          
          <motion.div
            className="coming-soon-icon"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🚀
          </motion.div>
          
          <p className="coming-soon-description">
            We're working hard to bring you something incredible. 
            Keep an eye out for updates!
          </p>
          
          <motion.div
            className="community-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="community-title">Join Our Community</h3>
            <p className="community-text">Stay connected for all the latest updates!</p>
            
            <div className="social-buttons">
              <motion.a
                href="https://chat.whatsapp.com/Fx9wzmICF9I3mG62q3QNbI"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn whatsapp-btn"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="social-icon">💬</span>
                <span className="social-text">WhatsApp Group</span>
              </motion.a>
              
              <motion.a
                href="https://www.instagram.com/protege_mentorship/?igshid=YmMyMTA2M2Y%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn instagram-btn"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="social-icon">📸</span>
                <span className="social-text">Instagram</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default ComingSoon;