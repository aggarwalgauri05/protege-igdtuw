import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Team from './pages/Team';
import SplashScreen from './components/SplashScreen';
import NeonCursor from './components/NeonCursor';
import GlitterCursor from './components/GlitterCursor'; 
import './styles/theme.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <>
      <NeonCursor />
      <GlitterCursor />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
