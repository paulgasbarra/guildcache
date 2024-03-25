import React, { useState, useEffect } from "react";
import { InputObjectType } from "../types/InputObjectType";
import { FormInput } from "./FormInput";

interface ModelFormProps {
  initialFormData: InputObjectType[];
  onSubmit: (formData: {}) => Promise<void>;
  errorMessage: string;
}

const ModelForm: React.FC<ModelFormProps> = ({
  initialFormData,
  onSubmit,
  errorMessage,
}) => {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);

  useEffect(() => {
    const errorMessageObject = errorMessage ? JSON.parse(errorMessage) : {};
    const errorIds: string[] = [];
    for (const error in errorMessageObject) {
      errorIds.push(error);
    }
    formData.forEach((field) => {
      if (errorIds.includes(field.id)) {
        field.error = errorMessageObject[field.id];
      } else {
        field.error = [];
      }
    });
  }, [errorMessage]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const index = formData.findIndex((d) => d.id === name);
    formData[index].value = type === "checked" ? checked : value;
    setFormData(formData);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const submitData = formData.reduce((acc, item) => {
      acc[item.id] = item.value;
      return acc;
    }, {} as Record<string, any>);
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 m-6 float-left">
      <div>
        {formData.map((input) => (
          <FormInput
            key={input.id}
            id={input.id}
            placeholder={input.placeholder}
            type={input.type}
            label={input.label}
            error={input.error}
            handleChange={handleChange}
          />
        ))}
      </div>
      <div>
        <button
          type="submit"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-60 w-full rounded-md p-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ModelForm;
