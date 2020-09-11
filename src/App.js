import React,{useState,useCallback } from 'react';
import Join from './components/join/join';
import './app.scss';
import Room from './components/room/room'
import axios from "axios";
import imgPic from './components/assets/404.png';
import Loader from './components/loader/loader'


function App() {

  
  const [name, setUsername] = useState("")
  const [roomName, setRoomName] = useState("")
  const [token, setToken] = useState(false);
  const [handleError, setError ] = useState(false);
  const [loading, setLoader] = useState(false);
  

  const handleSubmit = async event => {
    event.preventDefault()
    setLoader(true);
    var data = {
      identity: name,
      roomname:roomName
    }
    var jwt = "";
    var url = "http://192.168.31.168:5000/jwt";
    // var url ="https://videochatserver2.herokuapp.com/jwt";

    await axios.post(url, data).then(res => {
      if(res.status!==404){
      jwt = res.data.token;
      setLoader(false);
      }
      else{
        setLoader(false);
        setError(true);
        
      }
    })
      .catch(error => {
        setLoader(false);
        console.error(error)
        setError(true);
      })

    setToken(jwt)
  }

  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {

    setRoomName(event.target.value);
  }, []);

  if(handleError){
    return (
      <div className="error" >
       <img src={imgPic} alt="404 Error"/>
      </div>
    );
  }
else if(loading){
  return <Loader type="Connecting"/>
}
else{
  return (
    <div className="App">

     
     {!token ? <Join storeToken={setToken}  handleUsernameChange={handleUsernameChange}
         handleRoomNameChange={handleRoomNameChange}
         handleSubmit={handleSubmit}/> :  <Room roomName={roomName} token={token} setToken={setToken} />}
    

    </div>
  );
}
  
}

export default App;
