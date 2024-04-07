import { FormField } from "../types/FormField";

export const CohortFormFields: FormField[] = [
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
    id: "start_date",
    placeholder: "Start Date",
    type: "date",
    label: "Start Date",
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
    id: "students",
    placeholder: "Students",
    type: "association",
    label: "Students",
    error: [],
    value: [],
    options: [],
  },
  {
    id: "instructors",
    placeholder: "Instructors",
    type: "association",
    label: "Instructors",
    error: [],
    value: [],
    options: [],
  },
];
