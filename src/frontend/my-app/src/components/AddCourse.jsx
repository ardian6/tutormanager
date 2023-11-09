import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { Context, useContext } from '../Context';

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

export default function AddCourse({getCourses}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [course, setCourse] = React.useState("");
  const { getters } = useContext(Context);
  const token = getters.token;


  const addCourse = async () => {
    const response = await fetch("http://localhost:5005/profile/admin-add-course", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        newCourse: course,
      }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      getCourses();
      handleClose();
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant='outlined'>Add Course</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Admin Add Course
          </Typography>
          <TextField onChange={(e) => {setCourse(e.target.value)}}></TextField>
            <Button variant='outlined' onClick={() => {addCourse()}}>Add</Button>
        </Box>
      </Modal>
    </div>
  );
}