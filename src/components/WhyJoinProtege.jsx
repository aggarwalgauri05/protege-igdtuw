import "./WhyJoinProtege.css";
import { useEffect } from "react";
import {
  FiUsers,
  FiBookOpen,
  FiCode,
  FiFileText,
} from "react-icons/fi";

const benefits = [
  {
    title: "One-on-One Mentorship",
    text: "Get personalized mentorship from seniors and experts to guide you through your academic and professional journey.",
    icon: <FiUsers />,
  },
  {
    title: "Research Opportunities",
    text: "Engage in research projects across various domains and contribute to innovative solutions and publications.",
    icon: <FiBookOpen />,
  },
  {
    title: "Coding Contests",
    text: "Participate in exciting coding competitions to sharpen your problem-solving skills and win amazing rewards.",
    icon: <FiCode />,
  },
  {
    title: "Resume Building",
    text: "Enhance your resume with expert advice, practical projects, and impactful leadership experiences.",
    icon: <FiFileText />,
  },
];

const WhyJoinProtege = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".why-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="why-join">
      <h2 className="why-title">Why Join Protégé?</h2>

      <div className="why-grid">
        {benefits.map((item, index) => (
          <div className="why-card" key={index}>
            <span className="top-line"></span>
            <span className="why-index">{`0${index + 1}`}</span>

            <div className="why-header">
              <div className="why-icon">{item.icon}</div>
              <h3>{item.title}</h3>
            </div>

            <p className="why-text">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyJoinProtege;
