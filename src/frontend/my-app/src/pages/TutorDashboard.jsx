import React from "react";
import "./TutorDashboard.css";
import NavBar from "../components/NavBar";

const TutorDashboard = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="tutordashboard-container">
        <div className="tutordashboard-card">
          <div className="tutor-dashboard-title">Tutor Dashboard</div>
          <div className="tutor-calendar">Calendar Tutor</div>
          <div className="tutor-request-column">
            <div className="tutor-no-request-message">
              You currently have no incoming requests.
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
