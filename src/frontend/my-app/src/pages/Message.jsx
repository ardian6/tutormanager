import React from "react";
import "./Message.css";
import NavBar from "../components/NavBar";
import { Context, useContext } from "../Context";
// import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import defaultImage from "./DefaultProfile.png";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Message = () => {
  const { getters } = useContext(Context);
  const token = getters.token;
  const myUsername = getters.usernameGlobal;
  const myUsertype = getters.userTypeGlobal;

  const param = useParams();
  const viewingUsername = param.username;

  const [myMessages, setMyMessages] = React.useState([]);

  const getMessages = async () => {
    const response = await fetch(
      "http://localhost:5005/message/list-messages",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          studentUsername:
            myUsertype === "student" ? myUsername : viewingUsername,
          tutorUsername: myUsertype === "tutor" ? myUsername : viewingUsername,
        }),
      }
    );

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setMyMessages(data.messageList);
      console.log(data.messageList);
    }
  };

  React.useEffect(() => {
    getMessages();
  }, []);

  function change_date_format(date) {
    var year = date.slice(0, 4);
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);
    var time = date.slice(11, 19);
    var normaltime = new Date("1970-01-01T" + time + "Z").toLocaleTimeString(
      "en-US",
      { timeZone: "UTC", hour12: true, hour: "numeric", minute: "numeric" }
    );
    return normaltime + " " + day + "/" + month + "/" + year;
  }

  return (
    <>
      <NavBar></NavBar>

      <div className="message-container">
        <div className="message-card">
          <div className="message-title">{viewingUsername}</div>
          <div className="inner-container">
            <div className="inner-container-scroll">
              <div className="send-container">
                <div>
                  <TextField
                    id="filled-multiline-static"
                    label="Message"
                    multiline
                    rows={3}
                    defaultValue=""
                    variant="filled"
                    fullWidth
                  />
                </div>
                <Stack spacing={1} direction="row" className="send-button">
                  <Button variant="contained">Send</Button>
                </Stack>
              </div>
              {myMessages.map((message, idx) => {
                return (
                  <span key={idx} className="each-message">
                    <div className="image-div">
                      <img
                        src={defaultImage}
                        alt="default-image"
                        className="individual-profile-image-message"
                      />
                    </div>

                    <div className="message-div">
                      <div>
                        {message[5]}
                        <span className="message-time">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {change_date_format(message[3])}
                        </span>
                      </div>
                      <div className="message-text">{message[4]}</div>
                    </div>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
