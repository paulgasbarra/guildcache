import React, { useState, useEffect } from "react";
import { ModelFieldDisplay } from "../../components/ModelFieldDisplay";
import { axiosInstance, ENDPOINTS } from "../../api";
import { ModelFieldInput } from "../../components/ModelFieldInput";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";
import { InstructorFormFields } from "../../formFields/InstructorFormFields";
import CheckboxGroupInput from "../../components/CheckboxGroupInput";
import { Cohort } from "../../types/Cohort";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";

export const InstructorView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({} as any);
  const [modalOpen, setModalOpen] = useState(false);
  const instructorId = window.location.pathname.split("/")[3];
  const [cohorts, setCohorts] = useState([] as any);

  const fetchInstructor = async () => {
    try {
      const response = await axiosInstance.get(
        ENDPOINTS.INSTRUCTORS.DETAILS(instructorId)
      );
      console.log(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching instructor:", error);
    }
  };

  const fetchCohorts = async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.COHORTS.LIST);
      setCohorts(response.data);
    } catch (error) {
      console.error("Error fetching cohorts:", error);
    }
  };

  useEffect(() => {
    fetchInstructor();
    fetchCohorts();
  }, []);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      fetchInstructor();
    }
  };

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cancelEditing = () => {
    setIsEditing(false);
    fetchInstructor();
  };

  const submitEdit = async () => {
    try {
      await axiosInstance.put(
        ENDPOINTS.INSTRUCTORS.DETAILS(instructorId),
        formData
      );
      setModalOpen(true);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating instructor:", error);
      // Handle error - maybe display a notification
    }
  };

  return (
    <div className="flex flex-col">
      <Link
        to="/admin/instructors"
        className="bg-gray-800 text-white w100 hover:underline w-full p-2"
      >
        Back to Instructors
      </Link>
      {isEditing ? (
        <>
          <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg">
            {InstructorFormFields &&
              InstructorFormFields.map((field) => (
                <ModelFieldInput
                  key={field.id}
                  labelName={field.label}
                  name={field.id}
                  value={formData[field.id]}
                  onChange={onChange}
                />
              ))}
            {formData.cohorts && (
              <CheckboxGroupInput
                id="cohorts"
                label="Cohorts"
                error={[]}
                handleChange={onChange}
                value={formData.cohorts}
                options={cohorts.map((cohort: Cohort) => ({
                  value: cohort.id,
                  label: cohort.name,
                  selected: formData.cohorts.includes(cohort.id),
                }))}
              />
            )}
          </div>
          <div className="flex gap-4 p-4">
            <SecondaryButton onClick={cancelEditing}>
              Cancel Edit
            </SecondaryButton>
            <PrimaryButton onClick={submitEdit}>Submit</PrimaryButton>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg">
            {InstructorFormFields &&
              InstructorFormFields.map((field) => (
                <ModelFieldDisplay
                  key={field.id}
                  name={field.label}
                  value={formData[field.id]}
                />
              ))}
            {formData.cohorts && (
              <ModelFieldDisplay
                name="Cohorts"
                value={formData.cohorts.map((c: number) => {
                  const cohort = cohorts.find(
                    (cohort: Cohort) => cohort.id === c
                  );
                  return { name: cohort?.name, value: cohort?.id };
                })}
              />
            )}
            <PrimaryButton onClick={toggleEditing}>Edit</PrimaryButton>
          </div>

          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            Instructor Updated
          </Modal>
        </>
      )}
    </div>
  );
};
