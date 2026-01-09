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
        </motion.div>
      </motion.section>
    </div>
  );
};

export default ComingSoon;