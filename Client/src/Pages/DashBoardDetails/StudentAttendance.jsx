import React, { useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [recognizedName, setRecognizedName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const startCamera = () => {
    setIsCameraOn(true);
  };

  const stopCamera = () => {
    setIsCameraOn(false);
  };

  const handleAttendance = async () => {
    if (!recognizedName) {
      alert("No recognized face to mark attendance.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/give-attendance", {
        name: recognizedName,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting attendance:", error);
      setErrorMessage("There was an error while marking attendance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-semibold mb-4">Face Recognition Attendance</h2>

      {isCameraOn ? (
        <div className="flex flex-col items-center mb-4">
          <img
            src="http://localhost:5000/api/video_feed"
            alt="Camera Feed"
            className="w-full max-w-lg h-auto rounded-lg border border-gray-300 mb-4"
          />
          <button
            onClick={stopCamera}
            className="px-6 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Stop Camera
          </button>
        </div>
      ) : (
        <button
          onClick={startCamera}
          className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 mb-4"
        >
          Start Camera
        </button>
      )}

      <button
        onClick={handleAttendance}
        className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        {loading ? "Submitting..." : "Mark Attendance"}
      </button>

      {errorMessage && (
        <p className="mt-4 text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Attendance;
