import React, { createContext, useEffect, useState } from "react";

export const PayloadContext = createContext({});

const Context = ({ children }) => {
  const [values, setValues] = useState({
    model: "",
    brand: "",
    year: "",
    filename: "",
    image_url: "",
    sitzx: 362,
    sitzy: 192,
    fussx: 343,
    fussy: 428,
    lenkerx: 677,
    lenkery: 116,
    // soziussitzx: 175,
    // soziussitzy: 120,
    // soziusfussx: 223,
    // soziusfussy: 308,
    soziussitzx: null,
    soziussitzy: null,
    soziusfussx: null,
    soziusfussy: null,
  });

  return (
    <PayloadContext.Provider value={{ values, setValues }}>
      {children}
    </PayloadContext.Provider>
  );
};

export default Context;
