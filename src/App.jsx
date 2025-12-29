import { useState } from 'react';
import Home from './pages/Home';
import SplashScreen from './components/SplashScreen';
import './styles/theme.css';


function App() {
const [showSplash, setShowSplash] = useState(true);


return showSplash ? (
<SplashScreen onFinish={() => setShowSplash(false)} />
) : (
<Home />
);
}


export default App;

