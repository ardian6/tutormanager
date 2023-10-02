import "./App.css";
import Site from "./components/Site";
import { Context } from "./Context.js";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [token, setToken] = React.useState("");
  const [emailGlobal, setEmailGlobal] = React.useState("");
  const getters = { token, emailGlobal };
  const setters = { setToken, setEmailGlobal };

  return (
    <Context.Provider value={{ getters, setters }}>
      <Router>
        <Site></Site>
      </Router>
    </Context.Provider>
  );
}

export default App;
