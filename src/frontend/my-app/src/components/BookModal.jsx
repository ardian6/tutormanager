import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
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

export default function BasicModal({stuToken, tutUser}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');
  const [description, setDescription] = React.useState('');
  const navigate = useNavigate();
  const { getters } = useContext(Context);
  const studUser = getters.usernameGlobal;

  const book = async () => {

    const response = await fetch("http://localhost:5005/booking/make-booking", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          token: stuToken,
          studentUser: studUser,
          tutorUser: tutUser,
          startTime: startTime,
          endTime: endTime,
          description: description,
        }),
      });
    const data = await response.json();
    if (data.error) {
        alert(data.error);
    } else {
      navigate('/Payment/'+studUser);
    }
  }

  return (
    <div>
      <Button className="individual-profile-button" variant="outlined" onClick={handleOpen}>Book</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="make-booking-modal"
        aria-describedby="student-request-tutor"
      >
        <Box sx={style}>
            <Typography id="booking-title" variant="h6" component="h2">
            Request appointment with {tutUser}
            </Typography>
            <InputLabel htmlFor="Booking description">
                Description
            </InputLabel>
            <Input
                id="standard-adornment-Last-Name"
                onChange={(event) => {setDescription(event.target.value)
                }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                    label="Starting Time"
                    onChange={(event, date) => {
                        const temp = 
                            event["$y"] +
                              "-" +
                              event["$M"] +
                              "-" +
                              event["$D"] +
                              " " +
                              event["$H"] +
                              ":" +
                              event["$m"] +
                              ":0";
                        setStartTime(temp);
                    }}
                    />
                </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                    label="End Time"
                    onChange={(event, date) => {
                        const temp = 
                            event["$y"] +
                              "-" +
                              event["$M"] +
                              "-" +
                              event["$D"] +
                              " " +
                              event["$H"] +
                              ":" +
                              event["$m"] +
                              ":0";
                        setEndTime(temp);
                    }}
                    />
                </DemoContainer>
            </LocalizationProvider>
            <Button className="individual-profile-button" variant="outlined" onClick={book}>
                Request appointment
            </Button>
        </Box>
      </Modal>
    </div>
  );
}