import React from "react";
import "./AdminDashboard.css";
import NavBar from "../components/NavBar";

const AdminDashboard = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="admindashboard-container">
        <div className="admindashboard-card">Admin</div>
      </div>
    </>
  );
};

export default AdminDashboard;
