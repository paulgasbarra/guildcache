import React, { useState, useEffect } from "react";
import { axiosInstance } from "../api";
import { ModelFieldDisplay } from "./ModelFieldDisplay";
import { ModelFieldInput } from "./ModelFieldInput";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import MembersView from "./MembersView";

interface EntityViewProps {
  entityFormFields: { id: string; label: string; type: string }[];
  fetchDetailEndpoint: (id: string) => string;
  updateDetailEndpoint: (id: string) => string;
  backLink: string;
  successMessage: string;
  modelType?: string;
}

export const EntityView: React.FC<EntityViewProps> = ({
  entityFormFields,
  fetchDetailEndpoint,
  updateDetailEndpoint,
  backLink,
  successMessage,
  modelType,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({} as any);
  const [modalOpen, setModalOpen] = useState(false);
  const entityId = window.location.pathname.split("/")[3]; // You might want to pass this as a prop for more flexibility

  useEffect(() => {
    fetchEntity();
  }, [entityId, fetchDetailEndpoint]);

  const fetchEntity = async () => {
    console.log("fetching entity");
    try {
      const response = await axiosInstance.get(fetchDetailEndpoint(entityId));
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching entity:", error);
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const cancelEditing = () => {
    setIsEditing(false);
    // Optionally refetch the entity details to reset any unsaved changes
  };

  const submitEdit = async () => {
    try {
      await axiosInstance.put(updateDetailEndpoint(entityId), formData);
      setModalOpen(true);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating entity:", error);
      // Handle error - maybe display a notification
    }
  };

  return (
    <div className="flex flex-col">
      <Link
        to={backLink}
        className="bg-gray-800 text-white hover:underline w-full p-2"
      >
        Back
      </Link>
      {isEditing ? (
        <>
          <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg">
            {entityFormFields.map((field) => (
              <ModelFieldInput
                key={field.id}
                labelName={field.label}
                name={field.id}
                type={field.type}
                value={formData[field.id]}
                onChange={onChange}
              />
            ))}
          </div>
          <button
            onClick={cancelEditing}
            className="text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-60 w-full rounded-md p-2"
          >
            Cancel Edit
          </button>
          <button
            onClick={submitEdit}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60 w-full rounded-md p-2"
          >
            Submit
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4 p-4 bg-white rounded-lg">
            {entityFormFields.map((field) => {
              if (field.type === "members" && modelType !== undefined) {
                return (
                  <MembersView
                    label={field.label}
                    key={field.id}
                    members={formData[field.id]}
                    groupId={entityId}
                    groupType={modelType}
                    refetchEntity={fetchEntity}
                  />
                );
              } else {
                return (
                  <ModelFieldDisplay
                    key={field.id}
                    name={field.label}
                    value={formData[field.id]}
                  />
                );
              }
            })}
          </div>
          <button
            onClick={toggleEditing}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60 w-full rounded-md p-2"
          >
            Edit
          </button>
        </>
      )}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {successMessage}
      </Modal>
    </div>
  );
};
