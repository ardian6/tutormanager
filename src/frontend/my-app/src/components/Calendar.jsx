import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { makeStyles } from '@mui/styles';

const localizer = momentLocalizer(moment);

export default function BasicDateCalendar({token}) {
  const [bookings, setBookings] = React.useState("");
  
  const getBookings = async () => {
    const response = await fetch(
      "http://localhost:5005/bookings/view-my-bookings",
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
      const dates = data.bookingsList.map((element) => {
        return {
          start: moment(element[3]).toDate(),
          end: moment(element[4]).toDate(),
        }
      });
      setBookings(dates);
    }
  }
  React.useEffect(() => {
    getBookings();
  }, []);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={bookings}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

