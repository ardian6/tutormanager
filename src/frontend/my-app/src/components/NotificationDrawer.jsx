import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Context, useContext } from "../Context";
import Badge from "@mui/material/Badge";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    Notification: false,
  });
  const { getters } = useContext(Context);
  const token = getters.token;

  const [notifications, setNotifications] = React.useState([]);

  const getNotifications = async () => {
    const response = await fetch("http://localhost:5005/notification/view", {
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
      setNotifications(data["notifList"]);
    }
  };

  const dismissNotification = async (id) => {
    const response = await fetch("http://localhost:5005/notification/dismiss", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        notificationID: id,
      }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      getNotifications();
    }
  };

  React.useEffect(() => {
    getNotifications();
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <List>
        {notifications.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                dismissNotification(text[0]);
              }}
            >
              {text[2]}
              <br></br>
              {text[3]}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Badge badgeContent={notifications.length} color="primary">
        {["Notifications"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </Badge>
    </div>
  );
}
