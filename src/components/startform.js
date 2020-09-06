import React, { useState } from "react"
import axios from "axios"

const StartForm = ({ storeToken }) => {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")

  const handleSubmit = async event => {
    event.preventDefault()

    var data = {
      identity: name,
    }
    var jwt ="";
    var url = "https://videochat-servers.herokuapp.com/jwt/";
    await axios.post(url, data).then(res => {
      jwt = res.data;
    })
      .catch(error => {
        console.error(error)
      })

    storeToken(jwt)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Display Name: <br />
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor="room">
        Room to Join: <br />
        <input
          type="text"
          id="room"
          name="room"
          value={room}
          onChange={e => setRoom(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Join Video Chat</button>
    </form>
  )
}

export default StartForm