import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ width: "100%", bgcolor: "background.paper", borderRadius: "10px" }}
    >
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Profile" />
        <Tab label="Messages" />
      </Tabs>
    </Box>
  );
}
