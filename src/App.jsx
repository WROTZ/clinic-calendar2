import React, { useState, useMemo } from 'react';
import {
  ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Box
} from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import CalendarView from './components/CalendarView';
import DarkModeToggle from './components/DarkModeToggle';

const App = () => {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';
  const [mode, setMode] = useState('light');

  const theme = useMemo(() =>
    createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Clinic Calendar</Typography>
          <DarkModeToggle mode={mode} setMode={setMode} />
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/calendar" element={isAuthenticated ? <CalendarView /> : <Navigate to="/" />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
