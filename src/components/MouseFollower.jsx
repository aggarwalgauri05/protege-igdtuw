import { colors } from '../data/colors';

export default function MouseFollower({ mousePosition }) {
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