import { useParams } from "react-router-dom";
import React from "react";
import "./TempView.css";

import Logo from "./TutorManagerLogo.png";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NavBar from "../components/NavBar";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import defaultImage from "./DefaultProfile.png";
import EditIcon from "@mui/icons-material/Edit";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Context, useContext } from "../Context";

const TempView = () => {
  const param = useParams();
  const viewingUsername = param.username;

  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [classes, setClasses] = React.useState([]);
  const [city, setCity] = React.useState("");
  const [userType, setUserType] = React.useState("");

  const { getters } = useContext(Context);
  const loggedInUserName = getters.usernameGlobal;
  const loggedInUserType = getters.userTypeGlobal;
  const token = getters.token;

  const getUser = async () => {
    if (!token || !loggedInUserName) {
      return;
    }
    const response = await fetch(
      "http://localhost:5005/profile/view?username=" + viewingUsername,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setEmail(data.email);
      setBio(data.bio);
      setFirstName(data.givenName);
      setLastName(data.familyName);
      setCity(data.location);
      setUserType(data.userType);
    }

    const classes = await fetch(
      "http://localhost:5005/profile/view-my-courses?token=" + token,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const classData = await classes.json();
    if (classData.error) {
      alert(classData.error);
    } else {
      setClasses(classData.myCourses);
    }
  };
  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <div className="view-profile-container">
        <div className="view-profile-card">
          <div className="view-profile-title-container">
            <AccountBoxIcon className="view-profile-title-icon" />
            <div className="view-profile-title">
              {firstName + " " + lastName}
            </div>
          </div>

          {loggedInUserType === "student" && userType === "tutor" && (
            <div className="view-profile-feature-buttons">
              <Stack spacing={2} direction="row">
                <Button variant="contained">Message {firstName}</Button>
              </Stack>
            </div>
          )}
          {loggedInUserType === "tutor" && userType === "student" && (
            <div className="view-profile-feature-buttons">
              <Stack spacing={2} direction="row">
                <Button variant="contained">Message {firstName}</Button>
              </Stack>
            </div>
          )}
          <div className="view-profile-upper">
            <div className="view-upper-box-one">
              <img
                src={defaultImage}
                alt="default-image"
                className="profile-image"
              />
            </div>
            <div className="view-upper-box-two">
              <div>
                <b>Username:</b> {viewingUsername}
              </div>
              <div>
                <b>Email:</b> {email}
              </div>
              <div>
                <b>City:</b> {city}
              </div>
              <div>
                <b>Bio:</b> {bio}
              </div>
            </div>
            <div className="view-upper-box-three">
              <span>
                <b>User Type:</b> {userType}
              </span>
              <b>Subjects:</b>
              <div>
                {classes.map((subject, idx) => {
                  return <div key={idx}>{subject}</div>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TempView;
