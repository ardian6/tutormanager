import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
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
import { useNavigate } from "react-router-dom";
import { Context, useContext } from "../Context";
import "./UploadProfileModal.css";
import Filetodata from "../pages/Filetodata";

const UploadProfileModal = ({ token, getUser }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [profileFile, setProfileFile] = React.useState("");

  const uploadProfileFile = async () => {
    if (profileFile === "") {
      alert("No profile image file currently uploaded.");
      return;
    }

    const response = await fetch(
      "http://localhost:5005/profile/change-picture",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          pictureString: profileFile,
        }),
      }
    );
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      {
        getUser();
      }
    }
  };

  const storeProfileFile = () => {
    Filetodata(document.getElementById("image-file").files[0]).then((data) => {
      setProfileFile(data);
      console.log(data);
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <EditIcon className="edit-icon" onClick={handleOpen}></EditIcon>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="upload-box">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Upload new profile picture:
            </Typography>
            Accepts png, jpeg and jpg files
            <div>
              <input
                type="file"
                id="image-file"
                name="image-file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={() => {
                  storeProfileFile();
                }}
                //   className="pdf-input"
              />
            </div>
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                onClick={() => {
                  //   uploadProfileFile();
                  handleClose();
                }}
                className="individual-profile-button"
              >
                Submit new profile image
              </Button>
            </Stack>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default UploadProfileModal;
