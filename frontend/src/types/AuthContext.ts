export type AuthContextType = {
  isAuthenticated: boolean;
  login: (
    token: string,
    user: { name: string; organization: { name: string; id: string } }
  ) => void;
  logout: () => void;
  organization: string;
  organizationId: string;
  user: string;
};
