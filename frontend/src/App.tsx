import React from "react";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import {
  About,
  Admin,
  Classes,
  Donate,
  Employers,
  Enroll,
  ErrorPage,
  Login,
  StudentCreation,
  StudentList,
  StudentView,
  InstructorCreation,
  InstructorList,
  InstructorView,
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
        <Route path="/enroll" element={<Enroll />} />
        <Route path="/partners" element={<Employers />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={isAuthenticated ? <Admin /> : <Login />}>
          <Route path="students" element={<StudentList />} />
          <Route path="students/:id" element={<StudentView />} />
          <Route path="create-student" element={<StudentCreation />} />
          <Route path="instructors" element={<InstructorList />} />
          <Route path="instructors/:id" element={<InstructorView />} />
          <Route path="create-instructor" element={<InstructorCreation />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
