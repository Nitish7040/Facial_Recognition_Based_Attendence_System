import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StudentLogin from './pages/Login/StudentLogin';
import FacultyLogin from './pages/Login/FacultyLogin';
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import FacultyDashboard from './pages/Dashboard/FacultyDashboard';
import StudentDetails from './Pages/DashBoardDetails/StudentDetails';
import StudentAttendance from './Pages/DashBoardDetails/StudentAttendance';

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-details" element={<StudentDetails />} />
        <Route path="/attendance" element={< StudentAttendance/>} />
        <Route path="/faculty-login" element={<FacultyLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
