import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Team from "./pages/Team";
import Blog from "./pages/Blog";
import Events from "./pages/Events";
import Mentorship from "./pages/mentorship";

import Header from "./components/Header";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";
import NeonCursor from "./components/NeonCursor";
import GlitterCursor from "./components/GlitterCursor";
import ScrollToTop from "./components/ScrollToTop";

import "./styles/theme.css";
import "./styles/scrollAnimations.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Show splash screen first
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <ScrollToTop />
      <NeonCursor />
      <GlitterCursor />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/events" element={<Events />} />
        <Route path="/mentorship" element={<Mentorship />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
