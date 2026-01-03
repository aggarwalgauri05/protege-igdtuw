import "./Footer.css";
import logoFull from "../assets/logo-full.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-overlay">
        <div className="footer-content">
          {/* Left Column */}
          <div className="footer-col footer-brand">
            <img src={logoFull} alt="Protégé IGDTUW" className="footer-logo" />
            <p className="footer-description">
              The Mentorship Society of IGDTUW empowering minds and connecting futures.
            </p>
          </div>

          {/* Center Column */}
          <div className="footer-col footer-center">
            <div className="center-section">
              <div className="section-header centered">
                <h4>Get in Touch</h4>
              </div>
              
              {/* Email Card */}
              <div className="contact-card email-card highlighted">
                <div className="card-icon">✉️</div>
                <div className="card-content">
                  <p className="card-label">Email</p>
                  <a href="mailto:protégéigdtuw@gmail.com" className="footer-email">
                    protégéigdtuw@gmail.com
                  </a>
                </div>
              </div>

              {/* Follow Us Section */}
              <div className="follow-section">
                <p className="follow-label">You can also reach out to us via:</p>
                <div className="social-pills">
                  <a 
                    href="https://www.instagram.com/protege_mentorship/?igshid=YmMyMTA2M2Y%3D" 
                    target="_blank" 
                    rel="noreferrer"
                    className="social-pill-icon"
                    title="Instagram"
                  >
                    <img src="Instagram.png" alt="Instagram" className="social-icon-only" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/protegeigdtuw/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="social-pill-icon"
                    title="LinkedIn"
                  >
                    <img src="linkedin.svg" alt="LinkedIn" className="social-icon-only" />
                  </a>
                  <a 
                    href="https://x.com/protege_igdtuw" 
                    target="_blank" 
                    rel="noreferrer"
                    className="social-pill-icon"
                    title="Twitter"
                  >
                    <img src="Twitter.png" alt="Twitter" className="social-icon-only" />
                  </a>
                  <a 
                    href="https://chat.whatsapp.com/Fx9wzmICF9I3mG62q3QNbI" 
                    target="_blank" 
                    rel="noreferrer"
                    className="social-pill-icon"
                    title="WhatsApp"
                  >
                    <img src="Whatsapp.png" alt="WhatsApp" className="social-icon-only" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Location with Map */}
          <div className="footer-col footer-location">
            <div className="section-header centered">
              <h4>Location</h4>
            </div>
            
            <div className="location-card-with-map">
              {/* Map Image Container */}
              <div className="map-container">
                <img 
                  src="MapImage.png"
                  alt="IGDTUW Location Map"
                  className="map-image"
                />
              </div>

              {/* Location Details */}
              <div className="location-details-box">
                <h5>Indira Gandhi Delhi Technical University for Women (IGDTUW)</h5>
                <p className="location-info">Kashmere Gate, New Delhi 110006</p>
                <p className="location-country">Delhi, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <span className="copyright">© 2025 Protégé IGDTUW. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
