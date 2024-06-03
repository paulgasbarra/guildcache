import { InputObjectType } from "../types/InputObjectType";

export const validateImportRows = (
  data: string[][],
  requiredFields: InputObjectType[]
) => {
  const validRows: string[][] = [];
  const invalidRows: string[][] = [];

  const headers = data[0];

  data = data.slice(1, data.length - 1);
  let validData = true;
  data.forEach((row) => {
    if (validData && row.length !== headers.length) {
      row.unshift("Missing field(s)");
      validData = false;
    }
    row.forEach((field, index) => {
      if (validData && field.length === 0) {
        field = `Empty ${headers[index]}`;
      } else if (validData && headers[index] === "email") {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(field)) {
          row[index] = `Invalid email: ${field}`;
        }
      } else if (validData && requiredFields[index].id === "phone") {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(field)) {
          field = `Invalid phone: ${field}`;
        }
      } else if (validData && requiredFields[index].id === "id") {
        const idRegex = /^\d+$/;
        if (!idRegex.test(field)) {
          field = `Invalid id: ${field}`;
        }
      } else if (validData && requiredFields[index].id === "name") {
        const nameRegex = /^[a-zA-Z]+$/;
        if (!nameRegex.test(field)) {
          field = `Invalid name: ${field}`;
        }
      }
    });
    if (validData) {
      validRows.push(row);
    } else {
      invalidRows.push(row);
    }
  });
  return [validRows, invalidRows];
};
