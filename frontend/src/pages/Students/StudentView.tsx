import React, { useState, useEffect } from "react";
import { ModelFieldDisplay } from "../../components/ModelFieldDisplay";
import { axiosInstance, ENDPOINTS } from "../../api";
import { ModelFieldInput } from "../../components/ModelFieldInput";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";
import { Cohort } from "../../types/Cohort";
import { StudentFormFields } from "../../formFields/StudentFormFields";
import NotesField from "../../components/NotesField/NotesField";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";

export const StudentView = () => {
  const [isEditing, setIsEditing] = useState(false);
  // massage these two types into obedience. THey should be Student and Cohort
  const [formData, setFormData] = useState({} as any);
  const [cohorts, setCohorts] = useState([] as any);
  const [modalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const studentId = window.location.pathname.split("/")[3];

  const fetchStudent = async () => {
    try {
      const response = await axiosInstance.get(
        ENDPOINTS.STUDENTS.DETAILS(studentId)
      );
      console.log(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching student:", error);
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
    fetchStudent();
    fetchCohorts();
  }, []);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      fetchStudent();
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
    fetchStudent();
  };

  const getCohort = (id: number) => {
    return cohorts.find((cohort: Cohort) => cohort.id === id).name;
  };

  const submitEdit = async () => {
    try {
      await axiosInstance.put(ENDPOINTS.STUDENTS.DETAILS(studentId), formData);
      setModalOpen(true);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating student:", error);
      // Handle error - maybe display a notification
    }
  };

  useEffect(() => {
    if (notes.length > 0) {
      submitEdit();
    }
  }, [notes]);

  const updateNote = async (note: string) => {
    setFormData({ ...formData, notes: note });
    setNotes(note);
  };

  // use a map to render the fields, may require a model update to include a field type and a field label
  return (
    <div className="flex flex-col">
      <Link
        to="/admin/students"
        className="bg-gray-800 text-white w100 hover:underline w-full p-2"
      >
        Back to Students
      </Link>
      {isEditing ? (
        <>
          <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg">
            {StudentFormFields &&
              StudentFormFields.map((field) => (
                <ModelFieldInput
                  key={field.id}
                  labelName={field.label}
                  name={field.id}
                  type={field.type}
                  value={formData[field.id]}
                  onChange={onChange}
                />
              ))}
            <ModelFieldInput
              labelName="Cohort"
              name="Cohort"
              value={null}
              onChange={onChange}
              type="select"
              options={cohorts}
            />
          </div>
          <div className="p-4 flex gap-4 ">
            <SecondaryButton onClick={cancelEditing}>
              Cancel Edit
            </SecondaryButton>
            <PrimaryButton onClick={submitEdit}>Submit</PrimaryButton>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg">
            {" "}
            {StudentFormFields &&
              StudentFormFields.map((field) => {
                if (field.id === "notes") return null;
                return (
                  <ModelFieldDisplay
                    key={field.id}
                    name={field.label}
                    value={formData[field.id]}
                  />
                );
              })}
            <ModelFieldDisplay
              name="Cohort"
              value={
                formData.cohort && cohorts.length > 0
                  ? getCohort(formData.cohort)
                  : "None set"
              }
            />
          </div>
          <div className="flex flex-col gap-4 pl-4 pr-4 bg-white rounded-lg">
            <NotesField notes={formData.notes} updateNote={updateNote} />
            <PrimaryButton onClick={toggleEditing}>Edit</PrimaryButton>
          </div>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            Student Updated
          </Modal>
        </>
      )}
    </div>
  );
};
