import React, { useState, useCallback } from "react";

import './scss/join.scss';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 4,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    textDecoration: 'white',
    width:"300px",
  },
  buttonStyle:{
    width:"300px",
    margin:"15px",
    color:"white",
    
  }
});
function StartForm({
  handleUsernameChange,
  handleRoomNameChange,
  handleSubmit,
  storeToken
}) {
  
  const classes = useStyles();


  return (

    <form onSubmit={handleSubmit} className="joinForm">
      <TextField 
        label="Display Name" 
        margin="normal"
        id="name"
        name="name"
        variant="filled"
        className={classes.root}
        InputLabelProps={{ className: "joinForm__label" }}
        onChange={handleUsernameChange}
         />

      <TextField 
        label="Room Code" 
        margin="normal"
        id="room"
        name="room"
        InputLabelProps={{ className: "joinForm__label" }}
        className={classes.root}
        variant="filled"
        onChange={handleRoomNameChange} />

      <Button 
      type="submit" 
      color="primary" 
      className={classes.buttonStyle}
      
      >
        Join Room
        </Button>


    </form>

  )
}

export default StartForm