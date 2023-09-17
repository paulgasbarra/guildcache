import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import AuthProvider, { useAuth } from "./components/AuthContext";
import "./index.css";
import {
  Home,
  StudentCreation,
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
  Login,
} from "./pages";
import App from "./App";

const router = (isAuthenticated = false) => {
  return createBrowserRouter([
    {
      element: <App />,
      children: [
        { path: "/", element: <Home />, errorElement: <ErrorPage /> },
        { path: "/employers", element: <Employers /> },
        { path: "/donate", element: <Donate /> },
        { path: "/classes", element: <Classes /> },
        { path: "/about", element: <About /> },
        { path: "/merchandise", element: <Merchandise /> },
        { path: "/newsletter", element: <Newsletter /> },
        { path: "/contact", element: <Contact /> },
        { path: "/enroll", element: <Enroll /> },
        { path: "/login", element: <Login /> },
        // Protected Routes
        { path: "/admin", element: isAuthenticated ? <Admin /> : <Login /> },
        {
          path: "/create-student",
          element: isAuthenticated ? (
            <StudentCreation />
          ) : (
            <Navigate to="/admin" />
          ),
        },
        {
          path: "/students",
          element: isAuthenticated ? <StudentList /> : <Navigate to="/admin" />,
        },
        {
          path: "/student/:id",
          element: isAuthenticated ? <StudentView /> : <Navigate to="/admin" />,
        },
        { path: "/partners", element: <Partners />,
},
      ],
    },
  ]);
};

const Router: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return <RouterProvider router={router(isAuthenticated)} />;
};

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>
);
