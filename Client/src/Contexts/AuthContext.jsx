import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means not logged in
  const navigate = useNavigate();

  const login = (role, credentials) => {
    if (role === 'student' && credentials.erpId === '12345' && credentials.password === 'student') {
      setUser({ role: 'student', name: 'John Doe' });
      navigate('/student-dashboard');
    } else if (role === 'faculty' && credentials.email === 'faculty@example.com' && credentials.password === 'faculty') {
      setUser({ role: 'faculty', name: 'Jane Smith' });
      navigate('/faculty-dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
