import React from "react";
import "./Profile.css";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Logo from "./TutorManagerLogo.png";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "Sora",
        textTransform: "none",
      },
    },
  });

  // Redirect to Login page
  let navigate = useNavigate();
  const loginRouteChange = () => {
    let path = `../Login`;
    navigate(path);
  };

  // Redirect to Register page
  const registerRouteChange = () => {
    let path = `../Register`;
    navigate(path);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={Logo}
          alt="TutorManagerLogo"
          width="140px"
          className="logo-container"
        />
      </div>
    </div>
  );
};

export default Profile;
