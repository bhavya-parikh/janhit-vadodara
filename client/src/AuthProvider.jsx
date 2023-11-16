import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext({
  auth: null,
  setAuth: () => {
    try {
      const token = localStorage.getItem("token");
      const decodedData = jwtDecode(token);
      if (decodedData.id) return true;
    } catch (err) {
      return {};
    }
  },
  user: null,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedData = jwtDecode(token);

        setUser(decodedData.id);
      } catch (error) {
        setUser(null);
      }
    };

    isAuth();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
