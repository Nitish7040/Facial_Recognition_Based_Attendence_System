import React from "react";
import { Link } from "react-router-dom";

const FacultyDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
          Faculty Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Card 1 */}
          <Link
            to="#"
            className="block bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all overflow-hidden"
          >
            <img
              src="https://via.placeholder.com/150"
              alt="Take Attendance"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <h2 className="text-xl font-semibold text-gray-700">
                  Take Attendance
                </h2>
              </div>
              <p className="text-gray-600">
                Manage and mark student attendance efficiently.
              </p>
            </div>
          </Link>

          {/* Card 2 */}
          <Link
            to="/student-register"
            className="block bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all overflow-hidden"
          >
            <img
              src="https://via.placeholder.com/150"
              alt="Student Registration"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <h2 className="text-xl font-semibold text-gray-700">
                  Student Registration
                </h2>
              </div>
              <p className="text-gray-600">
                Add new students to the system with ease.
              </p>
            </div>
          </Link>

          {/* Card 3 */}
          <Link
            to="/report-generation"
            className="block bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all overflow-hidden"
          >
            <img
              src="https://via.placeholder.com/150"
              alt="Generate Reports"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <h2 className="text-xl font-semibold text-gray-700">
                  Schedules
                </h2>
              </div>
              <p className="text-gray-600">
                Teachers can view their schedules.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
