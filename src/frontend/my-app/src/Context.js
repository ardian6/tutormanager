import React from "react";

export const initialValue = {
  token: "",
  usernameGlobal: "",
  userTypeGlobal: "",
  
};

export const Context = React.createContext(initialValue);
export const useContext = React.useContext;
