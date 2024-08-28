import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HeaderElse from './components/HeaderElse'
import HomePage from './pages/HomePage';
import EndpointsPage from './pages/EndpointsPage';
import AlertsPage from './pages/AlertsPage';
import SettingPage from './pages/SettingPage';
import LoginPage from './pages/LoginPage'

const auth = getAuth();

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const MainContent = () => {
  const location = useLocation();

  return (
    <main className="flex-1 overflow-auto">
      {((location.pathname === '/') && <Header />) || ((location.pathname !== '/login') && <HeaderElse />)}
      <div className="p-4">
        <Routes>
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/endpoints" element={<PrivateRoute><EndpointsPage /></PrivateRoute>} />
          <Route path="/alerts" element={<PrivateRoute><AlertsPage /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><SettingPage /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </main>
  );
};

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-grey text-white">
        <Sidebar />
        <MainContent />
      </div>
    </Router>
  );
}
