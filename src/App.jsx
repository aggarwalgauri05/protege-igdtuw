import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Team from "./pages/Team";
import SplashScreen from "./components/SplashScreen";
import Footer from "./components/Footer";
import NeonCursor from "./components/NeonCursor";
import GlitterCursor from "./components/GlitterCursor";

import "./styles/theme.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Show splash screen first
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // Main app after splash
  return (
    <>
      <NeonCursor />
      <GlitterCursor />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
