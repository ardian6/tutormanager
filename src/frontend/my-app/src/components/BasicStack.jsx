import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import "./BasicStack.css";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Context, useContext } from "../Context";


export default function BasicStack({classes, setClasses}) {
  const { getters } = useContext(Context);
  const token = getters.token;

  const removeClass = async ({subject}) => {
    const response = await fetch("http://localhost:5005/profile/delete-course", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        courseToBeDeleted: subject,
      }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setClasses(classes.filter((x) => x !== subject));
    }
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={1}>
        {classes.map((subject, idx) => {
          return (<div key={idx}>
            {subject}
            <Button className="removebtn"variant="outlined" startIcon={<DeleteIcon />} size="small" onClick={() => {removeClass({subject})}}>Delete</Button>
            </div>)
        })}
      </Stack>
    </Box>
  );
}