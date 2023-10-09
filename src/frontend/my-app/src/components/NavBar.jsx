import { Link } from "react-router-dom";
import PositionedMenu from "./PositionedMenu";
import SideBar from "./SideBar";
import { Button } from "@mui/material";

function NavBar() {
    return (
        <div className="NavBarContainer">
            <div className="NavBar">
                <div className="NavBarInfo">
                    <SideBar></SideBar>
                    <div><Link to="/Dashboard"><Button>Dashboard</Button></Link></div>
                </div>
                <h4>
                    Tutor Manager
                </h4>
                <PositionedMenu className="ProfileContainer">Profile</PositionedMenu>
            </div>
        </div>
    )
}

export default NavBar;