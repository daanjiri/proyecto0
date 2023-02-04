import React, { useState, useContext, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { AuthContext } from '../context/auth-context';
import { NavLink } from 'react-router-dom';
import EventCard from '../components/EventCard';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

type Props = {};

const User = (props: Props) => {
  const [events, setEvents] = useState<null | any[]>(null);
  const { accessToken, userId, name } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(
        `http://127.0.0.1:5000/user/${userId}/events`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={1}
      alignItems="center"
      justifyContent={'center'}
      height={'100vh'}
    >
      <Typography variant="h4">hello {name}!</Typography>

      {!events || events.length === 0 ? (
        <>
          <Box>No available events</Box>
          <NavLink to="/event">
            <Button variant="contained">create Event</Button>
          </NavLink>
        </>
      ) : (
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={2}
          alignItems={'center'}
        >
          <Typography sx={{ fontSize: 18 }}>Your events:</Typography>
          {events
            .sort(
              (a, b) =>
                new Date(a.init_date).getTime() +
                new Date(b.init_date).getTime()
            )
            .map((event, idx) => {
              return (
                <EventCard
                  event={event}
                  setEvents={setEvents}
                  key={event.id + Math.random()}
                ></EventCard>
              );
            })}
          <NavLink to="/event">
            <Button variant="contained">create Event</Button>
          </NavLink>
        </Box>
      )}
    </Box>
  );
};

export default User;
