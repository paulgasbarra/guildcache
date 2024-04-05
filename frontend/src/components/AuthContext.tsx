import React, { createContext, ReactNode, useContext, useState } from "react";
import { AuthContextType } from "../types/AuthContext";

const defaultContext: AuthContextType = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  organization: "",
  user: "",
};

export const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => {
  return useContext(AuthContext);
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access_token")
  );
  const [user, setUser] = useState("");
  const [organization, setOrganization] = useState("");

  const login = (
    token: string,
    user: { name: string; organization: string }
  ) => {
    const { name, organization } = user;
    localStorage.setItem("access_token", token);
    setIsAuthenticated(true);
    setUser(name);
    setOrganization(organization);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    setUser("");
    setOrganization("");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, organization, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
