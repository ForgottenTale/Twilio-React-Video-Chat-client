import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';
import GroupIcon from '@material-ui/icons/Group';
import CallEndIcon from '@material-ui/icons/CallEnd';

import './menu.scss'

function Menu({handleCallDisconnect, handleAudioToggle,handleVideoToggle,handleParticipantListToggle, toggleMenu}) {

  let menuClass = 'Menu';
  if(toggleMenu){
    menuClass = 'Menu open';
  }
  
  return (
    <div className={menuClass} color="primary">
      <IconButton color="primary" onClick={handleAudioToggle}>
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
