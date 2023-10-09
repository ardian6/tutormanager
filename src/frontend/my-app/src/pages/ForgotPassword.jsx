import React from "react";
import "./ForgotPassword.css";
import Box from "@mui/material/Box";

import Input from "@mui/material/Input";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { Link } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");

  return (
    <div className="ForgotPassword-container">
      <div className="ForgotPassword-card">
        <Link to="../login" className="back-icon-container">
          <ChevronLeftIcon className="back-icon"></ChevronLeftIcon>
        </Link>
        <div className="forgotpassword-title">Forgot Password</div>
        <div className="forgotpassword-description">
          Enter the email address associated with your account and one of our
          admins will assist with your password change.
        </div>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <div>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-email">Email*</InputLabel>
              <Input
                id="standard-adornment-email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </FormControl>
          </div>
        </Box>

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

        <div className="redirect-to-signup-page">
          Don't have an account? &#160;
          <Link to="../register">
            <span className="signup-word">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
