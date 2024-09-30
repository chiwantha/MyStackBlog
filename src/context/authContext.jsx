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
      image: "profile.png",
      state: 1,
    });
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
