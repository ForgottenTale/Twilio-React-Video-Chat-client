import React,{useState,useCallback } from 'react';
import Join from './components/join';
import './components/scss/app.scss';
import Room from './components/room'
import axios from "axios";


function App() {
  const [name, setUsername] = useState("")
  const [roomName, setRoomName] = useState("")
  const [token, setToken] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault()

    var data = {
      identity: name,
      roomname:roomName
    }
    var jwt = "";
    var url = "http://192.168.31.168:5000/jwt/";
    await axios.post(url, data).then(res => {
      jwt = res.data.token;
    })
      .catch(error => {
        console.error(error)
      })

    setToken(jwt)
  }

  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  const handleLogout = useCallback(event => {
    event.preventDefault()
    setToken(null)
  }, []);
  return (
    <div className="App">
     {!token ? <Join storeToken={setToken}  handleUsernameChange={handleUsernameChange}
         handleRoomNameChange={handleRoomNameChange}
         handleSubmit={handleSubmit}/> :  <Room roomName={roomName} token={token} handleLogout={handleLogout} />}
    </div>
  );
}

export default App;
