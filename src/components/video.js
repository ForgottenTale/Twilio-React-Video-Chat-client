import React, { useEffect, useRef, useState } from 'react';
import "./scss/video.scss";
import Menu from './menu';

const TwilioVideo = require('twilio-video');


var disableAudio;
var roomg;

function Video({ token }) {
const[mic, setMic]=useState(true);
  // const localVidRef = useRef()

  const remoteVidRef = useRef()
 var set;
  useEffect(() => {

    TwilioVideo.connect(token, { video: true, audio: true, name: "test" }).then(
      room => {
        // Attach the local video

        roomg = room;
        TwilioVideo.createLocalVideoTrack().then(track => {
          remoteVidRef.current.appendChild(track.attach())
        })
     
        // Attach the participants video
        room.participants.forEach(participant => {
          participant.tracks.forEach(publication => {
            if (publication.track) {
              remoteVidRef.current.appendChild(publication.track.attach());
            }
          });

          participant.on('trackSubscribed', track => {
            remoteVidRef.current.appendChild(track.attach());
          });
        });

        // Attach the new participants video
        room.on('participantConnected', participant => {
          console.log(`Participant "${participant.identity}" connected`);

          participant.tracks.forEach(publication => {
            if (publication.isSubscribed) {
              const track = publication.track;
              remoteVidRef.current.appendChild(track.attach());
            }
          });

          participant.on('trackSubscribed', track => {
            remoteVidRef.current.appendChild(track.attach());
          });
        });

        room.on('participantDisconnected', participant => {
          console.log(`Participant disconnected: ${participant.identity}`);
        });

      
        
        

        if(!mic){
          room.localParticipant.videoTracks.forEach(publication => {
            publication.track.stop();
            publication.unpublish();
            console.log(mic);
          });
          
        }
        if(mic){
          room.localParticipant.audioTracks.forEach(publication => {
            publication.track.enable();
            console.log(mic);
            room.localParticipant.videoTracks.forEach(publication => {
              publication.track.enable();
            });
          });
        }


      }
    )
  }, [mic])

  function set(){
    setMic(false);console.log("off");
    
    
     
  }
  return (

    <div className="video" >
      <div ref={remoteVidRef}className = "video__remote"></div>
      <Menu room={set}/>
    </div>
  )
}

export default Video