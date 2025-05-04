import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const KEY = "app_user"; // sessionStorage

export function AuthProvider({ children }) {
  const stored = JSON.parse(sessionStorage.getItem(KEY) || "null");
  const [user, setUser] = useState(stored);

  // login, switch user or admin
  // hard code
  const quickLogin = (role) => {
    const u = {
      email:
        role === "admin"
          ? "admin@brrmedia.co.uk"
          : "eden.clarke@brrmedia.co.uk",
      isAdmin: role === "admin",
    };
    sessionStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
  };

  //logout
  const logout = () => {
    sessionStorage.removeItem(KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, quickLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
