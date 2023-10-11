import React from "react";
import "./Register.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";

import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import ErrorIcon from "@mui/icons-material/Error";

import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { Context, useContext } from "../Context";

// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link } from "react-router-dom";

const Register = () => {
  const [alignment, setAlignment] = React.useState("Student");

  const { setters } = useContext(Context);
  const setToken = setters.setToken;
  const setEmailGlobal = setters.setEmailGlobal;
  const setUserTypeGlobal = setters.setUserTypeGlobal;

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [checkPwd, setCheckPwd] = React.useState("");
  const [userType, setUserType] = React.useState("student");
  const navigate = useNavigate();
  const registerBtn = async () => {
    const response = await fetch("http://localhost:5005/auth/register/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: pwd,
        userType: userType,
      }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else if (validEmail() && validPwd()) {
      setToken(data.token);
      setEmailGlobal(email);
      setUserTypeGlobal(userType);
      navigate("/Profile");
    }
  };

  const validEmail = () => {
    const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    return emailRegex.test(email);
  };

  const validPwd = () => {
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    //const pwdRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$");
    const pwdRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i);
    return pwd === checkPwd && pwd.length !== 0 && pwdRegex.test(pwd);
    //return pwd === checkPwd && pwd.length !== 0
  };

  const handleChange = (event, userType) => {
    console.log(event.target.value);
    setUserType(event.target.value);
    if (userType !== null) {
      setUserType(userType);
    }
  };

  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "Sora",
        textTransform: "none",
      },
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="RegisterContainer">
      {/* <ArrowBackIcon
        className="ArrowIcon"
        onClick={routeChange}
      ></ArrowBackIcon> */}

      <div className="RegisterCard">
        <div className="register-title">Sign Up</div>

        <ThemeProvider theme={theme}>
          <ToggleButtonGroup
            color="primary"
            value={userType}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton
              value="student"
              style={{
                maxWidth: "150px",
                minWidth: "150px",
                minHeight: "30px",
              }}
            >
              Student
            </ToggleButton>
            <ToggleButton
              value="tutor"
              style={{
                maxWidth: "150px",
                minWidth: "150px",
                minHeight: "30px",
              }}
            >
              Tutor
            </ToggleButton>
          </ToggleButtonGroup>
        </ThemeProvider>
        {/* Welcome! */}
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <div>
            <FormControl sx={{ m: 1, width: "360px" }} variant="standard">
              <ThemeProvider theme={theme}>
                <InputLabel htmlFor="standard-adornment-First-Name">
                  First Name*
                </InputLabel>
                <Input
                  id="standard-adornment-First-Name"
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton></IconButton>
                    </InputAdornment>
                  }
                />
              </ThemeProvider>
            </FormControl>
          </div>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <div>
            <FormControl sx={{ m: 1, width: "360px" }} variant="standard">
              <ThemeProvider theme={theme}>
                <InputLabel htmlFor="standard-adornment-Last-Name">
                  Last Name*
                </InputLabel>
                <Input
                  id="standard-adornment-Last-Name"
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton></IconButton>
                    </InputAdornment>
                  }
                />
              </ThemeProvider>
            </FormControl>
          </div>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <div>
            <FormControl sx={{ m: 1, width: "360px" }} variant="standard">
              <ThemeProvider theme={theme}>
                <InputLabel htmlFor="standard-adornment-email">
                  Email*
                </InputLabel>
                <Input
                  id="standard-adornment-email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        {validEmail() ? <></> : <ErrorIcon color="error" />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </ThemeProvider>
            </FormControl>
          </div>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <div>
            <FormControl sx={{ m: 1, width: "360px" }} variant="standard">
              <ThemeProvider theme={theme}>
                <InputLabel htmlFor="standard-adornment-Username">
                  Username*
                </InputLabel>
                <Input
                  id="standard-adornment-Username"
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        {validEmail() ? <></> : <ErrorIcon color="error" />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </ThemeProvider>
            </FormControl>
          </div>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <div>
            <ThemeProvider theme={theme}>
              <FormControl sx={{ m: 1, width: "360px" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Password*
                </InputLabel>

                <Input
                  id="standard-adornment-password"
                  onChange={(event) => {
                    setPwd(event.target.value);
                  }}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <>
                      <InputAdornment position="start">
                        <IconButton>
                          {validPwd() ? <></> : <ErrorIcon color="error" />}
                        </IconButton>
                      </InputAdornment>
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    </>
                  }
                />
              </FormControl>
            </ThemeProvider>
          </div>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <div>
            <ThemeProvider theme={theme}>
              <FormControl sx={{ m: 1, width: "360px" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-confirm-password">
                  Confirm Password*
                </InputLabel>

                <Input
                  // error
                  id="standard-adornment-confirm-password"
                  onChange={(event) => {
                    setCheckPwd(event.target.value);
                  }}
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <>
                      <InputAdornment position="start">
                        <IconButton>
                          {validPwd() ? <></> : <ErrorIcon color="error" />}
                        </IconButton>
                      </InputAdornment>
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    </>
                  }
                />
                {/* <FormHelperText error id="component-error-text">
                  Error
                </FormHelperText> */}
              </FormControl>
            </ThemeProvider>
          </div>
        </Box>
        <ThemeProvider theme={theme}>
          <Stack spacing={2} direction="row" className="register-button">
            <Button
              variant="contained"
              style={{
                maxWidth: "350px",
                minWidth: "350px",
                minHeight: "30px",
              }}
              sx={{ borderRadius: "30px" }}
              onClick={registerBtn}
            >
              Register
            </Button>
          </Stack>
        </ThemeProvider>
        <div className="redirect-to-login-container">
          Have an account?{" "}
          <Link to="../login">
            <span className="redirect-to-login-word">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
