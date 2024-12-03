
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Updated import

function StudentRegister() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    address: "",
    Branch: "",
    year: "",
    admissionNo: "",
    erpId: "",
  });

  const [error, setError] = useState(""); // State to store error messages
  const [success, setSuccess] = useState(""); // State to store success messages

  const navigate = useNavigate(); // Updated hook for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before submission
    setSuccess(""); // Reset success message

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const data = { ...formData };

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSuccess("Registration successful! You will be redirected shortly.");

      // Redirect to faculty dashboard after successful registration
      setTimeout(() => {
        navigate("/faculty-dashboard"); // Updated redirection using navigate
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.error); // Show backend error message
      } else {
        setError("Something went wrong! Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Student Registration
        </h2>
        <p className="text-center text-sm text-gray-600 mt-2">
          Fill out the form below to register as a student.
        </p>

        {/* Display error or success message */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && <div className="text-green-500 text-center mb-4">{success}</div>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200 hover:shadow-lg"
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200 hover:shadow-lg"
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200 hover:shadow-lg"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Mobile Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200 hover:shadow-lg"
              placeholder="Enter mobile number"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200 hover:shadow-lg"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200 hover:shadow-lg"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Address Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200 hover:shadow-lg"
              placeholder="Enter address"
              required
            />
          </div>

          {/* Branch Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Branch <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="Branch"
              value={formData.Branch}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200 hover:shadow-lg"
              placeholder="Enter branch"
              required
            />
          </div>

          {/* Year Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Year <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200 hover:shadow-lg"
              placeholder="Enter year"
              required
            />
          </div>

          {/* Admission No Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Admission No <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="admissionNo"
              value={formData.admissionNo}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200 hover:shadow-lg"
              placeholder="Enter admission number"
              required
            />
          </div>

          {/* ERP ID Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ERP ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="erpId"
              value={formData.erpId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200 hover:shadow-lg"
              placeholder="Enter ERP ID"
              required
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentRegister;