import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Container, TextField, Typography, Paper
} from '@mui/material';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'staff@clinic.com' && password === '123456') {
      localStorage.setItem('authenticated', 'true');
      navigate('/calendar');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 10, p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Clinic Staff Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth />
          <Button variant="contained" color="primary" type="submit">Login</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
