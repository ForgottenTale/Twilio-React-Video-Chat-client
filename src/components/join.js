import React, { useState } from "react";
import axios from "axios";
import './scss/join.scss';
import { Grid, TextField, Button, FormControl } from '@material-ui/core';
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
function StartForm({ storeToken }) {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")
  const classes = useStyles();

  const handleSubmit = async event => {
    event.preventDefault()

    var data = {
      identity: name,
    }
    var jwt = "";
    var url = "http://192.168.31.168:5000/jwt/";
    await axios.post(url, data).then(res => {
      jwt = res.data;
    })
      .catch(error => {
        console.error(error)
      })

    storeToken(jwt)
  }

  return (

    <form onSubmit={handleSubmit} className="joinForm">
      <TextField 
        label="Display Name" 
        margin="normal"
        id="name"
        name="name"
        value={name}
        variant="filled"
        className={classes.root}
        InputLabelProps={{ className: "joinForm__label" }}
        onChange={e => setName(e.target.value)}
         />

      <TextField 
        label="Room Code" 
        margin="normal"
        id="room"
        name="room"
        InputLabelProps={{ className: "joinForm__label" }}
        className={classes.root}
        variant="filled"
        onChange={e => setRoom(e.target.value)} />

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