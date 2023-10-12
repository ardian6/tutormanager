import { Link } from "react-router-dom";
import PositionedMenu from "./PositionedMenu";
//import SideBar from "./SideBar";
import { Button } from "@mui/material";
import "./NavBar.css";

function NavBar() {

  return (
    <div className="NavBarContainer">
      <div className="NavBar">
        <div className="NavBarInfo">
          <div>
            <Link to="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </div>
        </div>
        <h4 className="tutormanager-title">Tutor Manager</h4>
        <PositionedMenu className="ProfileContainer">Profile</PositionedMenu>
      </div>
    </div>
  );
}

export default NavBar;
