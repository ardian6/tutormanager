import React from "react";
import "./AdminDashboard.css";
import NavBar from "../components/NavBar";
import { Context, useContext } from "../Context";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminDashboard = () => {
  const [users, setUsers] = React.useState([]);
  const { getters } = useContext(Context);
  const token = getters.token;

  const getUsers = async () => {
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
      setUsers(data.usersList);
    }
  }

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
      setUsers(users.filter((x) => x !== user['user']));
    }
  }

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <div className="admindashboard-container">
        <div className="admindashboard-card">
          <div className="admin-dashboard-title">Admin Dashboard</div>
          <div>
            <b>All Tutors</b>
            <div>
              {users.map((user, idx) => {
                return (<div key={idx}>
                  {user}
                  <Button className="removebtn"variant="outlined" startIcon={<DeleteIcon />} size="small" onClick={() => {removeUser({user})}}>Delete</Button>
                </div>)
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
