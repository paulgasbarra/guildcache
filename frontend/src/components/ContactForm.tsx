import React, { useState } from "react";
import { EntityCreationForm } from "./EntityCreationForm";

interface ContactFormProps {
  incomingFormData?: {
    id?: number;
    name: string;
    phone: string;
    email: string;
    is_primary: boolean;
  };
}

const ContactForm: React.FC<ContactFormProps> = () => {
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
