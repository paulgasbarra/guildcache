import { useState } from "react";
import React from "react";
import { axiosInstance } from "../api";

interface CSVUploadProps {
  endpoint: string;
  modelName?: string;
}

const CSVUpload: React.FC<CSVUploadProps> = ({ endpoint, modelName }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setError(null);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axiosInstance.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully");
    } catch (error) {
      setError("Error uploading file");
    }
  };

  return (
    <div className="p-4 flex flex-col ">
      <h2 className="text-2xl font-bold mb-4">Upload a {modelName} CSV</h2>
      <input type="file" onChange={handleFileChange} />
      <br />
      <button
        disabled={file === null}
        className="w-1/3 text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-60 w-full rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleFileUpload}
      >
        Upload
      </button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default CSVUpload;
