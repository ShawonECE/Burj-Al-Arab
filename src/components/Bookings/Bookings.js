import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:4000/bookings?email=${loggedInUser.email}`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data));
    }, []);
    return (
        <div>
            <h1>Here is the bookings</h1>
            <ul>
                {
                    bookings.map(booking => <li>Name: {booking.name}, Email: {booking.email}, Room type: {booking.bedType}, From {booking.startDate} To {booking.endDate}</li>)
                }
            </ul>
        </div>
    );
};

export default Bookings;