import React from "react";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import CheckboxGroupInput from "./CheckboxGroupInput";

interface FormInputProps {
  id: string;
  label: string;
  placeholder: string | undefined;
  type: string;
  multiple?: boolean;
  error: string[];
  handleChange: any;
  options?: { value: string; label: string; selected?: boolean }[];
}

export const FormInput: React.FC<FormInputProps> = (props) => {
  const { id, label, error, handleChange, type, multiple, options } = props;

  if (type === "select" && !multiple && options) {
    return (
      <SelectInput
        id={id}
        label={label}
        error={error}
        handleChange={handleChange}
        options={options}
      />
    );
  } else if (type === "select" && multiple && options) {
    return (
      <CheckboxGroupInput
        id={id}
        label={label}
        error={error}
        handleChange={handleChange}
        options={options}
      />
    );
  } else if (type === "association") {
    return null;
  } else {
    return <TextInput {...props} />;
  }
};
