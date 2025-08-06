{/*import React, { useState } from 'react';

function UploadPrescription() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    alert("Prescription uploaded!");
    // You can later send this to the backend using axios
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Upload Your Prescription</h2>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".jpg,.png,.pdf"
        className="block w-full border border-gray-300 rounded p-2"
      />
      {file && <p className="mt-2 text-green-600">File: {file.name}</p>}
      <button
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default UploadPrescription;
*/}