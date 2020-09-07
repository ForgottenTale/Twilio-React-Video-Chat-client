import React, { useEffect, useRef } from 'react';
const TwilioVideo = require('twilio-video');



function Video({ token }) {

  const localVidRef = useRef()
  const remoteVidRef = useRef()

  useEffect(() => {

    TwilioVideo.connect(token, { video: true, audio: true, name: "test" }).then(
      room => {
        // Attach the local video
        TwilioVideo.createLocalVideoTrack().then(track => {
          localVidRef.current.appendChild(track.attach())
        })

        // Attach the participants video
        room.participants.forEach(participant => {
          participant.tracks.forEach(publication => {
            if (publication.track) {
              localVidRef.current.appendChild(publication.track.attach());
            }
          });

          participant.on('trackSubscribed', track => {
            localVidRef.current.appendChild(track.attach());
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




      }
    )
  }, [token])
  return (

    <div>
      <div ref={localVidRef} />
      <div ref={remoteVidRef} />
    </div>
  )
}

export default Video