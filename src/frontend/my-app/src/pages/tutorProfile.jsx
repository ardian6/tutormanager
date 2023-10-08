import React from "react";
import "./Profile.css";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Logo from "./TutorManagerLogo.png";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NavBar from "../components/NavBar";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const TutorProfile = () => {
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "Sora",
        textTransform: "none",
      },
    },
  });

  return (
    <div>
        <NavBar></NavBar>
      Tutor
    </div>
  );
};

export default TutorProfile;
