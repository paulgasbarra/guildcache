import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance, ENDPOINTS } from '../api';

export const Students: React.FC = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axiosInstance.get(ENDPOINTS.STUDENTS.LIST)
        .then(response => {
            setStudents(response.data);
        })
        .catch(error => {
            console.error("Error fetching the students:", error);
        });
    }, []);

    const handleDelete = (id:string) => {
        axiosInstance.delete(ENDPOINTS.STUDENTS.DETAILS(id))
            .then(() => {
                setStudents(students.filter(student => student.id !== id));
            })
            .catch(error => {
                console.error("Error deleting the student:", error);
            });
    }

    return (
        <div>
            <Link to="/create-student">Create Student</Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>
                                <Link to={`/edit/${student.id}`}>Edit</Link>
                                <button onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
