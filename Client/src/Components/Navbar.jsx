import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo or Brand Name */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-200">
          Attendance System
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {/* Home Link - Always Visible */}
          <Link
            to="/"
            className="hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition"
          >
            Home
          </Link>

          {/* Conditional Links for Authenticated Users */}
          {user ? (
            <>
              <span className="text-lg font-medium">
                Welcome, <span className="font-semibold">{user.name}</span>
              </span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/student-login"
                className="hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Student Login
              </Link>
              <Link
                to="/faculty-login"
                className="hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Faculty Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
