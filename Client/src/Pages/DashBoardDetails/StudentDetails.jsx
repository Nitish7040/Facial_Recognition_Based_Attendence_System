import React from 'react';

const StudentDetails = () => {
  const students = [
    { id: 1, name: 'John Doe', grade: 'A' },
    { id: 2, name: 'Jane Smith', grade: 'B' },
    { id: 3, name: 'Mike Ross', grade: 'A+' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Student Details</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Grade</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="p-4">{student.id}</td>
              <td className="p-4">{student.name}</td>
              <td className="p-4">{student.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDetails;
