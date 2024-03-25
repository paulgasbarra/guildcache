import { InputObjectType } from "../../types/InputObjectType";

export const DonorFormFields: InputObjectType[] = [
  {
    id: "name",
    placeholder: "Name",
    type: "text",
    label: "Name",
    error: [],
    value: "",
  },
  {
    id: "location",
    placeholder: "Location",
    type: "text",
    label: "Location",
    error: [],
    value: "",
  },
  {
    id: "end_date",
    placeholder: "End Date",
    type: "date",
    label: "End Date",
    error: [],
    value: "",
  },
  {
    id: "instructors",
    placeholder: "Instructors",
    type: "select",
    label: "Instructors",
    error: [],
    value: "",
  },
  {
    id: "students",
    placeholder: "Students",
    type: "select",
    label: "Students",
    error: [],
    value: "",
  },
];
