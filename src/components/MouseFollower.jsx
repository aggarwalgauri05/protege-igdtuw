import { colors } from '../data/colors';
import { useEffect, useState } from 'react';

export default function MouseFollower({ mousePosition }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
      || (navigator.maxTouchPoints && navigator.maxTouchPoints > 1);
    setIsMobile(checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <div
      className="mouse-follower"
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        borderColor: colors.teal,
        boxShadow: `0 0 15px ${colors.teal}30`,
      }}
    />
  );
}