import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Link
        to="/student-details"
        className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <h2 className="text-xl font-semibold text-gray-700">Student Details</h2>
        <p className="text-gray-500 mt-2">View and manage student information.</p>
      </Link>
      <Link
        to="/attendance"
        className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <h2 className="text-xl font-semibold text-gray-700">Attendance</h2>
        <p className="text-gray-500 mt-2">Track attendance records efficiently.</p>
      </Link>
    </div>
  );
};

export default Dashboard;
