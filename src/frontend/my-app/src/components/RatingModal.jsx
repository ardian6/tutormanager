import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { List, ListItem, ListItemButton, Rating, TextField } from '@mui/material';
import { Context, useContext } from '../Context';
import "./RatingModal.css";
import Divider from '@mui/material/Divider';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RatingModal({token, tutorUser}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getRatings();
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  const [rating, setRating] = React.useState("");
  const [review, setReview] = React.useState("");
  const [ratings, setRatings] = React.useState([]);
  const { getters } = useContext(Context);
  const studentUser = getters.usernameGlobal;

  const getRatings = async () => {
    const response = await fetch(
        "http://localhost:5005/ratings/view-all-tutor-ratings",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            tutorUsername: tutorUser,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        setRatings(data['allRatingsTutor']);
      }
    }
    const makeRating = async () => {
        const response = await fetch(
            "http://localhost:5005/ratings/make-rating",
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                token: token,
                studentUsername: studentUser,
                tutorUsername: tutorUser,
                ratingNumber: rating,
                ratingMessage: review,
              }),
            }
          );
          const data = await response.json();
          if (data.error) {
            alert(data.error);
          } else {
            getRatings();
          }
    }

  return (
    <div>
      <Button onClick={handleOpen} className="individual-profile-button" variant="outlined">Ratings</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {tutorUser} reviews
          </Typography>
          <List>
            {ratings?.map((rating, idx) => {
                return (
                <ListItem disablePadding>
                  <ListItemButton class='rating-item'>
                    <div>
                        {rating[1]}
                      <br></br>
                      <Rating name="read-only" value={rating[5]} size='small' readOnly />
                      {rating[4]}
                    </div>
                  </ListItemButton>
                  <Divider />
                </ListItem>)
            })}
          </List>
          <hr></hr>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Make a rating
          </Typography>
          <TextField onChange={(e) => {setReview(e.target.value)}}>

          </TextField>
          <div>
            <Rating onChange={(e) => {setRating(e.target.value)}}></Rating>
          </div>
          <Button variant='outlined' onClick={() => {makeRating()}}>Submit Review</Button>
        </Box>
      </Modal>
    </div>
  );
}