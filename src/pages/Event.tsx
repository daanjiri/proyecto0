import React, { useState, useContext } from 'react';
import { TextField, Box, Button } from '@mui/material';
import { AuthContext } from '../context/auth-context';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { useHistory } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const Event = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [place, setPlace] = useState('');
  const [modality, setModality] = useState('');
  const [initDate, setInitDate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);

  const history = useHistory();

  const { accessToken, userId } = useContext(AuthContext);

  const handleSubmit = async () => {
    console.log(initDate?.format('MM/DD/YY HH:mm:ss'));
    const response = await fetch(
      `http://127.0.0.1:5000/user/${userId}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title,
          category,
          place,
          modality,
          init_date: initDate?.format('MM/DD/YY'),
          end_date: endDate?.format('MM/DD/YY'),
        }),
      }
    );
    const data = await response.json();
    history.push('/');
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const handleChangeModality = (event: SelectChangeEvent) => {
    setModality(event.target.value as string);
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={1}
      alignItems="center"
      justifyContent={'center'}
      height={'100vh'}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems="center"
        justifyContent={'center'}
        height={'100vh'}
        width={230}
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
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
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
        {/* <TextField
          required
          id="outlined-required"
          label="Modality"
          defaultValue={modality}
          onChange={(e: any) => setModality(e.target.value)}
          fullWidth
        /> */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Modality</InputLabel>
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

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};
export default Event;
