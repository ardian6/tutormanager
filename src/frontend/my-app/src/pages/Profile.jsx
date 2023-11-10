import React from "react";
import "./Profile.css";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Logo from "./TutorManagerLogo.png";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NavBar from "../components/NavBar";
import Filetodata from "./Filetodata.jsx";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import defaultImage from "./DefaultProfile.png";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EditIcon from "@mui/icons-material/Edit";

import { Context, useContext } from "../Context";
import BasicModal from "../components/BasicModal";

import BasicStack from "../components/BasicStack";

import UploadProfileModal from "../components/UploadProfileModal";
import AddCourseModal from "../components/AddCourseModal";
import CircularProgress from "@mui/material/CircularProgress";

const Profile = () => {
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [classes, setClasses] = React.useState([]);
  const [city, setCity] = React.useState("");

  const [hours, setHours] = React.useState("");

  const [profilePicture, setProfilePicture] = React.useState("");
  const [checkedProfilePicture, setCheckedProfilePicture] =
    React.useState(false);

  const [pdf, setPdf] = React.useState("");
  const [listPdf, setListPdf] = React.useState([]);

  const { getters } = useContext(Context);
  const userName = getters.usernameGlobal;
  const userType = getters.userTypeGlobal;
  const token = getters.token;

  const getUser = async () => {
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
      setEmail(data.email);
      setBio(data.bio);
      setFirstName(data.givenName);
      setLastName(data.familyName);
      setCity(data.location);
      setListPdf(data.pdfStr);
      setProfilePicture(data.profilePicture);
      setCheckedProfilePicture(true);
      console.log(data);
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

  const getHours = async () => {
    const response = await fetch("http://localhost:5005/hours/total-hours", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      // console.log(data.hours);
      setHours(data.hours);
    }
  };

  React.useEffect(() => {
    getUser();
    if (userType === "tutor") {
      getHours();
    }
  }, []);

  const uploadPdf = async () => {
    if (pdf === "") {
      alert("No PDF file currently chosen.");
      return;
    }

    const response = await fetch("http://localhost:5005/profile/upload-doc", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        dataStr: pdf,
      }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      // setEmail(data.email);
      getUser();
    }
  };

  const storePdf = () => {
    Filetodata(document.getElementById("pdf").files[0]).then((data) => {
      setPdf(data);
      // console.log(data);
    });
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-title-container">
            <AccountBoxIcon className="profile-title-icon" />
            <div className="profile-title">{firstName + " " + lastName}</div>
          </div>
          <div className="profile-upper">
            <div className="upper-box-one">
              <UploadProfileModal
                token={token}
                getUser={getUser}
              ></UploadProfileModal>
              {checkedProfilePicture === false && (
                <div className="view-profile-loading">
                  <CircularProgress />
                </div>
              )}

              {profilePicture === "" && checkedProfilePicture === true ? (
                <img
                  src={defaultImage}
                  alt="default-image"
                  className="profile-image"
                />
              ) : (
                <>
                  <img
                    src={profilePicture}
                    alt="default-image"
                    className="uploaded-profile-image"
                  />
                </>
              )}
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
            <div className="upper-box-three">
              <span>
                <b>User Type:</b> {userType}
              </span>
              {userType === "tutor" && (
                <span>
                  <b>Hours taught:</b> {hours}
                </span>
              )}

              <b>Subjects:</b>
              <div>
                <BasicStack
                  classes={classes}
                  setClasses={setClasses}
                ></BasicStack>
                <AddCourseModal
                  classes={classes}
                  setClasses={setClasses}
                ></AddCourseModal>
              </div>
            </div>
          </div>
          {userType === "tutor" && (
            <>
              <div className="lower-container-profile">
                <div className="lower-box-one">
                  <b>Upload Documents. One at a time.</b>
                  Only PDF files accepted
                  <input
                    type="file"
                    id="pdf"
                    name="pdf"
                    accept="application/pdf"
                    onChange={() => {
                      storePdf();
                    }}
                    className="pdf-input"
                  />
                  <Stack spacing={2} direction="row">
                    <Button
                      variant="contained"
                      onClick={() => {
                        uploadPdf();
                      }}
                      className="individual-profile-button"
                    >
                      Submit pdf file
                    </Button>
                  </Stack>
                  {listPdf.map((eachPdf, idx) => {
                    return (
                      <div key={idx}>
                        <a download="PDF Title" href={eachPdf}>
                          Download Pdf document {idx + 1}
                        </a>
                      </div>
                    );
                  })}
                </div>
                <div className="lower-box-two"></div>
                {/* <div className="lower-box-three"></div> */}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
