import React from "react";
import "./AdminDashboard.css";
import NavBar from "../components/NavBar";
import { Context, useContext } from "../Context";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminChangePasswordModal from "../components/AdminChangePasswordModal";
import Stack from "@mui/material/Stack";
import AddCourse from "../components/AddCourse";

const AdminDashboard = () => {
  const [tutorUsers, setTutorUsers] = React.useState([]);
  const [studentUsers, setStudentUsers] = React.useState([]);
  const [adminUsers, setAdminUsers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [curruser, setCurrUser] = React.useState("");
  const [courses, setCourses] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const { getters } = useContext(Context);
  const token = getters.token;
  const ownUsername = getters.usernameGlobal;

  const getUsers = async () => {
    const response = await fetch("http://localhost:5005/filter/admin-filter", {
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
      setTutorUsers(data.tutorList);
      setStudentUsers(data.studentList);
      setAdminUsers(data.adminList);
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
      setStudentUsers(studentUsers.filter((x) => x !== user["user"]));
      setAdminUsers(adminUsers.filter((x) => x !== user["user"]));
    }
  };
  const getCourses = async () => {
    const response = await fetch("http://localhost:5005/profile/view-all-courses", {
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
        setCourses(data.listcourses);
      }
  }
  const deleteCourses = async (subject) => {
    const response = await fetch("http://localhost:5005/profile/admin-delete-course", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          courseName: subject,
        }),
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        const temp = courses.filter((course) => course !== subject);
        setCourses(temp);
      }
  }

  const approveTutor = async (subject) => {
    const response = await fetch("http://localhost:5005/profile/admin-approve", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          targetTutor: subject,
        }),
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        getUsers();
      }
  }

  React.useEffect(() => {
    getUsers();
    getCourses();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <div className="admindashboard-container">
        <div className="admindashboard-card">
          <div className="admin-dashboard-title">Admin Dashboard</div>
          <div className="flex-box-container">
            <div>
              <b>Add/Delete Courses</b>
              <div>
                {courses?.map((course, idx) => {
                  return (<div key={idx}>{course} <Button className="removebtn"
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  size="small"
                  onClick={() => {deleteCourses(course)}}>Delete</Button></div>)
                })}
                <AddCourse getCourses={getCourses}></AddCourse>
              </div>
            </div>
            <div className="all-tutors-container">
              <b>All Tutors</b>
              <div>
                {tutorUsers.map((user, idx) => {
                  return (
                    <div key={idx}>
                      {user}
                      <Button
                        className="removebtn"
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          handleOpen();
                          setCurrUser(user);
                        }}
                      >
                        Change Password
                      </Button>
                      <AdminChangePasswordModal
                        open={open}
                        handleClose={handleClose}
                        token={token}
                        currentuser={curruser}
                      ></AdminChangePasswordModal>
                      {true ? 
                      <Button
                      className="removebtn"
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        approveTutor(user);
                      }}
                    >
                      Approve
                    </Button>
                    : <Button
                    className="removebtn"
                    variant="outlined"
                    size="small"
                    disabled
                  >
                    Approve
                  </Button>}
                      <Button
                        className="removebtn"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        size="small"
                        onClick={() => {
                          removeUser({ user });
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
                {studentUsers.map((user, idx) => {
                  // console.log(users);
                  return (
                    <div key={idx}>
                      {user}
                      <Button
                        className="removebtn"
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          handleOpen();
                          setCurrUser(user);
                        }}
                      >
                        Change Password
                      </Button>
                      <Button
                        className="removebtn"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        size="small"
                        onClick={() => {
                          removeUser({ user });
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="all-admin-container">
              <b>All Admins</b>
              <div>
                {adminUsers.map((user, idx) => {
                  // console.log(users);
                  if (ownUsername !== user) {
                    return (
                      <div key={idx}>
                        {user}
                        <Button
                          className="removebtn"
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          size="small"
                          onClick={() => {
                            removeUser({ user });
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    );
                  }
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
