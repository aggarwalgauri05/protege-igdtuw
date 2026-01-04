import { useEffect } from "react";
import "./NeonCursor.css";

const NeonCursor = () => {
  useEffect(() => {
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
