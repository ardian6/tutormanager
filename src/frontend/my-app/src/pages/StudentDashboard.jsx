import React from "react";
import "./StudentDashboard.css";
import NavBar from "../components/NavBar";
import { Context, useContext } from "../Context";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import defaultImage from "./DefaultProfile.png";
import Calendar from "../components/Calendar";
import CircularProgress from "@mui/material/CircularProgress";
import BookModal from "../components/BookModal";
import FilterModal from "../components/FilterModal";
import ChangeBookModal from "../components/ChangeBookModal";
import { Rating } from "@mui/material";

const StudentDashboard = () => {
  const { getters } = useContext(Context);
  const token = getters.token;
  const [students, setStudents] = React.useState([]);
  const [mybookings, setMybookings] = React.useState([]);

  const [checkedAsyncRequests, setCheckedAsyncRequests] = React.useState(false);
  const [checkedAsyncSearch, setCheckedAsyncSearch] = React.useState(false);

  const getAllTutors = async (course, location, timezone, rating) => {
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
      const temp = data.listofalldata.sort(
        (t1, t2) => t2.averageRating - t1.averageRating
      );
      setCheckedAsyncSearch(true);
      setStudents(temp);
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
      setMybookings(data.bookingsList);
      setCheckedAsyncRequests(true);
    }
  };

  const redirectStudentProfile = (id) => {
    const path = "/Profile/" + id;
    navigate(path);
  };

  const redirectStudentMessage = (id) => {
    const path = "/Message/" + id;
    navigate(path);
  };

  React.useEffect(() => {
    getAllTutors("", "", "", 0);
    getBookings();
  }, []);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  function translateDate(date) {
    var day = date.slice(8, 10);
    var month = date.slice(5, 7);
    var year = date.slice(0, 4);
    var time24hour = date.slice(11, 19);
    var time = new Date("1970-01-01T" + time24hour + "Z").toLocaleTimeString(
      "en-US",
      { timeZone: "UTC", hour12: true, hour: "numeric", minute: "numeric" }
    );
    return time + " " + day + "/" + month + "/" + year;
  }

  function translateHourGivenTwoDates(date1, date2) {
    var time24hour = date1.slice(11, 19);
    var time1 = new Date("1970-01-01T" + time24hour + "Z").toLocaleTimeString(
      "en-US",
      { timeZone: "UTC", hour12: true, hour: "numeric", minute: "numeric" }
    );

    var time24hour = date2.slice(11, 19);
    var time2 = new Date("1970-01-01T" + time24hour + "Z").toLocaleTimeString(
      "en-US",
      { timeZone: "UTC", hour12: true, hour: "numeric", minute: "numeric" }
    );

    return time1 + " - " + time2;
  }

  return (
    <>
      <NavBar></NavBar>

      <div className="studentdashboard-container">
        <div className="studentdashboard-card">
          <div className="student-dashboard-title">Student Dashboard</div>
          <div className="student-calendar">
            <Calendar token={token}></Calendar>
          </div>

          <div className="student-request-column">
            <div className="student-request-lower-container">
              <div className="student-request-lower-scroll">
                {checkedAsyncRequests === false && (
                  <div className="search-tutor-loading">
                    <CircularProgress />
                  </div>
                )}
                {checkedAsyncRequests === true && mybookings.length === 0 && (
                  <div className="search-tutor-none-message">
                    You currently have no outgoing tutor requests.
                  </div>
                )}
                <div className="student-request-info-bar">
                  <div className="tutor-title">Tutor</div>
                  <div className="subject-title">Description</div>
                  <div className="time-title">Time</div>
                  <div className="status-title">Status</div>
                </div>
                {mybookings.map((booking, idx) => {
                  return (
                    <div key={idx} className="student-individual-requests">
                      <div className="individual-tutor-title">
                        <Button
                          className="individual-profile-button"
                          variant="outlined"
                          onClick={() => redirectStudentProfile(booking[2])}
                        >
                          {booking[2]}
                        </Button>
                      </div>
                      <div className="individual-subject-title">
                        {booking[6]}
                      </div>
                      <div className="individual-time-title">
                        <div>{translateDate(booking[4]).slice(8, 18)}</div>
                        {translateHourGivenTwoDates(booking[3], booking[4])}
                      </div>
                      <div className="individual-status-title">
                        {booking[5] ? (
                          <div className="accepted-div">Accepted</div>
                        ) : (
                          <div className="pending-div">Pending</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="student-request-title">
              <div className="student-request-word">Tutor Requests</div>
            </div>
          </div>

          <div className="search-container">
            <div className="filters-container">
              <Stack spacing={2} direction="row">
                <FilterModal
                  token={token}
                  setStudents={setStudents}
                  setCheckedAsyncSearch={setCheckedAsyncSearch}
                  checkedAsyncSearch={checkedAsyncSearch}
                ></FilterModal>
                {/* <div className="sort-container">Sort</div> */}
              </Stack>
            </div>
            <div className="search-for-tutors-title">
              <div className="search-for-tutors-word">Search For Tutors</div>
            </div>
            <div className="lower-box-container">
              <div className="tutor-search-scroll">
                {checkedAsyncSearch === false && (
                  <div className="search-tutor-loading">
                    <CircularProgress></CircularProgress>
                  </div>
                )}
                {checkedAsyncSearch === true && students.length === 0 && (
                  <div className="search-tutor-none-message">
                    No tutors available currently. Please check again later or
                    change filters.
                  </div>
                )}
                {students.map((student, idx) => {
                  return (
                    <div
                      key={idx}
                      className="tutor-search-individual-container"
                    >
                      <div className="individual-profile-image-container">
                        {student["profilePicture"] === "" ? (
                          <img
                            src={defaultImage}
                            alt="default-image"
                            className="individual-profile-image"
                          />
                        ) : (
                          <img
                            src={student["profilePicture"]}
                            alt="default-image"
                            className="uploaded-profile-image"
                          />
                        )}
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
                          <b>
                            Reviews:
                            <Rating
                              name="read-only"
                              value={student["averageRating"]}
                              size="small"
                              readOnly
                            />
                          </b>
                        </div>
                        <div className="individual-profile-buttons">
                          <Stack spacing={1.5} direction="row" variant="text">
                            <Button
                              className="individual-profile-button"
                              variant="contained"
                              onClick={() =>
                                redirectStudentProfile(student["username"])
                              }
                            >
                              Profile
                            </Button>
                            <Button
                              className="individual-profile-button"
                              variant="outlined"
                              onClick={() =>
                                redirectStudentMessage(student["username"])
                              }
                            >
                              Message
                            </Button>
                            <BookModal
                              stuToken={token}
                              tutUser={student["username"]}
                            ></BookModal>
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
