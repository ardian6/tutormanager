import React from "react";
import "./TutorDashboard.css";
import NavBar from "../components/NavBar";
import { Context, useContext } from "../Context";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/Calendar";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ChangeBookModal from "../components/ChangeBookModal";

const TutorDashboard = () => {
  const { getters } = useContext(Context);
  const token = getters.token;
  const [mybookings, setMybookings] = React.useState([]);

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
      // console.log(data);
      console.log(data.bookingsList);
      setMybookings(data.bookingsList);
    }
  };

  const acceptBooking = async (bookingID) => {
    const response = await fetch(
      "http://localhost:5005/booking/accept-booking",
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          bookingID: bookingID,
        }),
      }
    );
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      getBookings();
    }
  };

  const declineBooking = async (studID, tutID) => {
    const response = await fetch(
      "http://localhost:5005/booking/delete-booking",
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          studentUser: studID,
          tutorUser: tutID
        }),
      }
    );
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      getBookings();
    }
  };

  React.useEffect(() => {
    getBookings();
  }, []);

  const navigate = useNavigate();

  const redirectStudent = (id) => {
    const path = "/Profile/" + id;
    navigate(path);
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
      <div className="tutordashboard-container">
        <div className="tutordashboard-card">
          <div className="tutor-dashboard-title">Tutor Dashboard</div>
          <div className="tutor-calendar">
            <Calendar token={token}></Calendar>
          </div>
          <div className="tutor-request-column">
            {/* <div className="tutor-no-request-message">
              {mybookings.map((booking, idx) => {
                return <div key={idx}>{booking[2]}</div>;
              })}
            </div> */}
            <div className="tutor-request-lower-container">
              <div className="tutor-request-lower-scroll">
                {mybookings.length === 0 && (
                  <div className="search-tutor-loading">
                    <CircularProgress></CircularProgress>
                  </div>
                )}
                <div className="tutor-request-info-bar">
                  <div className="student-title">Tutor</div>
                  <div className="tutor-subject-title">Description</div>
                  <div className="tutor-time-title">Time</div>
                  <div className="tutor-accept-title">Accept</div>
                  <div className="tutor-reject-title">Reject</div>
                  <div className="tutor-change-title">Change</div>
                </div>
                {mybookings.map((booking, idx) => {
                  return (
                    <div
                      key={idx}
                      // onClick={() => redirectStudent(student["username"])}
                      className="tutor-individual-requests"
                    >
                      <div className="tutor-individual-tutor-title">
                        <Button
                          className="individual-profile-button"
                          variant="outlined"
                          onClick={() => redirectStudent(booking[1])}
                        >
                          {booking[1]}
                        </Button>
                      </div>
                      <div className="tutor-individual-subject-title">
                        {booking[6]}
                      </div>
                      <div className="tutor-individual-time-title">
                        {/* {translateDate(booking[4]).slice(8, 18) + "\n"}
                        {translateDate(booking[3]).slice(0, 8) +
                          "- " +
                          translateDate(booking[4]).slice(0, 8)} */}
                        <div>{translateDate(booking[3]).slice(8, 18)}</div>
                        {translateHourGivenTwoDates(booking[3], booking[4])}
                      </div>
                      <div className="tutor-individual-accept-title">
                        <Stack spacing={1} direction="row" variant="text">
                          {!booking[5] ? (
                            <>
                              <Button
                                className="individual-profile-button"
                                variant="contained"
                                color="success"
                                onClick={() => {acceptBooking(booking[0])}}
                              >
                                Accept
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                disabled
                                variant="contained"
                                color="success"
                                className="individual-profile-button"
                              >
                                Accept
                              </Button>
                            </>
                          )}
                        </Stack>
                      </div>
                      <div className="tutor-individual-reject-title">
                        <Stack spacing={1} direction="row" variant="text">
                          {!booking[5] ? (
                            <>
                              <Button
                                className="individual-profile-button"
                                variant="contained"
                                color="error"
                                onClick={() => {declineBooking(booking[1], booking[2])}}
                              >
                                Reject
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                disabled
                                variant="contained"
                                color="error"
                                className="individual-profile-button"
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </Stack>
                      </div>
                      <div className="tutor-individual-change-title">
                        <Stack spacing={1} direction="row" variant="text">
                          <ChangeBookModal info={booking} token={token}></ChangeBookModal>
                        </Stack>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="tutor-request-title">
              <div className="tutor-request-word">Student Requests</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorDashboard;
