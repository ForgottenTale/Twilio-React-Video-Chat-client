import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './participantList.scss';

function ParticipantList({ participants,toggleParticipantsList}) {
    console.log(participants);
    var participantListClass = 'participantList';
    if(toggleParticipantsList)
    {
       participantListClass = 'participantList open';
    }
    var participantList = participants.map(participant =>
        <div className="participantList__participant" >
            <AccountCircleIcon className="participantList__participant__icon" />
            <p className="participantList__participant__name">{participant.identity}</p>
        </div>)

    return (<div className={participantListClass}>
        <h3 className="participantList__title">Participants</h3>
        {participantList}
    </div>

    );


}

export default ParticipantList;


