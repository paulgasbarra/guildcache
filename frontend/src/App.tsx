import React from "react";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import {
  Admin,
  ErrorPage,
  Login,
  StudentCreation,
  StudentList,
  StudentView,
  StudentCSVUpload,
  InstructorCreation,
  InstructorList,
  InstructorView,
  DonorCreation,
  DonorList,
  DonorView,
  EmployerList,
  EmployerCreation,
  EmployerView,
} from "./pages";
import { useAuth } from "./components/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated", isAuthenticated);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={isAuthenticated ? <Admin /> : <Login />}>
          <Route path="students" element={<StudentList />} />
          <Route path="students/:id" element={<StudentView />} />
          <Route path="create-student" element={<StudentCreation />} />
          <Route path="upload-student-csv" element={<StudentCSVUpload />} />
          <Route path="instructors" element={<InstructorList />} />
          <Route path="instructors/:id" element={<InstructorView />} />
          <Route path="create-instructor" element={<InstructorCreation />} />
          <Route path="donors" element={<DonorList />} />
          <Route path="donors/:id" element={<DonorView />} />
          <Route path="create-donor" element={<DonorCreation />} />
          <Route path="employers" element={<EmployerList />} />
          <Route path="employers/:id" element={<EmployerView />} />
          <Route path="create-employer" element={<EmployerCreation />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
