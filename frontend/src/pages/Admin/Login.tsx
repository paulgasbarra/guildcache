import React, { useState } from "react";
import { axiosInstance, ENDPOINTS } from "../../api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authenticate_login = async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.LOGIN, {
        username: username,
        password: password,
      });
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login form submitted", username, password);
    authenticate_login(username, password);
  };

  return (
    <div className="min-h-full flex items-center justify-center mt-16">
      <div className="bg-white p-8 rounded-lg border shadow-md w-96">
        <h2 className="text-2xl mb-6 text-center font-bold">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600 mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
