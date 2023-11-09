import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TuneIcon from "@mui/icons-material/Tune";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

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

export default function FilterModal({
  token,
  setStudents,
  setCheckedAsyncSearch,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    getCourses();
  };
  const handleClose = () => setOpen(false);
  const [courses, setCourse] = React.useState([]);
  const [subject, setSubject] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [timezone, setTimeZone] = React.useState("");
  const [review, setReview] = React.useState("");

  const getCourses = async () => {
    const response = await fetch(
      "http://localhost:5005/profile/view-all-courses",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      }
    );
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setCourse(data.listcourses);
    }
  };

  const filterTutor = async () => {
    setCheckedAsyncSearch(false);
    setStudents([]);
    const response = await fetch("http://localhost:5005/filter/filter-tutor", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        course: subject,
        location: location,
        timezone: timezone,
        rating: review,
      }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setStudents(data.listofalldata);
      setCheckedAsyncSearch(true);
    }
  };

  const clearData = () => {
    setSubject("");
    setLocation("");
    setReview("");
    setTimeZone("");
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        <TuneIcon className="filter-icon" />
        Filters
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Filter Tutor Search</h2>
          <Box sx={{ display: "flex", flexWrap: "wrap" }} className="inputBox">
            <div sx={{ padding: "50px" }}>
              <InputLabel>Location</InputLabel>
              <Input
                id="Location"
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              />
            </div>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }} className="inputBox">
            <div sx={{ padding: "50px" }}>
              <InputLabel>Timezone</InputLabel>
              <Input
                id="Timezone"
                value={timezone}
                onChange={(event) => {
                  setTimeZone(event.target.value);
                }}
              />
            </div>
          </Box>
          <Box sx={{ minWidth: 120 }} className="inputBox">
            <div>
              <InputLabel id="demo-simple-select-label">Course</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subject}
                label="Subject"
                onChange={(event) => {
                  setSubject(event.target.value);
                }}
              >
                {courses?.map((course, idx) => {
                  return (
                    <MenuItem key={idx} value={course}>
                      {course}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }} className="inputBox">
            <div sx={{ padding: "50px" }}>
              <InputLabel>Reviews</InputLabel>
              <Input
                id="Card Number"
                value={review}
                type="number"
                InputProps={{ inputProps: { min: "0", max: "5", step: "1" } }}
                onChange={(event) => {
                  if (event.target.value > 5) {
                    setReview(5);
                  }
                  else if (event.target.value < 0) {
                    setReview(0);
                  } else {
                    setReview(event.target.value);
                  }
                }}
              />
            </div>
          </Box>
          <Button variant="outlined" onClick={filterTutor}>
            Filter
          </Button>
          <Button variant="outlined" onClick={clearData}>
            Clear
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
