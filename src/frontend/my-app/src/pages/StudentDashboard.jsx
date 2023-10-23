import React from "react";
import "./StudentDashboard.css";
import NavBar from "../components/NavBar";
import { Context, useContext } from "../Context";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TuneIcon from "@mui/icons-material/Tune";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import defaultImage from "./DefaultProfile.png";
import Calendar from "../components/Calendar";

const StudentDashboard = () => {
  const { getters } = useContext(Context);
  const token = getters.token;
  const [students, setStudents] = React.useState([]);
  const getAllStudents = async (course, location, timezone, rating) => {
    const response = await fetch("http://localhost:5005/filter/filter-tutor", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        course: course,
        location: location,
        timezone: timezone,
        rating: rating,
      }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      console.log(data.listofalldata);
      setStudents(data.listofalldata);
      // setStudents(data.usersList);
    }
  };

  const navigate = useNavigate();
  const getBookings = async () => {
    const response = await fetch(
      "http://localhost:5005/bookings/view-my-bookings",
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
      console.log(data);
    }
  };

  const redirectStudent = (id) => {
    const path = "/Profile/" + id;
    navigate(path);
  };

  React.useEffect(() => {
    getAllStudents("", "", "", 0);
  }, []);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      <NavBar></NavBar>
      <div className="studentdashboard-container">
        <div className="studentdashboard-card">
          <div className="student-dashboard-title">Student Dashboard</div>
          {/* <div className="student-calendar">Calendar</div> */}
          <div className="student-calendar">
            <Calendar token={token}></Calendar>
          </div>
          <div className="student-request-column">
            <div className="student-no-request-message">
              {students.map((student, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => redirectStudent(student["username"])}
                  >
                    {student["username"]}
                  </div>
                );
              })}
            </div>
            <div className="student-request-title">
              <div className="student-request-word">Tutor Requests</div>
            </div>
          </div>
          <div className="search-container">
            <div className="filters-container">
              <Stack spacing={2} direction="row">
                <Button variant="outlined">
                  <TuneIcon className="filter-icon" />
                  Filters
                </Button>
                {/* <div className="sort-container">Sort</div> */}
              </Stack>
            </div>
            <div className="search-for-tutors-title">
              <div className="search-for-tutors-word">Search For Tutors</div>
            </div>
            <div className="lower-box-container">
              <div className="tutor-search-scroll">
                {students.map((student, idx) => {
                  return (
                    // <div key={idx} onClick={() => redirectStudent(student)}>
                    //   {student}
                    // </div>
                    <div
                      key={idx}
                      className="tutor-search-individual-container"
                    >
                      <div className="individual-profile-image-container">
                        <img
                          src={defaultImage}
                          alt="default-image"
                          className="individual-profile-image"
                        />
                      </div>
                      <div className="individual-profile-info">
                        {/* <div>{student["username"]}</div> */}
                        <div>
                          <b>Name: </b>
                          {student["givenName"] + " " + student["familyName"]}
                        </div>
                        <div>
                          <b>Courses: </b>
                          {student["courseList"].map((course, idx) => {
                            return <span key={idx}>{course} </span>;
                          })}
                        </div>

                        <div>
                          <b>Location: </b>
                          {student["location"]}
                        </div>
                        <div>
                          <b>Timezone: </b>
                          {student["timezone"]}
                        </div>

                        <div>
                          <b>Reviews: </b>
                          {/* {student["bio"]} */}
                        </div>
                        <div className="individual-profile-buttons">
                          <Stack spacing={1.5} direction="row" variant="text">
                            <Button
                              className="individual-profile-button"
                              variant="contained"
                              onClick={() =>
                                redirectStudent(student["username"])
                              }
                            >
                              Profile
                            </Button>
                            <Button
                              className="individual-profile-button"
                              variant="outlined"
                            >
                              Message
                            </Button>
                            <Button
                              className="individual-profile-button"
                              variant="outlined"
                            >
                              Book
                            </Button>
                          </Stack>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
