import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { AttachMoney, LocalHotel, Wc } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Room = ({room}) => {
  const navigate = useNavigate();
  const handleBook = (bedType) => {
    navigate(`/book/${bedType}`);
}
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {room.avatar}
          </Avatar>
        }
        title={room.title}
      />
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={room.imgUrl}
          alt="room image"
        />
        <CardContent>
          <br/>
          <Typography variant="body2" color="text.secondary">
            {room.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <IconButton aria-label="add to favorites">
          <LocalHotel/>: {room.bed} 
        </IconButton>
        <IconButton aria-label="share">
          <Wc/>: {room.capacity} 
        </IconButton>
        <IconButton aria-label="price">
          <AttachMoney/>: {room.price} 
        </IconButton>
        <Button variant="contained" onClick={() => handleBook(room.bedType)}>Book</Button>
      </CardActions>
    </Card>
  );
};

export default Room;