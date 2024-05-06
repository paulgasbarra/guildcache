import React, { createContext, useContext } from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

const mockDefautContext = {
  isAuthenticated: false,
  organization: "",
};

const MockContext = createContext(mockDefautContext);

vi.mock("./AuthContext", () => ({
  useAuth: vi.fn().mockImplementation(() => {
    console.log("useAuth mock called");
    return useContext(MockContext);
  }),
}));

const renderNavbar = (isAuthenticated: boolean, organization: string) => {
  render(
    <BrowserRouter>
      <MockContext.Provider value={{ isAuthenticated, organization }}>
        <Navbar />
      </MockContext.Provider>
    </BrowserRouter>
  );
};

describe("Navbar Component", () => {
  it("renders sign in and sign up links when not authenticated", () => {
    renderNavbar(false, "");
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("renders sign out link and organization name when authenticated", () => {
    renderNavbar(true, "Example Corp");
    expect(screen.getByText("Sign Out")).toBeInTheDocument();
    expect(screen.getByText("Example Corp")).toBeInTheDocument();
  });
});
