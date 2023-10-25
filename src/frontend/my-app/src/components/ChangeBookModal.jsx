import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from 'dayjs';

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

export default function ChangeBookModal({info, token}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [startTime, setStartTime] = React.useState(info[3]);
  const [endTime, setEndTime] = React.useState(info[4]);
  const [description, setDescription] = React.useState(info[6]);

  const changeBooking = async () => {
    const response = await fetch("http://localhost:5005/booking/change-booking", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          studentUser: info[1],
          tutorUser: info[2],
          startTime: startTime,
          endTime: endTime,
          description: description,
        }),
      });
    const data = await response.json();
    if (data.error) {
        alert(data.error);
    } else {
      handleClose();
    }
  }

  return (
    <div>
      <Button className="individual-profile-button" variant="contained" onClick={handleOpen}>Change</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change Booking with {info[1]}
          </Typography>
          <InputLabel htmlFor="Booking description">
                Description
            </InputLabel>
            <Input
                id="standard-adornment-Last-Name"
                defaultValue={description}
                onChange={(event) => {setDescription(event.target.value)
                }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                    label="Starting Time"
                    defaultValue={dayjs(startTime)}
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
                    defaultValue={dayjs(endTime)}
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
            <Button className="individual-profile-button" variant="outlined" onClick={changeBooking}>
                Change appointment
            </Button>
        </Box>
      </Modal>
    </div>
  );
}