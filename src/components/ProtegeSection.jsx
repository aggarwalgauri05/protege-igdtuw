import './ProtegeSection.css';
import AboutProtege from "../components/AboutProtege";
import Gallery from "../components/Gallery";
import WhyJoinProtege from "./WhyJoinProtege";

const ProtegeSection = () => {
  return (
    <section className="protege-section">

      {/* About Protégé */}
      <AboutProtege />

      {/* Image Gallery */}
      <Gallery />

      {/* Why Join Protégé */}
      <WhyJoinProtege />

    </section>
  );
};

export default ProtegeSection;
