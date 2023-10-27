import React from "react";
import "./AdminDashboard.css";
import NavBar from "../components/NavBar";
import { Context, useContext } from "../Context";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminDashboard = () => {
  const [tutorUsers, setTutorUsers] = React.useState([]);
  const { getters } = useContext(Context);
  const token = getters.token;

  // const getUsers = async () => {
  //   const response = await fetch(
  //     "http://localhost:5005/profile/view-all-users",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         token: token,
  //       }),
  //     }
  //   );
  //   const data = await response.json();
  //   if (data.error) {
  //     alert(data.error);
  //   } else {
  //     console.log(data);
  //     setUsers(data.usersList);
  //   }
  // };

  const getUsers = async () => {
    const response = await fetch("http://localhost:5005/filter/filter-tutor", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        course: "",
        location: "",
        timezone: "",
        rating: "",
      }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      // setStudents(data.listofalldata);
      console.log(data.listofalldata);
      setTutorUsers(data.listofalldata);
    }
  };

  const removeUser = async (user) => {
    const response = await fetch("http://localhost:5005/profile/admin-delete", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        targetProfile: user,
      }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setTutorUsers(tutorUsers.filter((x) => x !== user["user"]));
    }
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <div className="admindashboard-container">
        <div className="admindashboard-card">
          <div className="admin-dashboard-title">Admin Dashboard</div>
          <div className="flex-box-container">
            <div className="all-tutors-container">
              <b>All Tutors</b>
              <div>
                {tutorUsers.map((user, idx) => {
                  // console.log(users);
                  return (
                    <div key={idx}>
                      {user["username"]}
                      <Button
                        className="removebtn"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        size="small"
                        onClick={() => {
                          removeUser(user["username"]);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="all-students-container">
              <b>All Students</b>
              <div>
                {tutorUsers.map((user, idx) => {
                  // console.log(users);
                  return (
                    <div key={idx}>
                      {user["username"]}
                      <Button
                        className="removebtn"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        size="small"
                        onClick={() => {
                          removeUser(user["username"]);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
