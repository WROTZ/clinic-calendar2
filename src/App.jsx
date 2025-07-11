import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import CalendarView from './components/CalendarView';

const App = () => {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';

  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route
        path="/calendar"
        element={isAuthenticated ? <CalendarView /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
