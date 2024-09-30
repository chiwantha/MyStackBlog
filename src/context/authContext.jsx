import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  const userlogin = () => {
    setcurrentUser({
      id: 1,
      name: "Kasun Chiwantha",
      image: "kasun.jpg",
      state: 1,
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, userlogin }}>
      {children}
    </AuthContext.Provider>
  );
};
