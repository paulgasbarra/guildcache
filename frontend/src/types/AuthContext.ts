export type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string, user: { name: string; organization: string }) => void;
  logout: () => void;
  organization: string;
  user: string;
};
