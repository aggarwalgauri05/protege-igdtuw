import { useEffect } from "react";
import "./NeonCursor.css";

const NeonCursor = () => {
  useEffect(() => {
    // Disable on mobile/touch devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
      || (navigator.maxTouchPoints && navigator.maxTouchPoints > 1);
    
    if (isMobile) return;

    const cursor = document.createElement("div");
    cursor.className = "neon-cursor";
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cursor.remove();
    };
  }, []);

  return null;
};

export default NeonCursor;