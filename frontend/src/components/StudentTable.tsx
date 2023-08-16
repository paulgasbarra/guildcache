import React from 'react';

const StudentTable: React.FC = (students = [], handleDelete, ) => {
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