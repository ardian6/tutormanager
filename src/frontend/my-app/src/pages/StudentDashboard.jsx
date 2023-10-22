import React from "react";
import "./StudentDashboard.css";
import NavBar from "../components/NavBar";
import { Context, useContext } from "../Context";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/Calendar";

const StudentDashboard = () => {
  const { getters } = useContext(Context);
  const token = getters.token;
  const [students, setStudents] = React.useState([]);
  const getAllStudents = async () => {
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
      <div className="studentdashboard-container">
        <div className="studentdashboard-card">
          <div className="student-dashboard-title">Student Dashboard</div>
          <div className="student-calendar">
            <Calendar token={token}></Calendar>
          </div>
          <div className="student-request-column">
            <div className="student-no-request-message">
              {students.map((student, idx) => {
                return (
                  <div key={idx} onClick={() => redirectStudent(student)}>
                    {student}
                  </div>
                )
              })}
            </div>
            <div className="student-request-title">
              <div className="student-request-word">Tutor Requests</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
