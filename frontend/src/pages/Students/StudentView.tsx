import React, { useState, useEffect } from "react";
import { ModelFieldDisplay } from "../../components/ModelFieldDisplay";
import { axiosInstance, ENDPOINTS } from "../../api";
import { ModelFieldInput } from "../../components/ModelFieldInput";

export const StudentView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({} as any);

  const studentId = window.location.pathname.split("/")[2];

  const fetchStudent = async () => {
    try {
      const response = await axiosInstance.get(
        ENDPOINTS.STUDENTS.DETAILS(studentId)
      );
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      fetchStudent();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cancelEditing = () => {
    setIsEditing(false);
    fetchStudent();
  };

  const submitEdit = async () => {
    try {
      await axiosInstance.put(ENDPOINTS.STUDENTS.DETAILS(studentId), formData);
      alert("Studend Updated");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating student:", error);
      // Handle error - maybe display a notification
    }
  };

  // use a map to render the fields, may require a model update to include a field type and a field label
  return isEditing ? (
    <div className="space-y-6 m-6">
      <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg">
        <ModelFieldInput
          labelName="Name"
          name="name"
          value={formData.name}
          onChange={onChange}
        />
        <ModelFieldInput
          labelName="Address"
          name="address"
          value={formData.address}
          onChange={onChange}
        />
        <ModelFieldInput
          labelName="Phone"
          name="phone"
          value={formData.phone}
          onChange={onChange}
        />
        <ModelFieldInput
          labelName="Email"
          name="email"
          value={formData.email}
          onChange={onChange}
        />
        <ModelFieldInput
          labelName="Linkedin"
          name="linkedIn"
          value={formData.linkedin}
          onChange={onChange}
        />
        <ModelFieldInput
          labelName="Resume Link"
          name="resume_link"
          value={formData.resume_link}
          onChange={onChange}
        />
        <ModelFieldInput
          labelName="LCA Certification"
          name="lca_cert"
          value={formData.lca_cert}
          onChange={onChange}
          type="checkbox"
        />
        <ModelFieldInput
          labelName="EPA 608 Certification"
          name="epa_608_cert"
          value={formData.epa_608_cert}
          onChange={onChange}
          type="checkbox"
        />
        <ModelFieldInput
          labelName="S&J Certification"
          name="s_j_cert"
          value={formData.s_j_cert}
          onChange={onChange}
          type="checkbox"
        />
        <ModelFieldInput
          labelName="Class Site"
          name="class_site"
          value={formData.class_site}
          onChange={onChange}
        />
        <ModelFieldInput
          labelName="Class Number"
          name="class_number"
          value={formData.class_number}
          onChange={onChange}
        />
        <ModelFieldInput
          labelName="class_date"
          name="Class Date"
          value={formData.class_date}
          onChange={onChange}
        />
      </div>
      <button
        onClick={cancelEditing}
        className="text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-60 w-full rounded-md p-2"
      >
        Cancel Edit
      </button>
      <button
        onClick={submitEdit}
        className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-60 w-full rounded-md p-2"
      >
        Submit
      </button>
    </div>
  ) : (
    <div className="space-y-6 m-6">
      <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg">
        <ModelFieldDisplay name="Name" value={formData.name} />
        <ModelFieldDisplay name="Address" value={formData.address} />
        <ModelFieldDisplay name="Phone" value={formData.phone} />
        <ModelFieldDisplay name="Email" value={formData.email} />
        <ModelFieldDisplay name="LinkedIn" value={formData.linkedin} />
        <ModelFieldDisplay name="Resume Link" value={formData.resume_link} />
        <ModelFieldDisplay
          name="LCA Certification"
          value={formData.lca_cert ? "Yes" : "No"}
        />
        <ModelFieldDisplay
          name="EPA 608 Certification"
          value={formData.epa_608_cert ? "Yes" : "No"}
        />
        <ModelFieldDisplay
          name="S&J Certification"
          value={formData.s_j_cert ? "Yes" : "No"}
        />
        <ModelFieldDisplay name="Class Site" value={formData.class_site} />
        <ModelFieldDisplay name="Class Number" value={formData.class_number} />
        <ModelFieldDisplay name="Class Date" value={formData.class_date} />
      </div>

      <button
        onClick={toggleEditing}
        className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-60 w-full rounded-md p-2"
      >
        Edit
      </button>
    </div>
  );
};
