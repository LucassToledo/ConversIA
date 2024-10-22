import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import ChatHistoryPage from './components/ChatHistoryPage';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import CustomScenario from './components/CustomScenario';
import ScenarioSetup from './components/ScenarioSetup';
import InterviewChat from './components/InterviewChat';
import Summary from './components/Summary';
import ErrorBoundary from './components/ErrorBoundary';
import { useStore } from './store/useStore';

function App() {
  const [user, loading] = useAuthState(auth);
  const { darkMode, language } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAuthenticated = user || sessionStorage.getItem('demoUser') === 'true';

  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <ProfilePage />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/chat-history"
              element={
                isAuthenticated ? (
                  <ChatHistoryPage />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/onboarding"
              element={
                isAuthenticated ? (
                  <Onboarding />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/custom-scenario"
              element={
                isAuthenticated ? (
                  <CustomScenario />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/scenario-setup"
              element={
                isAuthenticated ? (
                  <ScenarioSetup />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/interview"
              element={
                isAuthenticated ? (
                  <InterviewChat />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/interview/:chatId"
              element={
                isAuthenticated ? (
                  <InterviewChat />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/summary"
              element={
                isAuthenticated ? <Summary /> : <Navigate to="/auth" replace />
              }
            />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
