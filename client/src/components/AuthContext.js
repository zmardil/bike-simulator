import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

const Context = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const getAuth = async () => {
      try {
        await axios.get("/auth");
        setIsAuthenticated(true);
        console.log("some");
      } catch (e) {
        setIsAuthenticated(false);
        console.log(e);
      }
    };
    getAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Context;
