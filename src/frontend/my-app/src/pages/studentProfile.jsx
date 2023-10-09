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
import { SvgIcon } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import CenteredTabs from "../components/CenteredTabs";


const TutorProfile = () => {
    const [userName, setUserName] = React.useState('zid');
    const [email, setEmail] = React.useState('zid@ad.unsw.edu.au');
    const [firstName, setFirstName] = React.useState('Michael');
    const [lastName, setLastName] = React.useState('Lu');
    const [bio, setBio] = React.useState("Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).    ")

    const getUser = async() => {
        const response = await fetch('http://localhost:5005/user/info', {
            method: 'GET',
            headers: {
            'Content-type': 'application/json',
            },
            body: JSON.stringify({
            })
        });
        const data = await response.json();
        if (data.error) {
            alert(data.error);
        } else {
            // setToken(data.token);
            // setEmailGlobal(email);
        }
    }

  return (
    <div>
        <NavBar></NavBar>
        <div className="profile">
            <div className="profileContainer">
                <div className="profileUsername">
                    <div className="profile1">
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <div className="profile2">
                            <div>
                                {userName}
                            </div>
                            <div className="profile3">
                                Student
                            </div>
                        </div>
                    </div>
                    <div>
                        <CenteredTabs></CenteredTabs>
                    </div>
                </div>
                <div className="profileInfo">
                    <div className="item item1" >
                        <h3>Courses</h3>
                    </div>
                    <div className="item">
                        <div>
                            <h3>Profile Information</h3>
                            <div>
                                {bio}
                            </div>
                        </div>
                        <div>
                            <b>Full Name :</b> {firstName + ' ' + lastName} 
                        </div>
                        <div>
                            <b>Email :</b> {email}
                        </div>
                    </div>
                    <div className="item item3"> 
                        <h3>Conversations</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default TutorProfile;
