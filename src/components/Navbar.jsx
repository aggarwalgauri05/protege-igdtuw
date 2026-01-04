import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <a href="/">HOME</a>
      <a href="/team">TEAM</a>
      <a href="/mentorship">MENTORSHIP</a>
      <a href="/faqs">FAQS</a>
    </nav>
  );
}