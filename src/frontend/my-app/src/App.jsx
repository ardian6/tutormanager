import "./App.css";
import Site from "./components/Site";
import { Context } from "./Context.js";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "Sora",
        textTransform: "none",
        // fontSize: "14px",
      },
    },
  });

  const [token, setToken] = React.useState("");
  const [emailGlobal, setEmailGlobal] = React.useState("");
  const [userTypeGlobal, setUserTypeGlobal] = React.useState("");
  const getters = { token, emailGlobal, userTypeGlobal };
  const setters = { setToken, setEmailGlobal, setUserTypeGlobal };

  return (
    <div className="app-container">
      <ThemeProvider theme={theme}>
        <Context.Provider value={{ getters, setters }}>
          <Router>
            <Site></Site>
          </Router>
        </Context.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
