import React,{useState} from 'react';
import StartForm from './components/startform';
import Video from './components/video'

function App() {

  const [token, setToken] = useState(false);
  return (
    <div className="App">
     {!token ? <StartForm storeToken={setToken} /> : <Video token={token}/>}
    </div>
  );
}

export default App;
