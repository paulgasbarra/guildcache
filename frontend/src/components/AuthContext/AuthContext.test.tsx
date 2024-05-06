import React from "react";
import { render, act } from "@testing-library/react";
import AuthProvider, { useAuth } from "./AuthContext";

// Helper component to access the auth context
const ConsumerComponent = () => {
  const auth = useAuth();
  return (
    <div>
      <div data-testid="isAuthenticated">{auth.isAuthenticated.toString()}</div>
      <div data-testid="user">{auth.user}</div>
      <div data-testid="organization">{auth.organization}</div>
      <div data-testid="organizationId">{auth.organizationId}</div>
    </div>
  );
};

describe("AuthProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("updates context on login", () => {
    const { getByTestId } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    act(() => {
      const authContext = useAuth();
      authContext.login("token", {
        name: "John Doe",
        organization: { name: "Tech Corp", id: "123" },
      });
    });

    expect(getByTestId("isAuthenticated").textContent).toBe("true");
    expect(getByTestId("user").textContent).toBe("John Doe");
    expect(getByTestId("organization").textContent).toBe("Tech Corp");
    expect(getByTestId("organizationId").textContent).toBe("123");
  });

  it("clears context on logout", () => {
    const { getByTestId } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    act(() => {
      const authContext = useAuth();
      authContext.logout();
    });

    expect(getByTestId("isAuthenticated").textContent).toBe("false");
    expect(getByTestId("user").textContent).toBe("");
    expect(getByTestId("organization").textContent).toBe("");
    expect(getByTestId("organizationId").textContent).toBe("-1");
  });
});
