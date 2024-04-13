import React from "react";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import {
  Admin,
  ErrorPage,
  Login,
  CohortCreation,
  CohortList,
  CohortView,
  CohortCSVUpload,
  StudentCreation,
  StudentList,
  StudentView,
  StudentCSVUpload,
  InstructorCreation,
  InstructorList,
  InstructorView,
  InstructorCSVUpload,
  DonorCreation,
  DonorList,
  DonorView,
  DonorCSVUpload,
  EmployerList,
  EmployerCreation,
  EmployerView,
  EmployerCSVUpload,
} from "./pages";
import { useAuth } from "./components/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={isAuthenticated ? <Admin /> : <Login />}>
          <Route path="cohorts" element={<CohortList />} />
          <Route path="cohorts/:id" element={<CohortView />} />
          <Route path="cohorts/create" element={<CohortCreation />} />
          <Route path="cohorts/upload" element={<CohortCSVUpload />} />
          <Route path="students" element={<StudentList />} />
          <Route path="students/:id" element={<StudentView />} />
          <Route path="students/create" element={<StudentCreation />} />
          <Route path="students/upload" element={<StudentCSVUpload />} />
          <Route path="instructors" element={<InstructorList />} />
          <Route path="instructors/:id" element={<InstructorView />} />
          <Route path="instructors/create" element={<InstructorCreation />} />
          <Route path="instructors/upload" element={<InstructorCSVUpload />} />
          <Route path="donors" element={<DonorList />} />
          <Route path="donors/:id" element={<DonorView />} />
          <Route path="donors/create" element={<DonorCreation />} />
          <Route path="donors/upload" element={<DonorCSVUpload />} />
          <Route path="employers" element={<EmployerList />} />
          <Route path="employers/:id" element={<EmployerView />} />
          <Route path="employers/create" element={<EmployerCreation />} />
          <Route path="employers/upload" element={<EmployerCSVUpload />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
