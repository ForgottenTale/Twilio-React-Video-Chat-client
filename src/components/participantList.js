import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './scss/participantList.scss';

function ParticipantList({ participants }) {
    console.log(participants);
    var participantList = participants.map(participant =>
        <div className="participantList__participant" >
            <AccountCircleIcon className="participantList__participant__icon" />
            <p className="participantList__participant__name">{participant.identity}</p>
        </div>)

    return (<div className="participantList">
        <h3 className="participantList__title">Participants</h3>
        {participantList}
    </div>

    );


}

export default ParticipantList;


