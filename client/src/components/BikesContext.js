import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BikesContext = createContext({});

const Context = ({ children }) => {
  const [bikes, setBikes] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("/bikes");
      setBikes(data);
    }
    fetchData();
  }, []);
  return (
    <BikesContext.Provider value={{ bikes, setBikes }}>
      {children}
    </BikesContext.Provider>
  );
};

export default Context;
