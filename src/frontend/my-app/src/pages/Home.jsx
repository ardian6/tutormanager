import React from "react";
import "./Home.css";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Logo from "./TutorManagerLogo.png";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "Sora",
        textTransform: "none",
      },
    },
  });

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
            <Link to="/login">
              <Button
                variant="contained"
                style={{
                  maxWidth: "200px",
                  minWidth: "200px",
                  minHeight: "30px",
                }}
                sx={{ borderRadius: "30px" }}
              >
                Login
              </Button>
            </Link>
          </Stack>
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <Stack spacing={2} direction="row">
            <Link to="/register">
              <Button
                variant="contained"
                style={{
                  maxWidth: "200px",
                  minWidth: "200px",
                  minHeight: "30px",
                }}
                sx={{ borderRadius: "30px" }}
              >
                Register
              </Button>
            </Link>
          </Stack>
        </ThemeProvider>
      </div>
      {/* <img src={HomeImage} alt="HomeImage" className="right-image" /> */}
    </div>
  );
};

export default Home;
