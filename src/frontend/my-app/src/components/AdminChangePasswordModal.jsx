import React from "react";
import NavBar from "../components/NavBar";
import { Context, useContext } from "../Context";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

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

const AdminDashboard = ({
  open,
  token,
  handleClose,
  currentuser,
  newPassword,
}) => {
  //   const changeUserPassword = async (user, newPassword) => {
  //     const response = await fetch(
  //       "http://localhost:5005/profile/admin-change-password",
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           token: token,
  //           targetProfile: user,
  //           newPassword: newPassword,
  //         }),
  //       }
  //     );
  //     const data = await response.json();
  //     if (data.error) {
  //       alert(data.error);
  //     } else {
  //     }
  //   };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change {currentuser} Password
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="new-password"
              label="New Password"
              variant="standard"
            />
            <TextField
              id="confirm-new-password"
              label="Confirm New Password"
              variant="standard"
            />
          </Box>
          <Stack spacing={2} direction="row">
            <Button variant="contained">Change Password</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default AdminDashboard;
