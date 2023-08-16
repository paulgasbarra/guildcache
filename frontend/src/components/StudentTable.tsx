import React from 'react';
import { Student } from '../types/Student';
import { Link } from 'react-router-dom';

interface StudentTableProps {
    students: Student[];
    handleDelete: (id: string) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({students, handleDelete}) => {
    return(
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
    </table>)
};

export default StudentTable;