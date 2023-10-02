import React from "react";

export const initialValue = {
  token: "",
  usernameGlobal: "",
};

export const Context = React.createContext(initialValue);
export const useContext = React.useContext;
