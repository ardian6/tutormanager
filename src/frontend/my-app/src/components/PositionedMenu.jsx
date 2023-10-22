import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Context, useContext } from "../Context";
import { useNavigate } from "react-router-dom";
import BasicModal from "./BasicModal";
import { Link } from "react-router-dom";

function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  let navigate = useNavigate();
  const handleClose = () => {
    // navigate("../profile");
    setAnchorEl(null);
  };

  const { getters, setters } = useContext(Context);
  const token = getters.token;
  const setToken = setters.setToken;
  const setUsernameGlobal = setters.setUsernameGlobal;
  const setUserTypeGlobal = setters.setUserTypeGlobal;

  const logoutBtn = async () => {
    const response = await fetch("http://localhost:5005/auth/logout/", {
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
      setToken("");
      setUsernameGlobal("");
      setUserTypeGlobal("");
    }
    handleClose();
  };

  const profileBtn = () => {
    navigate("../profile");
    handleClose();
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Profile
      </Button>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={profileBtn}>Profile</MenuItem>
        <MenuItem onClick={logoutBtn}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default PositionedMenu;
