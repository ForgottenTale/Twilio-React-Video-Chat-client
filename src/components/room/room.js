import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from '../participant/participant';
import ParticipantList from '../participantList/participantList';
import './room.scss';
import Menu from '../menu/menu'

const Room = ({ roomName, token, setToken }) => {

    const [room, setRoom] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [toggleAudio, setToggleAudio] = useState(true);
    const [toggleVideo, setToggleVideo] = useState(true);
    const [toggleParticipantsList, setParticipantsList] = useState(false);


    console.log(toggleAudio);
    console.log(toggleVideo);
    useEffect(() => {
        const participantConnected = participant => {
            setParticipants(prevParticipants => [...prevParticipants, participant]);
        };
        const participantDisconnected = participant => {
            setParticipants(prevParticipants =>
                prevParticipants.filter(p => p !== participant)
            );
        };
        Video.connect(token, {
            name: roomName
        }).then(room => {
            setRoom(room);
            room.on('participantConnected', participantConnected);
            room.on('participantDisconnected', participantDisconnected);
            room.participants.forEach(participantConnected);
        });
        return () => {
            setRoom(currentRoom => {
                if (currentRoom && currentRoom.localParticipant.state === 'connected') {
                    currentRoom.localParticipant.tracks.forEach(function (trackPublication) {
                        trackPublication.track.stop();
                    });
                    currentRoom.disconnect();
                    return null;
                } else {
                    return currentRoom;
                }
            });
        };
    }, [roomName, token]);

    const handleCallDisconnect = () => {
        room.disconnect();
        setToken(null);
    };

    const handleAudioToggle = () => {
        room.localParticipant.audioTracks.forEach(track => {
            if (track.track.isEnabled) {
                track.track.disable();
            } else {
                track.track.enable();
            }
            setToggleAudio(track.track.isEnabled);
        });
    };

    const handleVideoToggle = () => {
        room.localParticipant.videoTracks.forEach(track => {
            if (track.track.isEnabled) {
                track.track.disable();
            } else {
                track.track.enable();
            }
            setToggleVideo(track.track.isEnabled);
        });
    };
    
    const handleParticipantListToggle = () =>{
        setParticipantsList((prevState)=>!prevState);

    }


    const remoteParticipants = participants.map(participant => (
        <Participant key={participant.sid} participant={participant} />
    ));
   
  
    return (
        <div className="room">
    
            {room ? (
                <div className="room__participants">
                    <Participant key={room.localParticipant.sid} participant={room.localParticipant} /> {remoteParticipants}
                </div> ) : ('')}
                <ParticipantList participants= {participants} toggleParticipantsList={toggleParticipantsList}/>
            <Menu handleAudioToggle={handleAudioToggle} handleVideoToggle={handleVideoToggle} handleCallDisconnect={handleCallDisconnect} handleParticipantListToggle={handleParticipantListToggle}/>
        </div>
    );

};

export default Room;