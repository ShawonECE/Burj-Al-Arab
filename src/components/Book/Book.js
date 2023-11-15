import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Button } from '@mui/material';

const Book = () => {
    const [dateValue, setDateValue] = useState({
        startDate: new Date(),
        endDate: new Date()
    });
    const handleStartDateChange = (value) => {
        const newDate = {...dateValue};
        newDate.startDate = value;
        setDateValue(newDate);
    };

    const handleEndDateChange = (value) => {
        const newDate = {...dateValue};
        newDate.endDate = value;
        setDateValue(newDate);
    };
    const {bedType} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const handleBooking = () => {
        const newBooking = {...loggedInUser, ...dateValue};
        newBooking.bedType = bedType;
        fetch('http://localhost:4000/addBooking', {
            method: 'POST',
            body: JSON.stringify(newBooking),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
          .then(res => res.json())
          .then(data => console.log(data));
    };
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Let's book a {bedType} Room, {loggedInUser.name}</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Start Date"
                value={dateValue.startDate}
                onChange={(newValue) => handleStartDateChange(newValue)}
                inputFormat="MM-DD-YYYY" 
            />
            <DatePicker
                label="End Date"
                value={dateValue.endDate}
                onChange={(newValue) => handleEndDateChange(newValue)}
                inputFormat="MM-DD-YYYY"
            />
            </LocalizationProvider>
            <br /><br />
            <Button variant="contained" style={{backgroundColor: '#FF5733'}} onClick={handleBooking}>Book</Button>
        </div>
    );
};

export default Book;