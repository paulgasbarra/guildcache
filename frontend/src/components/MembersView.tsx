import React, { useEffect, useState } from "react";
import { ModelFieldInput } from "./ModelFieldInput";
import { axiosInstance } from "../api";
import { Contact } from "../types/Contact";
import { ContactFormFields } from "../formFields/ContactFormFields";
import { FormField } from "../types/FormField";
import { ENDPOINTS } from "../api";

type FormData = Contact | null;

interface MemberFormProps {
  formData: FormData;
  formFields: FormField[];
  onSubmit: (formData: FormData) => void;
  closeForm: () => void;
}

const MemberForm: React.FC<MemberFormProps> = ({
  formData,
  formFields,
  onSubmit,
  closeForm,
}) => {
  const [newFormData, setNewFormData] = useState<Contact | null>(null);

  useEffect(() => {
    if (formData) {
      setNewFormData(formData);
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFormData({ ...newFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    onSubmit(newFormData);
    closeForm();
  };

  const handleCancel = () => {
    setNewFormData(null);
    closeForm();
  };

  return (
    <div>
      {formFields &&
        newFormData &&
        formFields.map((field: any) => (
          <ModelFieldInput
            key={field.id}
            labelName={field.label}
            name={field.id}
            value={newFormData[field.id]}
            onChange={onChange}
          />
        ))}
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

interface MemberProps {
  memberData: Contact | any;
  updateMemberEndpoint: string;
  successMessage: string;
}

const Member: React.FC<MemberProps> = ({
  memberData,
  updateMemberEndpoint,
  successMessage,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newFormData, setNewFormData] = useState(memberData);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setNewFormData(memberData);
  };

  const submitEdit = async () => {
    try {
      await axiosInstance.put(updateMemberEndpoint, newFormData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating entity:", error);
      // Handle error - maybe display a notification
    }
  };

  return (
    <div>
      {isEditing ? (
        <MemberForm
          formData={newFormData}
          formFields={ContactFormFields}
          onSubmit={submitEdit}
          closeForm={cancelEditing}
        />
      ) : (
        <div className="flex flex-row gap-2">
          <h1>{newFormData.name}</h1>
          <p>{newFormData.email}</p>
          <button onClick={toggleEditing}>Edit</button>
        </div>
      )}
    </div>
  );
};

interface MemberViewProps {
  members: Contact[] | any[];
  label: string;
}

const MembersView: React.FC<MemberViewProps> = ({ members, label }) => {
  const [isAdding, setIsAdding] = useState(false);

  const toggleAdding = () => {
    console.log(members);
    setIsAdding(!isAdding);
  };

  const addMember = async (formData: FormData) => {
    const url = ENDPOINTS[label.toUpperCase() as "CONTACTS"].CREATE;
    try {
      await axiosInstance.post(url, formData);
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding member:", error);
      // Handle error - maybe display a notification
    }
  };

  return (
    <div>
      <div className="flex flex-row space-between">
        <label className="text-blue-700 font-medium mr-2">{label}:</label>
        <button onClick={toggleAdding}>Add {label}</button>
      </div>
      {isAdding && (
        <MemberForm
          formData={null}
          formFields={ContactFormFields}
          onSubmit={addMember}
          closeForm={toggleAdding}
        />
      )}
      {members &&
        members.map((member) => (
          <Member
            key={member.id}
            memberData={member}
            updateMemberEndpoint={ENDPOINTS[
              label.toUpperCase() as "CONTACTS"
            ].DETAILS(member.id)}
            successMessage="Member updated successfully"
          />
        ))}
      {!members && <li>No {"Contact"}</li>}
    </div>
  );
};
export default MembersView;
