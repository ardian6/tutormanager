import React from "react";
import "./Profile.css";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Logo from "./TutorManagerLogo.png";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NavBar from "../components/NavBar";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import defaultImage from "./DefaultProfile.png";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EditIcon from "@mui/icons-material/Edit";

const Profile = () => {
  const [userName, setUserName] = React.useState("MickyLuLu");
  const [email, setEmail] = React.useState("zid@ad.unsw.edu.au");
  const [firstName, setFirstName] = React.useState("Michael");
  const [lastName, setLastName] = React.useState("Lu");
  const [bio, setBio] = React.useState(
    "Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).    "
  );
  const [subjects, setSubjects] = React.useState("English");
  const [city, setCity] = React.useState("Sydney");

  return (
    <>
      <NavBar></NavBar>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-title-container">
            <PermIdentityIcon className="profile-title-icon" />
            <div className="profile-title">{firstName + " " + lastName}</div>
          </div>

          <div className="profile-upper">
            <div className="upper-box-one">
              <EditIcon className="edit-icon"></EditIcon>
              <img
                src={defaultImage}
                alt="default-image"
                className="profile-image"
              />
            </div>
            <div className="upper-box-two">
              <EditIcon className="edit-icon"></EditIcon>
              <div>
                <b>Username:</b> {userName}
              </div>
              <div>
                <b>Email:</b> {email}
              </div>
              <div>
                <b>City:</b> {city}
              </div>
              <div>
                <b>Subjects:</b> {subjects}
              </div>
            </div>
            <div className="upper-box-three">
              <EditIcon className="edit-icon"></EditIcon>
              <div>
                <b>Bio:</b>
              </div>
              <div> {bio}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
