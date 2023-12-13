import React, { useState } from "react";
import { axiosInstance, ENDPOINTS } from "../../api";
import { Student } from "../../types/Student";
import ModelForm from "../../components/ModelForm";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import { AxiosError } from "axios";
import { StudentFormFields } from "./StudentFormFields";

export function StudentCreation() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (formData: {}) => {
    console.log(formData);
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.STUDENTS.LIST,
        formData
      );
      console.log("Student created:", response.data);
      setModalOpen(true);
      setModalText("Student created");
      setErrorMessage("");
      // Handle success - maybe redirect or clear the form
    } catch (error: any | AxiosError) {
      console.error("Error creating student:", error);
      setErrorMessage(error.request.response);
      setModalOpen(true);
      setModalText("Something went wrong.");
    }
  };

  const onClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full">
      <Link
        to="/admin/students"
        className="bg-gray-800 text-white w100 hover:underline w-full p-2"
      >
        Back to Students
      </Link>
      <ModelForm
        onSubmit={handleSubmit}
        errorMessage={errorMessage}
        initialFormData={StudentFormFields}
      />
      <Modal open={modalOpen} onClose={onClose}>
        {modalText}
      </Modal>
    </div>
  );
}
