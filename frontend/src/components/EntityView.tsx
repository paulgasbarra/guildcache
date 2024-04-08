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
}

export const EntityView: React.FC<EntityViewProps> = ({
  entityFormFields,
  fetchDetailEndpoint,
  updateDetailEndpoint,
  backLink,
  successMessage,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({} as any);
  const [modalOpen, setModalOpen] = useState(false);
  const entityId = window.location.pathname.split("/")[3]; // You might want to pass this as a prop for more flexibility

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await axiosInstance.get(fetchDetailEndpoint(entityId));
        console.log(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching entity:", error);
      }
    };

    fetchEntity();
  }, [entityId, fetchDetailEndpoint]);

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
              if (field.type === "members") {
                return (
                  <MembersView
                    label={field.label}
                    key={field.id}
                    members={formData[field.id]}
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
// this is tricky. I'm trying to build a piece of a component that manages a separate but related model.
// I want the entity form to work across other models. But this one has looks for the field type of "members"
// and if it is then you will have options to add memeberss or edit members. I'd like to stay on the same page
// when adding or editing members. But I'm uncomfortable adding just a bunch of if statements to the component.
// and I'm not certain other models will have member fields. I feel like things are about to get messy. What if I had members component inside
// it would be like a todo list item. I've built those before so I can edit and add items to a list. I could use that as a reference.
