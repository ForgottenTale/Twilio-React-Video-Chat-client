import React,{useState,useCallback } from 'react';
import StartForm from './components/startForm/startForm';
import './app.scss';
import Room from './components/room/room'
import axios from "axios";
import imgPic from './components/assets/404.png';
import Loader from './components/loader/loader';
import Reconnection from './components/reconnection/reconnecting';
// import JoinNow from './components/joinNow/join'


function App() {

  
  const [name, setUsername] = useState(null)
  const [roomName, setRoomName] = useState(null)
  const [token, setToken] = useState(false);
  const [handleError, setError ] = useState(false);
  const [loading, setLoader] = useState(false);
  const [reconnecting, setReconnection] = useState(false);
  var jwt = "";
  var url = "http://192.168.31.168:5000/jwt";

  const handleSubmit = async event => {
    event.preventDefault();
    setReconnection(false);
    setLoader(true);
    console.log(name);
   
    if(!reconnecting && name!==null && !roomName!==null){
    
      
      var data = {
        identity: name,
        roomname:roomName
      }
 
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
    else{
      setLoader(false);
      console.log(token);
    }
   

    
    
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
else if(reconnecting){
  return <Reconnection handleSubmit={handleSubmit} setToken={setToken}/>
}
else{
  return (
    <div className="App">

     
     {!token ? <StartForm storeToken={setToken}  handleUsernameChange={handleUsernameChange}
         handleRoomNameChange={handleRoomNameChange}
         handleSubmit={handleSubmit}/> :<Room roomName={roomName} token={token} setToken={setToken} setReconnection={setReconnection} setLoader={setLoader}/>}
         
    

    </div>
  );
}
  
}

export default App;
