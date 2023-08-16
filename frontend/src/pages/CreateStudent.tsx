import React, { useState } from 'react';
import {axiosInstance, ENDPOINTS} from '../api';

export function CreateStudent() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    linkedin: '',
    resume_link: '',
    lca_cert: false,
    epa_608_cert: false,
    s_j_cert: false,
    class_site: '',
    class_number: '',
    class_date: ''
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
    <form onSubmit={handleSubmit} className="space-y-6 m-6">
    <div>
      <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="mt-1 p-2 w-full border rounded-md" />
    </div>
    <div>
        <label htmlFor="address" className="block text-gray-700 font-medium">Address</label>
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="mt-1 p-2 w-full border rounded-md" />
    </div>
    <div>
      <label htmlFor="phone" className="block text-gray-700 font-medium">Phone</label>
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="mt-1 p-2 w-full border rounded-md" />
    </div>
    <div>
      <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="mt-1 p-2 w-full border rounded-md" />
    </div>
    <div>
      <label htmlFor="linkedin" className="block text-gray-700 font-medium">LinkedIn</label>
      <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn" className="mt-1 p-2 w-full border rounded-md" />
    </div>
    <div>
      <label htmlFor="resume_link" className="block text-gray-700 font-medium">Resume Link</label>
      <input name="resume_link" value={formData.resume_link} onChange={handleChange} placeholder="Resume Link" className="mt-1 p-2 w-full border rounded-md" />
    </div>
    <div>
      <label className="flex items-center text-gray-700 font-medium">
        <input type="checkbox" name="lca_cert" checked={formData.lca_cert} onChange={handleChange} className="mr-2" /> 
        LCA Cert
      </label>
    </div>
    <div>
      <label className="flex items-center text-gray-700 font-medium">
        <input type="checkbox" name="epa_608_cert" checked={formData.epa_608_cert} onChange={handleChange} className="mr-2" /> 
        EPA 608 Cert
      </label>
    </div>
    <div>
      <label className="flex items-center text-gray-700 font-medium">
        <input type="checkbox" name="s_j_cert" checked={formData.s_j_cert} onChange={handleChange} className="mr-2" /> 
        S&J Cert
      </label>
    </div>
    <div>
      <input name="class_site" value={formData.class_site} onChange={handleChange} placeholder="Class Site" className="mt-1 p-2 w-full border rounded-md" />
    </div>
    <div>
      <label htmlFor="class_number" className="block text-gray-700 font-medium">Class Number</label>
      <input name="class_number" value={formData.class_number} onChange={handleChange} placeholder="Class Number" className="mt-1 p-2 w-full border rounded-md" />
    </div>
    <div>
      <label htmlFor="class_date" className="block text-gray-700 font-medium">Class Date</label>
      <input name="class_date" value={formData.class_date} onChange={handleChange} placeholder="Class Date (YYYY-MM-DD)" className="mt-1 p-2 w-full border rounded-md" />
    </div>
    <div>
      <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-60 w-full rounded-md p-2">
        Submit
      </button>
    </div>
</form>

  );
}


// link to form to create a student
// link to list of students with links to individual student pages
// link to form to update or delete a student