import { useEffect } from "react";
import "./GlitterCursor.css";

const GlitterCursor = () => {
  useEffect(() => {
    // Disable on mobile/touch devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
      || (navigator.maxTouchPoints && navigator.maxTouchPoints > 1);
    
    if (isMobile) return;

    let lastTime = 0;

    const handleMouseMove = (e) => {
      const now = Date.now();

      // ⛔ throttle → reduces density
      if (now - lastTime < 45) return;
      lastTime = now;

      const sparkleCount = 2; // 🔽 reduced from 4

      for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement("span");
        sparkle.className = "cursor-glitter";

        const spread = 45; // 🔼 wider spread, less streak
        const offsetX = (Math.random() - 0.5) * spread;
        const offsetY = (Math.random() - 0.5) * spread;

        const size = Math.random() * 3 + 5;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;

        sparkle.style.left = `${e.clientX + offsetX}px`;
        sparkle.style.top = `${e.clientY + offsetY}px`;

        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 500);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
};

export default GlitterCursor;