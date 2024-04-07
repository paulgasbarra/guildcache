import { InputObjectType } from "../types/InputObjectType";

export const ContactFormFields: InputObjectType[] = [
  {
    id: "name",
    placeholder: "Name",
    type: "text",
    label: "Name",
    error: [],
    value: "",
  },
  {
    id: "phone",
    placeholder: "Phone",
    type: "text",
    label: "Phone",
    error: [],
    value: "",
  },
  {
    id: "email",
    placeholder: "Email",
    type: "text",
    label: "Email",
    error: [],
    value: "",
  },
  {
    id: "is_primary",
    type: "checkbox",
    label: "Primary contact?",
    error: [],
    value: false,
    placeholder: "",
  },
];
