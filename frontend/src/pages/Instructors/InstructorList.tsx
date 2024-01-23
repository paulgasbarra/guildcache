import React, { useState, useEffect } from "react";
import { axiosInstance, ENDPOINTS } from "../../api";
import { Instructor } from "../../types/Instructor";
import ModelTable from "../../components/ModelTable";
import { useAuth } from "../../components/AuthContext";

export const InstructorList: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      axiosInstance
        .get(ENDPOINTS.INSTRUCTORS.LIST)
        .then((response) => {
          setInstructors(response.data);
        })
        .catch((error) => {
          console.error("Error fetching the instructors:", error);
        });
    }
  }, []);

  const handleDelete = async (id: string) => {
    await axiosInstance
      .delete(ENDPOINTS.INSTRUCTORS.DETAILS(id))
      .then(() => {
        setInstructors(
          instructors.filter((instructor) => instructor.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting the instructor:", error);
      });
  };

  return (
    <div className="space-y-6">
      {instructors.length === 0 && <p>No instructors found</p>}
      {instructors.length > 0 && (
        <ModelTable
          modelList={instructors}
          headers={["name", "email"]}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};
