import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="p-4 flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Clinic Staff Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-xs">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-2" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border p-2" />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;