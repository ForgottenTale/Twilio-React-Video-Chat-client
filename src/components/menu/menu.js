import React from 'react';
import { makeStyles } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';
import GroupIcon from '@material-ui/icons/Group';
import CallEndIcon from '@material-ui/icons/CallEnd';

import './menu.scss'

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    boxShadow:'0 3px 5px 2px rgba(33, 203, 243, .3)',
    "&:hover": {
      backgroundColor: "solid"
    }
  }
});
function Menu({handleCallDisconnect, handleAudioToggle,handleVideoToggle,handleParticipantListToggle, toggleMenu}) {
  const classes = useStyles();
  let menuClass = 'Menu';
  if(toggleMenu){
    menuClass = 'Menu open';
  }
  
  return (
    <div className={menuClass} color="primary">
      <IconButton color="primary" onClick={handleAudioToggle} className={classes.root}>
        <MicIcon />
      </IconButton>
      <IconButton color="primary" onClick={handleVideoToggle}>
        <VideocamIcon />
      </IconButton>
      <IconButton color="primary" onClick={handleParticipantListToggle}>
        <GroupIcon />
      </IconButton>
      <IconButton color="secondary" onClick={handleCallDisconnect}>
        <CallEndIcon />
      </IconButton>

    </div>
  );
}

export default Menu;
