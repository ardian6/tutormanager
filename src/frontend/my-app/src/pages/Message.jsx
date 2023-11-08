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
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";

const Message = () => {
  const { getters } = useContext(Context);
  const token = getters.token;
  const myUsername = getters.usernameGlobal;
  const myUsertype = getters.userTypeGlobal;

  const param = useParams();
  const viewingUsername = param.username;

  const [myMessages, setMyMessages] = React.useState([]);

  const [checkedAsync, setCheckedAsync] = React.useState(false);

  const [message, setMessage] = React.useState("");
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
      setCheckedAsync(true);
    }
  };

  const sendMessage = async () => {
    if (message.length === 0) {
      alert("Message must not be an empty string.");
      return;
    }
    var moment = require("moment");
    var time = moment().format("YYYY-MM-DD H:mm:ss");
    console.log(time);
    const response = await fetch("http://localhost:5005/message/send-message", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        studentUsername:
          myUsertype === "student" ? myUsername : viewingUsername,
        tutorUsername: myUsertype === "tutor" ? myUsername : viewingUsername,
        sentBy: myUsername,
        timestamp: time,
        message: message,
      }),
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      // console.log(data.messageList);
      // setMyMessages(data.messageList);
      // setCheckedAsync(true);
      getMessages();
    }
  };

  React.useEffect(() => {
    getMessages();
  }, []);

  React.useEffect(() => {
    if (document.getElementById("scroll-bottom")) {
      let scroll_to_bottom = document.getElementById("scroll-bottom");
      scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
    }
  }, [myMessages]);

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
          <div className="inner-container" id="scroll-bottom">
            {checkedAsync === false && (
              <div className="message-loading">
                <CircularProgress />
              </div>
            )}
            {checkedAsync === true && myMessages.length === 0 && (
              <div className="no-messages-message">
                No existing conversation with {viewingUsername}. Start Messaging
                now!
              </div>
            )}

            <div className="inner-container-scroll">
              {myMessages.map((message, idx) => {
                // {
                //   console.log(message[5]);
                // }
                return message[5] !== myUsername ? (
                  <span key={idx} className="each-message-other">
                    <div className="other-image-div">
                      <img
                        src={defaultImage}
                        alt="default-image"
                        className="other-individual-profile-image-message"
                      />
                    </div>

                    <div className="other-message-div">
                      <div>
                        {message[5]}
                        <span className="other-message-time">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {change_date_format(message[3])}
                        </span>
                      </div>
                      <div className="other-message-text">{message[4]}</div>
                    </div>
                  </span>
                ) : (
                  <span key={idx} className="each-message-mine">
                    <div className="mine-image-div">
                      <img
                        src={defaultImage}
                        alt="default-image"
                        className="mine-individual-profile-image-message"
                      />
                    </div>

                    <div className="mine-message-div">
                      <div className="mine-message-info">
                        {message[5]}
                        <span className="mine-message-time">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {change_date_format(message[3])}
                        </span>
                      </div>
                      <div className="mine-message-text">{message[4]}</div>
                    </div>
                  </span>
                );
              })}
            </div>
          </div>
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
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </div>
            <Stack spacing={1} direction="row" className="send-button">
              <Button
                variant="contained"
                onClick={() => {
                  sendMessage();
                }}
              >
                Send
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
