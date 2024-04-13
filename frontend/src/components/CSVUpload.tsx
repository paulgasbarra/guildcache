import { useState } from "react";
import React from "react";
import { axiosInstance } from "../api";

interface CSVUploadProps {
  endpoint: string;
}

const CSVUpload: React.FC<CSVUploadProps> = ({ endpoint }) => {
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
    <div className="grow">
      <input type="file" onChange={handleFileChange} />
      <br />
      <button className="border p-2" onClick={handleFileUpload}>
        Upload
      </button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default CSVUpload;
