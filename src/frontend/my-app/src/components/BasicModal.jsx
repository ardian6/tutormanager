import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import ErrorIcon from "@mui/icons-material/Error";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";  
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import { Context, useContext } from "../Context";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Sora",
      textTransform: "none",
    },
  },
});

const BasicModal = ({emailState, bioState, cityState}) => {
  const { getters } = useContext(Context);
  const username = getters.usernameGlobal;
  const token = getters.token;

  const validEmail = () => {
    const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    return emailRegex.test(editEmail);
  };

  const validPwd = () => {
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    //const pwdRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$");
    const pwdRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i);
    return pwd === checkPwd && pwd.length !== 0 && pwdRegex.test(pwd);
    //return pwd === checkPwd && pwd.length !== 0
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [city, setCity] = React.useState("");
  const [editEmail, setEditEmail] = React.useState("");
  const [editBio, setEditBio] = React.useState("");
  const [editCity, setEdityCity] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [checkPwd, setCheckPwd] = React.useState("");

  const changeBtn = () => {
    if (email.length != 0) {
      if (!validEmail()) {
        alert('Ensure Email is valid')
        return;
      }
    }
    if (pwd.length !== 0) {
      if (!validPwd()) {
        alert('Ensure password is valid')
        return;
      }
    }
    if (editBio !== bio) {
      changeBio();
    }
    if (editEmail !== email && validEmail()) {
      changeEmail();
    }
    if (pwd == checkPwd && pwd.length != 0 && validPwd()) {
      changePwd();
    }
    //navigate(0);
    handleClose();
  }


  const getUser = async () => {
    const response = await fetch("http://localhost:5005/profile/view?username=" + username, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setEmail(data.email);
      setBio(data.bio);
      setCity(data.location);
    }
  };
  
  const changeEmail = async () => {
    const response = await fetch("http://localhost:5005/profile/change-email", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        newEmail: editEmail
      })
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      emailState(editEmail);
    }
  };

  const changeBio = async () => {
    const response = await fetch("http://localhost:5005/profile/change-bio", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        newBio: editBio
      })
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      bioState(editBio);
    }
  };

  const changePwd = async () => {
    const response = await fetch("http://localhost:5005/profile/change-password", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        newPassword: pwd
      })
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
    }
  };
  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div onClick={handleOpen}><EditIcon className="edit-icon"></EditIcon></div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Profile Settings
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <div>
              <FormControl sx={{ m: 1, width: "360px" }} variant="standard">
                <ThemeProvider theme={theme}>
                  <InputLabel htmlFor="standard-adornment-Email">
                    Email
                  </InputLabel>
                  <Input
                    id="standard-adornment-Email"
                    onChange={(event) => {setEditEmail(event.target.value)}}
                    placeholder={email}
                    value={editEmail}
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
                  <InputLabel htmlFor="standard-adornment-Bio">
                    Bio
                  </InputLabel>
                  <Input
                    id="standard-adornment-Bio"
                    placeholder={bio}
                    value={editBio}
                    onChange={(event) => {setEditBio(event.target.value)}}
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
                  <InputLabel htmlFor="standard-adornment-City">
                    City
                  </InputLabel>
                  <Input
                    id="standard-adornment-City"
                    placeholder={city}
                    value={editCity}
                    onChange={(event) => {setEdityCity(event.target.value)}}
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
              <ThemeProvider theme={theme}>
                <FormControl sx={{ m: 1, width: "360px" }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>

                  <Input
                    id="standard-adornment-password"
                    onChange={(event) => {setPwd(event.target.value)}}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <>
                        <InputAdornment position="start">
                          <IconButton>
                            {true ? <></> : <ErrorIcon color="error" />}
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
                    onChange={(event) => {setCheckPwd(event.target.value)}}
                    type={showConfirmPassword ? "text" : "password"}
                    endAdornment={
                      <>
                        <InputAdornment position="start">
                          <IconButton>
                            {true ? <></> : <ErrorIcon color="error" />}
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
                onClick={changeBtn}
              >
                Change
              </Button>
            </Stack>
          </ThemeProvider>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;