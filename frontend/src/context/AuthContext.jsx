import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const userInfo = localStorage.getItem("user");
    if (
      storedToken &&
      userInfo &&
      userInfo !== "undefined" &&
      userInfo !== "null"
    ) {
      try {
        const parsedUser = JSON.parse(userInfo);
        setToken(storedToken)
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user info from localStorage:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null)
      }
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null)
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
