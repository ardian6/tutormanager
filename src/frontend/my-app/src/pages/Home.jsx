import React from "react";
import "./Home.css";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Logo from "./TutorManagerLogo.png";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import HomeImage from "./HomeImage.jpeg";

const Home = () => {
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
    let path = `../login`;
    navigate(path);
  };

  // Redirect to Register page
  const registerRouteChange = () => {
    let path = `../register`;
    navigate(path);
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <img
          src={Logo}
          alt="TutorManagerLogo"
          width="140px"
          className="logo-container"
        />
        <div>Students Find The Best Tutors.</div>
        <div>Tutors Find The Best Students.</div>

        <ThemeProvider theme={theme}>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              style={{
                maxWidth: "200px",
                minWidth: "200px",
                minHeight: "30px",
              }}
              sx={{ borderRadius: "30px" }}
              onClick={loginRouteChange}
            >
              Login
            </Button>
          </Stack>
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              style={{
                maxWidth: "200px",
                minWidth: "200px",
                minHeight: "30px",
              }}
              sx={{ borderRadius: "30px" }}
              onClick={registerRouteChange}
            >
              Register
            </Button>
          </Stack>
        </ThemeProvider>
      </div>
      {/* <img src={HomeImage} alt="HomeImage" className="right-image" /> */}
    </div>
  );
};

export default Home;
