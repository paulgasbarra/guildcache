import React, { useState } from "react";
import { axiosInstance, ENDPOINTS } from "../../api";
import ModelForm from "../../components/ModelForm";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import { AxiosError } from "axios";
import { InstructorFormFields } from "./InstructorFormFields";

export function InstructorCreation() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (formData: {}) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.INSTRUCTORS.LIST,
        formData
      );
      console.log("Instructor created:", response.data);
      setModalOpen(true);
      setModalText("Instructor created");
      setErrorMessage("");
      // Handle success - maybe redirect or clear the form
    } catch (error: any | AxiosError) {
      console.error("Error creating instructor:", error);
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
        to="/admin/instructors"
        className="bg-gray-800 text-white w100 hover:underline w-full p-2"
      >
        Back to Instructors
      </Link>
      <ModelForm
        onSubmit={handleSubmit}
        errorMessage={errorMessage}
        initialFormData={InstructorFormFields}
      />
      <Modal open={modalOpen} onClose={onClose}>
        {modalText}
      </Modal>
    </div>
  );
}
