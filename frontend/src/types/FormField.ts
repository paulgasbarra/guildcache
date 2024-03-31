export interface FormField {
  id: string;
  placeholder: string;
  type: string;
  label: string;
  error: [];
  value: string | number | boolean | object[];
  options?: { value: string; label: string }[];
}
