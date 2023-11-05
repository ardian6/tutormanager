import React from "react";
import "./Message.css";
import NavBar from "../components/NavBar";
import { Context, useContext } from "../Context";
// import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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
          studentUsername: myUsername,
          tutorUsername: viewingUsername,
        }),
      }
    );

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      // setMyMessages(data.listofalldata);
      console.log(data);
    }
  };

  React.useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <NavBar></NavBar>

      <div className="message-container">
        <div className="message-card">
          <div className="message-title">{viewingUsername}</div>
          <div className="inner-container">
            {/* {myMessages.map((course, idx) => {
                            return <span key={idx}>{course} </span>;
                          })} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
