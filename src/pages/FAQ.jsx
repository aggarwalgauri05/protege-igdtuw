import { useState, useEffect } from 'react';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';
import { faqs, categories } from '../data/faqData';
import { colors } from '../data/colors';
import MouseFollower from '../components/MouseFollower';
import BackgroundBlobs from '../components/BackgroundBlobs';
import '../styles/FAQ.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredFaqs = faqs
    .filter(faq => 
      selectedCategory === 'all' || faq.category === selectedCategory
    )
    .filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container" style={{ backgroundColor: colors.black }}>
      <MouseFollower mousePosition={mousePosition} />
      <BackgroundBlobs />

      <div className="faq-content">
        <div className="faq-max-width">
          {/* Header */}
          <div className="faq-header">
            <h1 className="faq-title" style={{ color: colors.teal }}>
              FAQ's
            </h1>
            <p className="faq-subtitle">Find answers to your questions</p>
          </div>

          {/* Search & Filter Section */}
          <div className="search-filter-section">
            {/* Search Bar */}
            <div className="search-bar-wrapper">
              <Search 
                size={20}
                className="search-icon"
                style={{ color: colors.teal }}
              />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                style={{
                  backgroundColor: colors.lighterGray,
                  borderColor: colors.darkTeal,
                  color: colors.lightGray
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.teal;
                  e.target.style.boxShadow = `0 0 15px ${colors.teal}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.darkTeal;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Category Filter */}
            <div className="category-filter">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="category-button"
                  style={{
                    backgroundColor: selectedCategory === cat.id ? colors.contrast : 'transparent',
                    borderColor: selectedCategory === cat.id ? colors.contrast : colors.teal,
                    color: selectedCategory === cat.id ? colors.black : colors.contrast,
                    boxShadow: selectedCategory === cat.id ? `0 0 15px ${colors.contrast}60` : 'none'
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Results Counter */}
            <div className="results-counter">
              <div className="counter-text">
                Showing <span style={{ color: colors.contrast }} className="counter-highlight">{filteredFaqs.length}</span> results
              </div>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="faq-items">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="faq-item"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="faq-item-inner">
                    <div 
                      className="faq-item-glow"
                      style={{ 
                        backgroundColor: colors.contrast,
                        opacity: (openIndex === index || hoveredIndex === index) ? 0.25 : 0
                      }}
                    ></div>
                    
                    <div 
                      className="faq-item-card"
                      style={{
                        backgroundColor: colors.lighterGray,
                        borderColor: colors.darkTeal
                      }}
                    >
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="faq-item-header"
                        style={{
                          backgroundColor: (openIndex === index || hoveredIndex === index) ? `${colors.contrast}15` : 'transparent'
                        }}
                      >
                        <div className="faq-item-text">
                          <h3 
                            className="faq-item-question"
                            style={{ color: colors.contrast }}
                          >
                            {faq.question}
                          </h3>
                        </div>
                        <ChevronDown
                          size={28}
                          className="faq-chevron"
                          style={{
                            color: colors.contrast,
                            transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
                          }}
                        />
                      </button>

                      <div
                        className={`faq-item-answer-wrapper ${
                          openIndex === index ? 'open' : 'closed'
                        }`}
                      >
                        <div 
                          className="faq-item-answer"
                          style={{
                            backgroundColor: colors.black,
                            borderColor: colors.darkTeal,
                            color: '#888888'
                          }}
                        >
                          <p className="answer-text">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p className="no-results-text">No FAQs found. Try adjusting your search.</p>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="contact-section">
            <div 
              className="contact-card"
              style={{
                backgroundColor: colors.lighterGray,
                borderColor: colors.darkTeal,
                boxShadow: `0 0 20px ${colors.teal}15`
              }}
            >
              <MessageCircle 
                size={40} 
                className="contact-icon"
                style={{ color: colors.teal }}
              />
              <p className="contact-text">Didn't find your answer?</p>
              <a 
                href="mailto:protégéigdtuw@gmail.com" 
                className="contact-button"
                style={{
                  backgroundColor: colors.contrast,
                  boxShadow: `0 0 15px ${colors.contrast}50`
                }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}