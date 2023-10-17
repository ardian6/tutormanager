import React from "react";
import "./TutorDashboard.css";
import NavBar from "../components/NavBar";

const TutorDashboard = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="tutordashboard-container">
        <div className="tutordashboard-card">
          <div className="tutor-title">Tutor Dashboard</div>
          <div className="calendar">Calendar Tutor</div>
        </div>
      </div>
    </>
  );
};

export default TutorDashboard;
