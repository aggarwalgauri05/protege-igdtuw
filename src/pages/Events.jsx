import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import "./events.css";

import { eventsData } from "../data/eventsData";


/* ---------------- ANIMATIONS ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const cardAnimation = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.3 }
  }
};


const years = [2026, 2025, 2024];

/* ---------------- COMPONENT ---------------- */

export default function Events() {
  const [activeYear, setActiveYear] = useState(2025);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = eventsData.filter(
    (event) => event.year === activeYear
  );

  return (
    <div className="events-page">
      <Header />

      {/* HERO */}
      <motion.section
        className="events-hero"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <h1>
          OUR <span>EVENTS</span>
        </h1>
        <p>
          Mentorships, workshops, competitions & more.
          From intense coding battles to insightful mentorship sessions, our events are built to help you grow, explore, and push your limits. 
          <span className="highlight"> Join the experience.</span>
        </p>
      </motion.section>

      {/* CONTENT */}
      <section className="events-content">
        {/* FILTER */}
        <aside className="year-filter">
          <p className="filter-title">FILTER BY YEAR</p>
          {years.map((year) => (
            <motion.button
              key={year}
              className={year === activeYear ? "active" : ""}
              onClick={() => setActiveYear(year)}
              whileHover={{ x: 6 }}
            >
              {year}
            </motion.button>
          ))}
        </aside>

        {/* EVENTS */}
        <div className="events-main">
          <motion.p className="section-label" variants={fadeUp}>
            PAST EVENTS
          </motion.p>

          <motion.h2 variants={fadeUp}>
            Highlights of <span>{activeYear}</span>
          </motion.h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeYear}
              initial="hidden"
              animate="show"
              exit="exit"
              className="event-grid"
            >
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className="event-card"
                  variants={cardAnimation}
                  whileHover={{ y: -10 }}
                  style={{
                    backgroundImage: `url(${event.image})`
                  }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="event-gradient" />

                  <span className="event-pill">{event.type}</span>

                  <div className="event-content">
                    <p className="event-date">📅 {event.date}</p>
                    <h3>{event.title}</h3>
                    <p className="event-desc">{event.description}</p>
                  </div>
                </motion.div>
              ))}

              {filteredEvents.length === 0 && (
                <motion.p variants={fadeUp} style={{ marginTop: 40 }}>
                  No events yet for {activeYear}
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* MODAL */}
      {/* EVENT DETAIL OVERLAY */}
<AnimatePresence>
  {selectedEvent && (
    <motion.div
      className="event-detail-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedEvent(null)}
    >
      <motion.div
        className="event-detail"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="event-detail-header">
          <h1>{selectedEvent.title}</h1>
          <p className="event-detail-date">
            📅 {selectedEvent.date}
          </p>
        </div>

        {/* IMAGE */}
        <div className="event-detail-image">
          <img src={selectedEvent.image} alt={selectedEvent.title} />
        </div>

        {/* CONTENT */}
        <div className="event-detail-content">
          <p>{selectedEvent.description}</p>

          {selectedEvent.instagram && (
  <a
    href={selectedEvent.instagram}
    target="_blank"
    rel="noopener noreferrer"
    className="event-instagram-btn"
  >
    <span className="insta-icon">📸</span>
    View on Instagram
    <span className="insta-arrow">↗</span>
  </a>
)}

        </div>

        {/* CLOSE */}
        <button
          className="event-detail-close"
          onClick={() => setSelectedEvent(null)}
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}
