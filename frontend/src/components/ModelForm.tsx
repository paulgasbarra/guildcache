import React, { useState, useEffect } from "react";
import { InputObjectType } from "../types/InputObjectType";
import { ModelFieldInput } from "./ModelFieldInput";

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
    <div>
      <form onSubmit={handleSubmit} className="space-y-6 float-left">
        <div>
          {formData.map((input) => (
            <ModelFieldInput
              key={input.id}
              name={input.id}
              labelName={input.label}
              value={input.value}
              type={input.type}
              options={input.options}
              onChange={handleChange}
            />
          ))}
        </div>
        <div>
          <button
            type="submit"
            className="text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-60 w-full rounded-md p-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModelForm;
