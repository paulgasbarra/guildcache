import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance, ENDPOINTS } from '../api';
import { Student } from '../types/Student';
import StudentTable from '../components/StudentTable';

export const Students: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        axiosInstance.get(ENDPOINTS.STUDENTS.LIST)
        .then(response => {
            setStudents(response.data);
        })
        .catch(error => {
            console.error("Error fetching the students:", error);
        });
    }, []);

    const handleDelete = async (id:string) => {
        console.log(ENDPOINTS.STUDENTS.DETAILS(id));
        await axiosInstance.delete(ENDPOINTS.STUDENTS.DETAILS(id))
            .then(() => {
                setStudents(students.filter(student => student.id !== id));
            })
            .catch(error => {
                console.error("Error deleting the student:", error);
            });
    }

    return (
        <div className="space-y-6 m-6">
            <Link to="/create-student">Create Student</Link>
            {students.length === 0 && <p>No students found</p>}
            {students.length > 0 && <StudentTable students={students} handleDelete={handleDelete} />}
        </div>
    );
}
