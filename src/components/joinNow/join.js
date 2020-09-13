import React, { useEffect, useRef } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './join.scss';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';
import IconButton from '@material-ui/core/IconButton';


// This component allows the user to set his/her media preferences before entering the room

function Join({handleAudioToggle,handleVideoToggle,toggleAudio,toggleVideo}) {
    const useStyles = makeStyles({
        buttonStyle: {
            borderLeftRadius: "50%",
            color: "white",
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            marginLeft:"60px",
            "&:hover": {
                backgroundColor: "solid",
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            }

        },
        active: {
        
            color:"white",
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            "&:hover": {
              backgroundColor: "solid",
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            }
          },
          inactive: {

            color:"white",
            background: '#FF0F0F',
            "&:hover": {
              backgroundColor: "solid",
              background: '#FF0F0F',
            }
        
          }
    });

    const classes = useStyles();
    var videoRef = useRef();
    useEffect(() => {

        //    Gets the user's media

        navigator.mediaDevices.getUserMedia({
            video: true
        })
            .then(stream => {
                videoRef.current.srcObject = stream;
            })

    }, [videoRef])
    return (
        <div className="join">
            <div className="join__video"> <video ref={videoRef} ></video>
            
         <div className ="join__video__icons">  {toggleAudio ? <IconButton onClick={handleAudioToggle} className={classes.active} className={classes.margin}>< MicIcon /></IconButton> : <IconButton onClick={handleAudioToggle} className={classes.inactive} id="button"><MicOffIcon /></IconButton>}
      {toggleVideo ? <IconButton onClick={handleVideoToggle} className={classes.active} ><VideocamIcon /></IconButton> : <IconButton onClick={handleVideoToggle} className={classes.inactive}><VideocamOffIcon /></IconButton>}</div> </div>
           
            <div className="join__text">
                <h4 className="join__text__title">Are you ready to join the room ?</h4>
                <Button className={classes.buttonStyle}>Join Now</Button>
            </div>

        </div>
    )
}

export default Join