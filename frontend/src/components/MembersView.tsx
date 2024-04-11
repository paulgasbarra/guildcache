import React, { useState } from "react";
import { ModelFieldInput } from "./ModelFieldInput";
import { axiosInstance } from "../api";
import { Contact } from "../types/Contact";
import { ContactFormFields } from "../formFields/ContactFormFields";
import { InputObjectType } from "../types/InputObjectType";
import { ENDPOINTS } from "../api";

interface MemberFormProps {
  formFields: InputObjectType[];
  initialValues: { [key: string]: string | number | boolean };
  onSubmit: (values: { [key: string]: string | number | boolean }) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined;
  closeForm: () => void;
}

const MemberForm: React.FC<MemberFormProps> = ({
  formFields,
  onSubmit,
  onChange,
  initialValues,
  closeForm,
}) => {
  const handleSubmit = async () => {
    onSubmit(initialValues);
    closeForm();
  };

  const handleCancel = () => {
    closeForm();
  };

  return (
    <div>
      {initialValues &&
        formFields.map((field: any) => (
          <ModelFieldInput
            key={field.id}
            labelName={field.label}
            name={field.id}
            type={field.type}
            value={initialValues[field.id]}
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
  refetchEntity: () => void;
}

const Member: React.FC<MemberProps> = ({
  memberData,
  updateMemberEndpoint,
  refetchEntity,
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
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setNewFormData({ ...newFormData, [e.target.name]: value });
  };

  const submitEdit = async () => {
    try {
      await axiosInstance.put(updateMemberEndpoint, newFormData);
      refetchEntity();
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
          initialValues={newFormData}
          formFields={ContactFormFields}
          onSubmit={submitEdit}
          closeForm={cancelEditing}
          onChange={onChange}
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
  groupId: number | string;
  groupType: string;
  refetchEntity: () => void;
}

const MembersView: React.FC<MemberViewProps> = ({
  members,
  label,
  groupId,
  groupType,
  refetchEntity,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newFormData, setNewFormData] = useState<{ [key: string]: any }>({});

  const toggleAdding = () => {
    setIsAdding(!isAdding);
    setNewFormData(blankMember);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setNewFormData({ ...newFormData, [e.target.name]: value });
  };

  const addMember = async (formData: {
    [key: string]: string | boolean | number;
  }) => {
    formData = { ...formData, [groupType]: groupId };
    const url = ENDPOINTS[label.toUpperCase() as "CONTACTS"].CREATE;
    try {
      await axiosInstance.post(url, formData);
      if (refetchEntity) {
        refetchEntity();
      }
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding member:", error);
      // Handle error - maybe display a notification
    }
  };

  const blankMember = ContactFormFields.reduce((acc, field) => {
    let defaultValue;
    switch (field.type) {
      case "checkbox":
        defaultValue = false; // Falsy value for checkbox is 'false'
        break;
      case "number":
        defaultValue = 0; // Falsy value for number is '0'
        break;
      case "select":
        // Assuming your select options are an array and you want the first option as the default
        defaultValue =
          field.options && field.options.length > 0
            ? field.options[0].value
            : "";
        break;
      case "text":
      case "email":
      case "textarea": // Assuming you might add a textarea type
      default:
        defaultValue = ""; // Falsy value for text, email, textarea, etc. is an empty string
        break;
    }
    return {
      ...acc,
      [field.id]: defaultValue,
    };
  }, {});

  return (
    <div>
      <div className="flex flex-row space-between">
        <label className="text-blue-700 font-medium mr-2">{label}:</label>
        <button onClick={toggleAdding}>Add {label}</button>
      </div>
      {isAdding && (
        <MemberForm
          formFields={ContactFormFields}
          initialValues={newFormData}
          onChange={onChange}
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
            refetchEntity={refetchEntity}
            successMessage="Contact updated successfully"
          />
        ))}
      {!members && <li>No {"Contacts"}</li>}
    </div>
  );
};
export default MembersView;
