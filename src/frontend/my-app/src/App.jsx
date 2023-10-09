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
        fontSize: 11,
      },
    },
  });

  const [token, setToken] = React.useState("");
  const [emailGlobal, setEmailGlobal] = React.useState("");
  const getters = { token, emailGlobal };
  const setters = { setToken, setEmailGlobal };

  return (
    <ThemeProvider theme={theme}>
      <Context.Provider value={{ getters, setters }}>
        <Router>
          <Site></Site>
        </Router>
      </Context.Provider>
    </ThemeProvider>
  );
}

export default App;
