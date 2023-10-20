import React from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import OpenIconSpeedDial from "./OpenIconSpeedDial";
import NavBar from "./NavBar";
import StudentDashboard from "../pages/StudentDashboard";
import TutorDashboard from "../pages/TutorDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import TutorProfile from "../pages/tutorProfile";
import { Context, useContext } from "../Context";
import { Routes, Route, useNavigate } from "react-router-dom";
import TempView from "../pages/TempView";

function Site(props) {
  const [userType, setUserType] = React.useState("true");
  const { getters } = React.useContext(Context);
  const token = getters.token;
  const navigate = useNavigate();
  React.useEffect(() => {
    if (token === "" || token === null) {
      navigate("/");
    }
  }, [token]);

  // const { getters, setters } = useContext(Context);
  const currUserType = getters.userTypeGlobal;
  return (
    <div className="SiteContainer">
      <Routes>
        {/* <Route path="/admindashboard" />
        <Route path="/tutordashboard" />
        <Route path="/studentdashboard" /> */}
        <Route
          path="/dashboard"
          element={
            currUserType === "student" ? (
              <StudentDashboard />
            ) : currUserType === "tutor" ? (
              <TutorDashboard />
            ) : (
              <AdminDashboard />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile></Profile>} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/forgotpassword" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Profile/:username" element={<TempView />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default Site;
