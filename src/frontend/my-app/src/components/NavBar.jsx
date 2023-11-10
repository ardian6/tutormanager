import { Link } from "react-router-dom";
import PositionedMenu from "./PositionedMenu";
//import SideBar from "./SideBar";
import { Button } from "@mui/material";
import "./NavBar.css";
import NotificationDrawer from "../components/NotificationDrawer";

function NavBar() {
  return (
    <div className="NavBarContainer">
      <div className="NavBar">
        <div className="NavBarInfo">
          <div className="NavBarLeft">
            <NotificationDrawer></NotificationDrawer>
            <div className="dashboard-button">
              <Link to="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            </div>
            <Link to="/Recommendations">
              <Button>Recommendations</Button>
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
