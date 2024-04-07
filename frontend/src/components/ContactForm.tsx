import React from "react";
import { EntityCreationForm } from "./EntityCreationForm";
import { ENDPOINTS } from "../api";
import { ContactFormFields } from "../formFields/ContactFormFields";

const ContactForm: React.FC = ({}) => {
  return (
    <EntityCreationForm
      formTitle="Create - Contact"
      postEndpoint={ENDPOINTS.CONTACTS.CREATE}
      formFields={ContactFormFields}
      backLink={`/admin/{group}/{groupId}`}
      successMessage="Contact created"
    />
  );
};

export default ContactForm;
