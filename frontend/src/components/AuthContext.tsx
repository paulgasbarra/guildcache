import React, { createContext, ReactNode, useContext, useState } from "react";
import { AuthContextType } from "../types/AuthContext";

const defaultContext: AuthContextType = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  organization: "",
  organizationId: "-1",
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
  const [organization, setOrganization] = useState(
    localStorage.getItem("organization") || ""
  );
  const [organizationId, setOrganizationId] = useState(
    localStorage.getItem("organization_id") || "-1"
  );

  const login = (
    token: string,
    user: { name: string; organization: { name: string; id: string } }
  ) => {
    const { name, organization } = user;
    localStorage.setItem("access_token", token);
    localStorage.setItem("organization", JSON.stringify(organization.name));
    localStorage.setItem("organization_id", organization.id.toString());
    setIsAuthenticated(true);
    setUser(name);
    setOrganization(organization.name);
    setOrganizationId(organization.id);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    setUser("");
    setOrganization("");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        organization,
        organizationId,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
