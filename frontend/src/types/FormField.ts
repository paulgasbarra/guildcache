export interface FormField {
  id: string;
  placeholder: string;
  type: string;
  label: string;
  error: [];
  value: string | number | string[] | number[];
  options?: { value: string; label: string }[];
}
