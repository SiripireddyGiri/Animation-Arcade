import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
import LandingPage from './pages/LandingPage';
import GamePage from './pages/GamePage';
import { ROUTES } from './utils/constants';
import './styles/main/main.css';

function RouterContent() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isSafeMode = searchParams.get('safe') === 'true';

  useEffect(() => {
    console.log('📍 App: Location changed to:', location.pathname + location.search);
  }, [location]);

  if (isSafeMode) {
    return (
      <div style={{ padding: '50px', background: 'blue', color: 'white', minHeight: '100vh' }}>
        <h1>SAFE MODE ACTIVE</h1>
        <p>Current Path: {location.pathname}</p>
        <p>If you see this, the core routing is working.</p>
        <button onClick={() => window.location.href = ROUTES.HOME}>Go to Home</button>
      </div>
    );
  }

  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<LandingPage />} />
      <Route path={ROUTES.GAME} element={<GamePage />} />
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

function App() {
  console.log('📦 App.jsx: Rendering App component...');

  useEffect(() => {
    console.log('✅ App.jsx: MOUNTED');
    return () => console.log('❌ App.jsx: UNMOUNTED');
  }, []);

  return (
    <div className="app-root">
      <ThemeProvider>
        <AuthProvider>
          <GameProvider>
            <Router>
              <RouterContent />
            </Router>
          </GameProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
