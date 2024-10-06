import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  const userlogin = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8800/server/auth/login",
      inputs,
      {
        withCredentials: true,
      },
    );

    setcurrentUser(res.data);
  };

  const userlogout = () => {
    setcurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, userlogin, userlogout }}>
      {children}
    </AuthContext.Provider>
  );
};
