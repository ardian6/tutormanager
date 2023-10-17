import React from "react";
import "./TutorDashboard.css";
import NavBar from "../components/NavBar";

const TutorDashboard = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="tutordashboard-container">
        <div className="tutordashboard-card">
          <div className="calendar">Calendar</div>
          <div className="request-column">
            <div className="no-request-message">
              You currently have no outgoing requests.
            </div>
            <div className="request-title">
              <div className="request-word">Tutor Requests</div>
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    </>
  );
};

export default TutorDashboard;
