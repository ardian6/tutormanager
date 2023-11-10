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
import { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");

  // const emailRef = useRef<HTMLInputElement>();
  // const nameRef = useRef<HTMLInputElement>();
  const [loading, setLoading] = useState(false);

  useEffect(() => emailjs.init("bwMCQLQ7fCEEWBECh"), []);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const serviceId = "service_ih839oy";
    const templateId = "template_ywhd0st";
    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, {
        // name: nameRef.current.value,
        recipient: email,
      });

      alert("email successfully sent check inbox");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
            onClick={(event) => {
              handleSubmit(email);
            }}
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
