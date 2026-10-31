import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import DashboardPage from './pages/DashboardPage';
import SubmitFeedbackPage from './pages/SubmitFeedbackPage';
import FeedbackHistoryPage from './pages/FeedbackHistoryPage';
import ProfilePage from './pages/ProfilePage';
import FacultyAnalyticsPage from './pages/FacultyAnalyticsPage';

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/feedback" element={<SubmitFeedbackPage />} />
          <Route path="/history" element={<FeedbackHistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/analytics" element={<FacultyAnalyticsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </>
  );
}
