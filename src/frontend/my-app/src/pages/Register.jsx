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

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [alignment, setAlignment] = React.useState("Student");

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
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

  let navigate = useNavigate();
  const redirectLoginRouteChange = () => {
    let path = `../Login`;
    navigate(path);
  };

  // Redirect to Login page
  // let navigate = useNavigate();
  // const routeChange = () => {
  //   let path = `../Login`;
  //   navigate(path);
  // };
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
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton
              value="Student"
              style={{
                maxWidth: "150px",
                minWidth: "150px",
                minHeight: "30px",
              }}
            >
              Student
            </ToggleButton>
            <ToggleButton
              value="Tutor"
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
                  First Name
                </InputLabel>
                <Input
                  id="standard-adornment-First-Name"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                      >
                        {showConfirmPassword ? (
                          <></>
                        ) : (
                          <ErrorIcon color="error" />
                        )}
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
                <InputLabel htmlFor="standard-adornment-Last-Name">
                  Last Name
                </InputLabel>
                <Input
                  id="standard-adornment-Last-Name"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                      >
                        {showConfirmPassword ? (
                          <></>
                        ) : (
                          <ErrorIcon color="error" />
                        )}
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
                <InputLabel htmlFor="standard-adornment-email">
                  Email
                </InputLabel>
                <Input
                  id="standard-adornment-email"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                      >
                        {showConfirmPassword ? (
                          <></>
                        ) : (
                          <ErrorIcon color="error" />
                        )}
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
                  Username
                </InputLabel>
                <Input
                  id="standard-adornment-Username"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                      >
                        {showConfirmPassword ? (
                          <></>
                        ) : (
                          <ErrorIcon color="error" />
                        )}
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
                  Password
                </InputLabel>

                <Input
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <>
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                        >
                          {showConfirmPassword ? (
                            <></>
                          ) : (
                            <ErrorIcon color="error" />
                          )}
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
                  Confirm Password
                </InputLabel>

                <Input
                  // error
                  id="standard-adornment-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <>
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                        >
                          {showConfirmPassword ? (
                            <></>
                          ) : (
                            <ErrorIcon color="error" />
                          )}
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
                maxWidth: "200px",
                minWidth: "200px",
                minHeight: "30px",
              }}
              sx={{ borderRadius: "30px" }}
            >
              Register
            </Button>
          </Stack>
        </ThemeProvider>
        <div className="redirect-to-login-container">
          Have an account?{" "}
          <span
            className="redirect-to-login-word"
            onClick={redirectLoginRouteChange}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
