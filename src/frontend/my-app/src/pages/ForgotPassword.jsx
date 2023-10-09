import React from "react";
import "./ForgotPassword.css";
import Box from "@mui/material/Box";

import Input from "@mui/material/Input";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ForgotPassword = () => {
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "Sora",
        textTransform: "none",
      },
    },
  });

  const [email, setEmail] = React.useState("");

  // Redirect to Register page
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
    <div className="ForgotPassword-container">
      <div className="ForgotPassword-card">
        <ArrowBackIcon
          className="back-icon"
          onClick={loginRouteChange}
        ></ArrowBackIcon>
        <div className="forgotpassword-title">Forgot Password</div>
        <div className="forgotpassword-description">
          Enter the email address associated with your account and one of our
          admins will assist with your password change.
        </div>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <div>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <ThemeProvider theme={theme}>
                <InputLabel htmlFor="standard-adornment-email">
                  Email*
                </InputLabel>
                <Input
                  id="standard-adornment-email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </ThemeProvider>
            </FormControl>
          </div>
        </Box>
        <ThemeProvider theme={theme}>
          <Stack spacing={2} direction="row" className="continue-button">
            <Button
              variant="contained"
              style={{
                maxWidth: "300px",
                minWidth: "300px",
                minHeight: "30px",
              }}
              sx={{ borderRadius: "30px" }}
              //   onClick={continueBtn}
            >
              Continue
            </Button>
          </Stack>
        </ThemeProvider>

        <div className="redirect-to-signup-page">
          Don't have an account? &#160;
          <span className="signup-word" onClick={registerRouteChange}>
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
