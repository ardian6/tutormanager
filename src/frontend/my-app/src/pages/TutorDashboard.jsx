import React from "react";
import "./TutorDashboard.css";
import NavBar from "../components/NavBar";
import { Context, useContext } from "../Context";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/Calendar";

const TutorDashboard = () => {
  const { getters } = useContext(Context);
  const token = getters.token;
  const [students, setStudents] = React.useState([]);
  const getAllStudents = async () => {
    console.log(token);
    const response = await fetch(
      "http://localhost:5005/profile/view-all-users",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      }
    );
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setStudents(data.usersList);
    }
  }

  const navigate = useNavigate()
  const redirectStudent = (id) => {
    const path = '/Profile/' + id
    navigate(path);
  }

  React.useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <div className="tutordashboard-container">
        <div className="tutordashboard-card">
          <div className="tutor-dashboard-title">Tutor Dashboard</div>
          <div className="tutor-calendar"><Calendar token={token}></Calendar></div>
          <div className="tutor-request-column">
            <div className="tutor-no-request-message">
              {students.map((student, idx) => {
                return (
                  <div key={idx} onClick={() => redirectStudent(student)}>
                    {student}
                  </div>
                )
              })}
            </div>
            <div className="tutor-request-title">
              <div className="tutor-request-word">Student Requests</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorDashboard;
