import React from 'react';
import {axiosInstance, ENDPOINTS} from '../../api';
import {Student} from '../../types/Student';
import StudentForm from '../../components/StudentForm';

export function EditStudent(student: Student) {

  const handleSubmit = async (formData:Student) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.STUDENTS.LIST, formData);
      console.log('Student created:', response.data);
      // Handle success - maybe redirect or clear the form
    } catch (error) {
      console.error('Error creating student:', error);
      // Handle error - maybe display a notification
    }
  };

  return (
    <StudentForm onSubmit={handleSubmit} initialFormData={(student)}/>
  );
}