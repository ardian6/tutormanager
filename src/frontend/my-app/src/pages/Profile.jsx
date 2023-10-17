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

import { Context, useContext } from "../Context";
import BasicModal from "../components/BasicModal";

const Profile = () => {
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [bio, setBio] = React.useState("");
  //const [subjects, setSubjects] = React.useState("English");
  const [city, setCity] = React.useState("");

  const { getters } = useContext(Context);
  const userName = getters.usernameGlobal;
  const token = getters.token;

  const getUser = async () => {
    console.log('request');
    if (!token || !userName) {
      return;
    }
    const response = await fetch(
      "http://localhost:5005/profile/view?username=" + userName,
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
      // console.log(data);
      setEmail(data.email);
      setBio(data.bio);
      //setSubjects(data.courses);
      setFirstName(data.givenName);
      setLastName(data.familyName);
      setCity(data.location);
    }
  };
  React.useEffect(() => {
    getUser();
  }, []);

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
              <img
                src={defaultImage}
                alt="default-image"
                className="profile-image"
              />
            </div>
            <div className="upper-box-two">
              <BasicModal
                emailState={setEmail}
                bioState={setBio}
                cityState={setCity}
              ></BasicModal>
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
                <b>Bio:</b> {bio}
              </div>
            </div>
            <div className="upper-box-three">Subjects</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
