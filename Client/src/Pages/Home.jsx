import React from 'react';
import { Link } from 'react-router-dom';
import '../../../Client/src/index.css';

const Home = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
  "url('https://images.unsplash.com/photo-1530822062045-b0bcb3728696?crop=entropy&cs=tinysrgb&fit=max&ixid=M3wzNjY1OXwwfDF8c2VhcmNofDMxfHxzdHVkZW50c3xlbnwwfHx8fDE2ODc5ODg5NzE&ixlib=rb-4.0.3&q=80&w=1080')"

      }}
    >
      {/* Transparent Filter */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 py-10 bg-white bg-opacity-80 shadow-lg rounded-lg backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-4">
          Welcome to the Attendance System
        </h1>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/student-login"
            className="w-full sm:w-auto px-8 py-3 bg-blue-500 text-white text-lg font-medium rounded-md shadow hover:bg-blue-600 transition"
          >
            Student Login
          </Link>
          <Link
            to="/faculty-login"
            className="w-full sm:w-auto px-8 py-3 bg-green-500 text-white text-lg font-medium rounded-md shadow hover:bg-green-600 transition"
          >
            Faculty Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;