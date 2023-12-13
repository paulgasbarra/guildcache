import { HTMLInputTypeAttribute } from "react";

export interface InputObjectType {
  id: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  label: string;
  error: [];
  value: string | number | boolean;
}
