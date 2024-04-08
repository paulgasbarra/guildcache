import React, { useState } from "react";
import { ModelFieldInput } from "./ModelFieldInput";
import { axiosInstance } from "../api";
import { Contact } from "../types/Contact";

interface MemberFormProps {
  formData: Contact | any;
  formFields: any;
  submitForm: () => void;
  cancel: () => void;
}

const MemberForm: React.FC<MemberFormProps> = ({ formData }) => {
  const [newFormData, setNewFormData] = useState<Contact | any>(formData);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFormData({ ...newFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    submitForm(newFormData);
  };

  const handleCancel = () => {
    cancel();
  };

  return (
    <div>
      {newFormData &&
        newFormData.map((field: any) => (
          <>
            <ModelFieldInput key={field.id} field={field} onChange={onChange} />
            <button onClick={submitEdit}>Submit</button>
            <button onClick={cancelEditing}>Cancel</button>
          </>
        ))}
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
  updateMemberEndpoint = " /api/members/",
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFormData({ ...newFormData, [e.target.name]: e.target.value });
  };

  const submitEdit = async () => {
    try {
      await axiosInstance.put(
        updateMemberEndpoint(newFormData.id),
        newFormData
      );
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
          formFields={[]}
          submitForm={submitEdit}
          cancel={cancelEditing}
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
    setIsAdding(!isAdding);
  };
  return (
    <div>
      <div className="flex flex-row space-between">
        <label className="text-blue-700 font-medium mr-2">{label}:</label>
        <button onClick={toggleAdding}>Add {label}</button>
      </div>
      {isAdding && <MemberForm />}
      {members &&
        members.map((member) => (
          <Member
            key={member.id}
            memberData={member}
            updateMemberEndpoint={"/api/members/" + member.id + "/"}
            successMessage="Member updated successfully"
          />
        ))}
      {!members && <li>No {"Contact"}</li>}
    </div>
  );
};
export default MembersView;
