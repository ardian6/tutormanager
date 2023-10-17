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
          <div className="dashboard-title">Student Dashboard</div>

          <div className="calendar">Calendar</div>
          <div className="request-column">
            <div className="no-request-message">
              You currently have no outgoing requests.
            </div>
            <div className="request-title">
              <div className="request-word">Tutor Requests</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
