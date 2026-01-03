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
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="event-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedEvent(null)}
              >
                ✕
              </button>

              <span className="event-pill">{selectedEvent.type}</span>
              <h2 style={{ marginTop: 16 }}>{selectedEvent.title}</h2>
              <p style={{ color: "#19c7b8", marginTop: 8 }}>
                📅 {selectedEvent.date}
              </p>
              <p style={{ marginTop: 16, color: "#8a9a9a" }}>
                {selectedEvent.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
