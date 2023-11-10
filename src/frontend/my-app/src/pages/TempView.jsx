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
import BookModal from "../components/BookModal";
import RatingModal from "../components/RatingModal";
import CircularProgress from "@mui/material/CircularProgress";
import VerifiedIcon from "@mui/icons-material/Verified";

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
  const [pdfs, setPdfs] = React.useState("");
  const [profilePicture, setProfilePicture] = React.useState("");
  const [checkedProfilePicture, setCheckedProfilePicture] =
    React.useState(false);
  const [youtubeLink, setYoutubeLink] = React.useState("");
  const [approval, setApproval] = React.useState("");

  const { getters } = useContext(Context);
  const loggedInUserName = getters.usernameGlobal;
  const loggedInUserType = getters.userTypeGlobal;
  const token = getters.token;
  const navigate = useNavigate();

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
      setPdfs(data.pdfStr);
      setProfilePicture(data.profilePicture);
      setCheckedProfilePicture(true);
      setYoutubeLink(data.youtubeLink);
      setApproval(data.approval);
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

  const redirectStudentMessage = (id) => {
    const path = "/Message/" + id;
    navigate(path);
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="view-profile-container">
        <div className="view-profile-card">
          <div className="view-profile-title-container">
            <AccountBoxIcon className="view-profile-title-icon" />
            {approval === true && userType == "tutor" && (
              <VerifiedIcon className="verified-icon" />
            )}
            <div className="view-profile-title">
              {firstName + " " + lastName}
            </div>
          </div>

          {loggedInUserType === "student" && userType === "tutor" && (
            <div className="view-profile-feature-buttons">
              <Stack spacing={2} direction="row">
                <BookModal
                  variant="contained"
                  stuToken={token}
                  tutUser={viewingUsername}
                ></BookModal>
                <RatingModal
                  token={token}
                  tutorUser={viewingUsername}
                ></RatingModal>
                <Button
                  variant="contained"
                  onClick={() => {
                    redirectStudentMessage(viewingUsername);
                  }}
                  className="message-user-button"
                >
                  Message {firstName}
                </Button>
              </Stack>
            </div>
          )}
          {loggedInUserType === "tutor" && userType === "student" && (
            <div className="view-profile-feature-buttons">
              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  onClick={() => {
                    redirectStudentMessage(viewingUsername);
                  }}
                >
                  Message {firstName}
                </Button>
              </Stack>
            </div>
          )}
          <div className="view-profile-upper">
            <div className="view-upper-box-one">
              {checkedProfilePicture === false && (
                <div className="view-profile-loading">
                  <CircularProgress />
                </div>
              )}

              {profilePicture === "" && checkedProfilePicture === true ? (
                <img
                  src={defaultImage}
                  alt="default-profile-pic"
                  className="profile-image"
                />
              ) : (
                <>
                  <img
                    src={profilePicture}
                    alt="uploaded-profile-pic"
                    className="uploaded-profile-image"
                  />
                </>
              )}
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
          {userType === "tutor" && (
            <div className="lower-container-tempview">
              <div className="lower-container-tempview-one">
                <b className="document-title">{firstName} PDF documents</b>
                View documents:
                {pdfs.map((eachPdf, idx) => {
                  return (
                    <div key={idx}>
                      <a download="PDF Title" href={eachPdf}>
                        Download Pdf document {idx + 1}
                      </a>
                    </div>
                  );
                })}
                {pdfs.length === 0 && (
                  <span className="pdf-placeholder-description">
                    Currently no available documents to download
                  </span>
                )}
              </div>
              <div className="lower-container-tempview-two">
                <div className="temp-youtube-embed-container">
                  {youtubeLink === "" ? (
                    <div className="temp-youtube-embed-placeholder">
                      {firstName} currently has no youtube video
                    </div>
                  ) : (
                    <iframe
                      width="100%"
                      height="100%"
                      src={youtubeLink}
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* <div className="lower-container-profile">
            <div className="lower-box-one"></div>
          </div> */}
      </div>
    </>
  );
};

export default TempView;
