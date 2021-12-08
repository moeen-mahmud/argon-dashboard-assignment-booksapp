import useFirebase from "hooks/useFirebase";
import React, { createContext } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const allContext = useFirebase(); // Setting the hook as a provider value
  return (
    <AuthContext.Provider value={allContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
