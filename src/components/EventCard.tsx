import React, { useState, useContext, Dispatch, SetStateAction } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { AuthContext } from '../context/auth-context';
import { useHistory } from 'react-router-dom';
import { TextField, Box, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

type Props = {
  event: any;
  setEvents: Dispatch<SetStateAction<any[] | null>>;
};

const EventCard = ({ event, setEvents }: Props) => {
  const [isDetails, setIsDetails] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [title, setTitle] = useState(event.title);
  const [category, setCategory] = useState(event.category);
  const [place, setPlace] = useState(event.place);
  const [modality, setModality] = useState(event.modality);
  const [initDate, setInitDate] = React.useState<Dayjs | null>(
    dayjs(event.init_date)
  );
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs(event.end_date)
  );

  const { accessToken, userId } = useContext(AuthContext);

  const handleEditEvent = () => {
    setIsEdit(true);
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const handleChangeModality = (event: SelectChangeEvent) => {
    setModality(event.target.value as string);
  };

  const handleSubmit = async () => {
    console.log(initDate?.format('MM/DD/YY HH:mm:ss'));
    const updatedEvent = {
      title,
      category,
      place,
      modality,
      init_date: initDate?.format('MM/DD/YY'),
      end_date: endDate?.format('MM/DD/YY'),
      id: event.id,
    };
    const response = await fetch(`http://127.0.0.1:5000/event/${event.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedEvent),
    });
    const data = await response.json();
    setIsEdit(false);
    setEvents((prevState: any) => {
      const newState = [...prevState];
      const foundIndex = newState.findIndex((ev: any) => ev.id === data.id);
      newState[foundIndex] = updatedEvent;
      return newState;
    });
  };

  const handleDeleteEvent = async () => {
    const response = await fetch(`http://127.0.0.1:5000/event/${event.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    setEvents((prev: any) => prev?.filter((ev: any) => ev.id !== data.id));
  };

  return (
    <>
      {!isEdit ? (
        <Box>
          <Card key={event.id}>
            <CardContent>
              <Box width={400}>
                <Typography variant="h5">{event.title}</Typography>
                {isDetails && (
                  <>
                    <Typography variant="body1" color="text.secondary">
                      place: {event.place}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      category: {event.category}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      modality: {event.modality}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      initial date:{' '}
                      {dayjs(event.init_date).format('DD/MM/YYYY')}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      end date: {dayjs(event.end_date).format('DD/MM/YYYY')}
                    </Typography>
                  </>
                )}
              </Box>
            </CardContent>
            <CardActions>
              <Box
                display={'flex'}
                justifyContent={'space-around'}
                width={'100%'}
              >
                <Button size="small" onClick={handleEditEvent}>
                  edit
                </Button>
                <Button size="small" onClick={handleDeleteEvent}>
                  delete
                </Button>
                <Button
                  size="small"
                  onClick={() => setIsDetails((prev: boolean) => !prev)}
                >
                  detail
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Box>
      ) : (
        <Box>
          <Card>
            <Box
              display={'flex'}
              // flexDirection={'column'}
              alignItems="center"
              justifyContent={'center'}
              // height={'100vh'}
              width={'400px'}
              gap={2}
              padding={2}
            >
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems="center"
                justifyContent={'center'}
                gap={2}
              >
                <TextField
                  required
                  id="outlined-required"
                  label="Name"
                  defaultValue={title}
                  onChange={(e: any) => setTitle(e.target.value)}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Cat"
                    onChange={handleChangeCategory}
                    fullWidth
                  >
                    <MenuItem value={'Conference'}>Conference</MenuItem>
                    <MenuItem value={'Seminar'}>Seminar</MenuItem>
                    <MenuItem value={'Congress'}>Congress</MenuItem>
                    <MenuItem value={'Course'}>Course</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  required
                  id="outlined-required"
                  label="Place"
                  defaultValue={place}
                  onChange={(e: any) => setPlace(e.target.value)}
                  fullWidth
                />
              </Box>

              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems="center"
                justifyContent={'center'}
                gap={2}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Modality
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={modality}
                    label="Cat"
                    onChange={handleChangeModality}
                    fullWidth
                  >
                    <MenuItem value={'On Campus'}>On Campus</MenuItem>
                    <MenuItem value={'Online'}>Online</MenuItem>
                  </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="init date"
                    value={initDate}
                    onChange={(newValue) => {
                      setInitDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="end date"
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems="center"
              justifyContent={'center'}
              // height={'100vh'}
              width={'400px'}
              paddingBottom={2}
            >
              <Button variant="contained" onClick={handleSubmit}>
                Submit Edition
              </Button>
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
};

export default EventCard;
