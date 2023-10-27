import React from "react";
import "./AdminDashboard.css";
import NavBar from "../components/NavBar";
import { Context, useContext } from "../Context";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminChangePasswordModal from "../components/AdminChangePasswordModal";
import Stack from "@mui/material/Stack";
const AdminDashboard = () => {
  const [tutorUsers, setTutorUsers] = React.useState([]);
  const [studentUsers, setStudentUsers] = React.useState([]);
  const [adminUsers, setAdminUsers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [curruser, setCurrUser] = React.useState("");

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
      // setStudents(data.listofalldata);
      // console.log(data);
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
                  return (
                    <div key={idx}>
                      {user}
                      <Button
                        className="removebtn"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
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
                      <AdminChangePasswordModal
                        open={open}
                        handleClose={handleClose}
                        token={token}
                        currentuser={curruser}
                      ></AdminChangePasswordModal>
                      {console.log(curruser)}
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
                        startIcon={<DeleteIcon />}
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
