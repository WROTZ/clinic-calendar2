import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import CalendarView from './components/CalendarView';

const App = () => {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/calendar" element={isAuthenticated ? <CalendarView /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;