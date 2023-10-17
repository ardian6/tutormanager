import React from "react";
import "./StudentDashboard.css";
import NavBar from "../components/NavBar";
import { Context, useContext } from "../Context";

const StudentDashboard = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="studentdashboard-container">
        <div className="studentdashboard-card">
          <div className="student-dashboard-title">Student Dashboard</div>

          <div className="student-calendar">Calendar</div>
          <div className="student-request-column">
            <div className="student-no-request-message">
              You currently have no outgoing requests.
            </div>
            <div className="student-request-title">
              <div className="student-request-word">Tutor Requests</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
