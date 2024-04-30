import React, { useState, useEffect } from "react";
import { InputObjectType } from "../types/InputObjectType";
import { ModelFieldInput } from "./ModelFieldInput";
import GrayButton from "./PrimaryButton";

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
  }, [formData, errorMessage]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const updatedFormData = formData.map((field) => {
      if (field.id === e.target.name) {
        const newValue =
          e.target instanceof HTMLInputElement && e.target.type === "checkbox"
            ? e.target.checked
            : e.target.value;
        return { ...field, value: newValue };
      }
      return field;
    });
    setFormData(updatedFormData);
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
              errorMessage={input.error}
            />
          ))}
        </div>
        <div>
          <GrayButton type="submit">Submit</GrayButton>
        </div>
      </form>
    </div>
  );
};

export default ModelForm;
