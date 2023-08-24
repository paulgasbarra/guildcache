import React from 'react';
import { Student } from '../types/Student';
import { Link } from 'react-router-dom';

interface StudentTableProps {
    students: Student[];
    handleDelete: (id: string) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({students, handleDelete}) => {
    return(
        <table className="min-w-full divide-y divide-gray-200 shadow-md bg-white rounded-lg">
    <thead className="bg-gray-800">
        <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
        </tr>
    </thead>
    <tbody className="divide-y divide-gray-300">
        {students.map(student => (
           <tr key={student.id} className="hover:bg-gray-100">
           <td className="px-6 py-4 whitespace-nowrap">
               <Link to={`/student/${student.id}`} className="block hover:underline">
                   {student.name}
               </Link>
           </td>
           <td className="px-6 py-4 whitespace-nowrap">
               <Link to={`/student/${student.id}`} className="block hover:underline">
                   {student.email}
               </Link>
           </td>
           <td className="px-6 py-4 whitespace-nowrap">
               <button 
                   onClick={() => handleDelete(student.id)}
                   className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out px-2 py-1 rounded border border-red-600"
               >
                   Delete
               </button>
           </td>
       </tr>
       
        ))}
    </tbody>
</table>
)
};

export default StudentTable;