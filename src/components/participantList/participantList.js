import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './participantList.scss';
import { Button } from '@material-ui/core';

function ParticipantList({ participants, toggleParticipantsList,handleRemoveParticipant }) {

    var participantListClass = 'participantList';

    if (toggleParticipantsList) {

        participantListClass = 'participantList open';

    }

 

    var participantList = participants.map(participant =>
        <div key={participant.sid} className="participantList__participant" >
            <AccountCircleIcon className="participantList__participant__icon" />
            <div>
            <p className="participantList__participant__name">{participant.identity}</p>
            <p className="participantList__participant__role">Participant</p>
            </div>
            <Button onClick={handleRemoveParticipant(participant)}>Remove</Button>
        </div>)

    return (<div className={participantListClass}>
        <h3 className="participantList__title">Participants</h3>
        {participantList}
    </div>

    );


}

export default ParticipantList;


