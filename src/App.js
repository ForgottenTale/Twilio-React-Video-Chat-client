import React,{useState} from 'react';
import Join from './components/join';
import Video from './components/video';
import './components/scss/app.scss'

function App() {

  const [token, setToken] = useState(false);
  return (
    <div className="App">
     {!token ? <Join storeToken={setToken} /> : <Video token={token}/>}
    </div>
  );
}

export default App;
