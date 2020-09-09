import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';
import GroupIcon from '@material-ui/icons/Group';
import CallEndIcon from '@material-ui/icons/CallEnd';

import './scss/menu.scss'

function Menu() {

  return (
    <div className="Menu" color="primary">
      <IconButton color="primary">
        <MicIcon />
      </IconButton>
      <IconButton color="primary">
        <VideocamIcon />
      </IconButton>
      <IconButton color="primary">
        <GroupIcon />
      </IconButton>
      <IconButton color="secondary" >
        <CallEndIcon />
      </IconButton>

    </div>
  );
}

export default Menu;
