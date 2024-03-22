import React, { useState } from "react";
import { axiosInstance } from "../api";
import ModelForm from "./ModelForm";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { AxiosError } from "axios";
import { InputObjectType } from "../types/InputObjectType";

interface EntityCreationFormProps {
  postEndpoint: string;
  formFields: {};
  backLink: string;
  successMessage: string;
}

export const EntityCreationForm: React.FC<EntityCreationFormProps> = ({
  postEndpoint,
  formFields,
  backLink,
  successMessage,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (formData: {}) => {
    try {
      const response = await axiosInstance.post(postEndpoint, formData);
      console.log(`${successMessage}:`, response.data);
      setModalOpen(true);
      setModalText(successMessage);
      setErrorMessage("");
      // Handle success - maybe redirect or clear the form
    } catch (error: any | AxiosError) {
      console.error(`Error creating entity:`, error);
      setErrorMessage(error.request?.response || "Something went wrong.");
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
        to={backLink}
        className="bg-gray-800 text-white w-full hover:underline p-2"
      >
        Back
      </Link>
      <ModelForm
        onSubmit={handleSubmit}
        errorMessage={errorMessage}
        initialFormData={formFields as InputObjectType[]}
      />
      <Modal open={modalOpen} onClose={onClose}>
        {modalText}
      </Modal>
    </div>
  );
};
