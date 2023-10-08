import React from "react";
import "./Login.css";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Logo from "./TutorManagerLogo.png";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
import { useNavigate } from "react-router-dom";

const Login = () => {
  // const [alignment, setAlignment] = React.useState("Student");

  // const handleChange = (event, newAlignment) => {
  //   setAlignment(newAlignment);
  // };

  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');


  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "Sora",
        textTransform: "none",
      },
    },
  });

  // Redirect to Register page
  let navigate = useNavigate();
  const registerRouteChange = () => {
    let path = `../Register`;
    navigate(path);
  };

  // Redirect to Home page
  const homeRouteChange = () => {
    let path = `../Home`;
    navigate(path);
  };

  // Login Button - calls backend API
  const loginBtn = async () => {
    console.log(email);
    console.log(pwd);
    const response = await fetch('http://localhost:5005/user/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
      })
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      // setToken(data.token);
      // setEmailGlobal(email);
    }
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img
          src={Logo}
          alt="TutorManagerLogo"
          width="140px"
          className="logo-container"
          onClick={homeRouteChange}
        />

        {/* <ThemeProvider theme={theme}>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="Student">Student</ToggleButton>
            <ToggleButton value="Tutor">Tutor</ToggleButton>
            <ToggleButton value="Admin">Admin</ToggleButton>
          </ToggleButtonGroup>
        </ThemeProvider> */}
        {/* Welcome! */}
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <div>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard" >
              <ThemeProvider theme={theme}>
                <InputLabel htmlFor="standard-adornment-email" >
                  Email
                </InputLabel>
                <Input id="standard-adornment-email" onChange={(event) => { setEmail(event.target.value); }}/>
              </ThemeProvider>
            </FormControl>
          </div>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <div>
            <ThemeProvider theme={theme}>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="standard" >
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>

                <Input
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={(event) => { setPwd(event.target.value); }}
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
            </ThemeProvider>
          </div>
        </Box>
        <ThemeProvider theme={theme}>
          <Stack spacing={2} direction="row" className="login-button">
            <Button
              variant="contained"
              style={{
                maxWidth: "200px",
                minWidth: "200px",
                minHeight: "30px",
              }}
              sx={{ borderRadius: "30px" }}
              onClick={loginBtn}
            >
              Login
            </Button>
          </Stack>
        </ThemeProvider>
        <div className="redirect-to-signup-container">
          Don't have an account? &#160;
          <span className="signup-word" onClick={registerRouteChange}>
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
