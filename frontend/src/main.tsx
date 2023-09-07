import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import {
  CreateStudent,
  Home,
  StudentView,
  StudentList,
  Donate,
  Employers,
  Enroll,
  ErrorPage,
  Classes,
  About,
  Merchandise,
  Newsletter,
  Contact,
  Admin,
  Partners,
} from "./pages";
import App from "./App";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home />, errorElement: <ErrorPage /> },
      { path: "/students", element: <StudentList /> },
      { path: "/employers", element: <Employers /> },
      { path: "/donate", element: <Donate /> },
      { path: "/classes", element: <Classes /> },
      { path: "/about", element: <About /> },
      { path: "/merchandise", element: <Merchandise /> },
      { path: "/newsletter", element: <Newsletter /> },
      { path: "/contact", element: <Contact /> },
      { path: "/admin", element: <Admin /> },
      { path: "create-student", element: <CreateStudent /> },
      { path: "student/:id", element: <StudentView /> },
      { path: "classes", element: <Classes /> },
      { path: "partners", element: <Partners /> },
      { path: "enroll", element: <Enroll /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
