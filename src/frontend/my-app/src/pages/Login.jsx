import React from "react";
import "./Login.css";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Logo from "./TutorManagerLogo.png";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context, useContext } from "../Context";

const Login = () => {
  // const [alignment, setAlignment] = React.useState("Student");

  // const handleChange = (event, newAlignment) => {
  //   setAlignment(newAlignment);
  // };

  const [username, setUsername] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const { setters } = useContext(Context);
  const setToken = setters.setToken;
  const setEmailGlobal = setters.setEmailGlobal;
  const setUserTypeGlobal = setters.setUserTypeGlobal;
  const navigate = useNavigate();

  // Login Button - calls backend API
  const loginBtn = async () => {
    if (username.length === 0 || pwd.length === 0) {
      alert('Ensure username and email is valid');
      return
    }
    const response = await fetch("http://localhost:5005/auth/login/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: pwd,
      }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setToken(data.token);
      setEmailGlobal(data.email);
      setUserTypeGlobal(data.userType);     
      navigate("/Profile");
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Link to="../home">
          <img
            src={Logo}
            alt="TutorManagerLogo"
            width="140px"
            className="logo-container"
          />
        </Link>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <div>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-email">Username</InputLabel>
              <Input
                id="standard-adornment-email"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </FormControl>
          </div>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <div>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>

              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(event) => {
                  setPwd(event.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        </Box>

        <Link to="forgotpassword">
          <div className="forgot-password-word">Forgot Password?</div>
        </Link>

        <Stack spacing={2} direction="row" className="login-button">
          <Button
            variant="contained"
            style={{
              maxWidth: "300px",
              minWidth: "300px",
              minHeight: "30px",
            }}
            sx={{ borderRadius: "30px" }}
            onClick={loginBtn}
          >
            Login
          </Button>
        </Stack>
        <div className="redirect-to-signup-container">
          Don't have an account? &#160;
          <Link to="/register">
            <span className="signup-word">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
