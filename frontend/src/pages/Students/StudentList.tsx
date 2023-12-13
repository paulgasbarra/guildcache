import React, { useState, useEffect } from "react";
import { axiosInstance, ENDPOINTS } from "../../api";
import { Student } from "../../types/Student";
import StudentTable from "../../components/StudentTable";
import ModelTable from "../../components/ModelTable";
import { useAuth } from "../../components/AuthContext";

export const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      axiosInstance
        .get(ENDPOINTS.STUDENTS.LIST)
        .then((response) => {
          setStudents(response.data);
        })
        .catch((error) => {
          console.error("Error fetching the students:", error);
        });
    }
  }, []);

  const handleDelete = async (id: string) => {
    await axiosInstance
      .delete(ENDPOINTS.STUDENTS.DETAILS(id))
      .then(() => {
        setStudents(students.filter((student) => student.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting the student:", error);
      });
  };

  return (
    <div className="space-y-6">
      {students.length === 0 && <p>No students found</p>}
      {students.length > 0 && (
        <ModelTable
          modelList={students}
          headers={["name", "email"]}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};
