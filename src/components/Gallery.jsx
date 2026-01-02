import "./Gallery.css";

import gallery1 from "../assets/gallery1.jpeg";
import gallery2 from "../assets/gallery2.jpg";
import gallery3 from "../assets/gallery3.jpg";
import gallery4 from "../assets/gallery4.png";
import gallery5 from "../assets/gallery5.jpg";
import gallery6 from "../assets/gallery6.jpg";
import gallery7 from "../assets/gallery7.jpg";
import gallery8 from "../assets/gallery8.JPG";

const images = [
  { src: gallery1, layout: "small" }, 
  { src: gallery2, layout: "wide" },    
  { src: gallery3, layout: "tall" },  
  { src: gallery4, layout: "horizontal" }, 
  { src: gallery5, layout: "small" },
  { src: gallery6, layout: "large-left" },  
  { src: gallery7, layout: "small" },
  { src: gallery8, layout: "wide" },
];

const Gallery = () => {
  return (
    <section className="gallery-section">
      <h3 className="gallery-title">Gallery</h3>

      <div className="gallery-grid">
        {images.map((img, i) => (
          <div className={`gallery-item ${img.layout}`} key={i}>
            <img src={img.src} alt={`gallery-${i + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
