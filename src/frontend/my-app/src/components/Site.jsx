import React from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import OpenIconSpeedDial from "./OpenIconSpeedDial";
import NavBar from "./NavBar";
import StudentProfile from "../pages/studentProfile";
import TutorProfile from "../pages/tutorProfile";
import { Context, useContext } from "../Context";
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

function Site(props) {
  const [userType, setUserType] = React.useState(true);
  const getters = React.useContext(Context);
  const token = getters.token;
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/')
  }, [token]);


  return (
    <div className="SiteContainer">
      <Routes>
        <Route path="/dashboard" />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile></Profile>} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/forgotpassword" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default Site;
