import React, { useState, useEffect } from "react";
import { ModelFieldDisplay } from "../../components/ModelFieldDisplay";
import { axiosInstance, ENDPOINTS } from "../../api";
import { ModelFieldInput } from "../../components/ModelFieldInput";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";
import { InstructorFormFields } from "./InstructorFormFields";
import CheckboxGroupInput from "../../components/CheckboxGroupInput";
import { Cohort } from "../../types/Cohort";

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

      const fetchedCohorts = await fetchCohorts();
      setCohorts(fetchedCohorts);
      const enrichedFormData = {
        ...response.data,
        cohorts: response.data.cohorts?.map((id: number) =>
          fetchedCohorts.find((cohort: Cohort) => cohort.id === id)
        ),
      };
      setFormData(enrichedFormData);
    } catch (error) {
      console.error("Error fetching instructor:", error);
    }
  };

  const fetchCohorts = async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.COHORTS.LIST);
      return response.data;
    } catch (error) {
      console.error("Error fetching cohorts:", error);
    }
  };

  useEffect(() => {
    fetchInstructor();
  }, []);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      fetchInstructor();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "checkbox") {
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
    console.log("submitting edit", formData);
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

  // use a map to render the fields, may require a model update to include a field type and a field label
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
              // sync the instructor's current cohorts with the checkboxes
              <CheckboxGroupInput
                id="cohorts"
                label="Cohorts"
                error={[]}
                handleChange={onChange}
                options={cohorts.map((cohort: any) => ({
                  value: cohort.id,
                  label: cohort.name,
                  selected:
                    formData.cohorts.find((c: Cohort) => c.id === cohort.id) !==
                    undefined,
                }))}
              />
            )}
          </div>
          <button
            onClick={cancelEditing}
            className="text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-60 w-full rounded-md p-2"
          >
            Cancel Edit
          </button>
          <button
            onClick={submitEdit}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-60 w-full rounded-md p-2"
          >
            Submit
          </button>
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
              <ModelFieldDisplay name="Cohorts" value={formData.cohorts} />
            )}
          </div>
          <button
            onClick={toggleEditing}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-60 w-full rounded-md p-2"
          >
            Edit
          </button>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            Instructor Updated
          </Modal>
        </>
      )}
    </div>
  );
};
