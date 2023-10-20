import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditIcon from "@mui/icons-material/Edit";
import TextField from '@mui/material/TextField';
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

export default function AddCourseModal({classes, setClasses}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newCourse, setNewCourse] = React.useState("");

  const { getters } = useContext(Context);
  const token = getters.token;

  const addCourse = async () => {
    const response = await fetch("http://localhost:5005/profile/add-course", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        newCourse: newCourse,
      }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      const newSet = classes.concat(newCourse);
      setClasses(newSet);
    }
    handleClose();
  }

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
          <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Add Course"
          onChange={(event) => {
            setNewCourse(event.target.value);
          }}
        />
        <Button onClick={addCourse}>
        Add Course
        </Button>
        </Box>
      </Modal>
    </div>
  );
}