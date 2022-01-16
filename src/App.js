import Main from "./mainPage/Main";
import Genres from "./mainPage/Genres";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SpotifyPlayer from "./spotifyStuff/SpotifyPlayer";
import chatBox from "./chatBox/ChatBox";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001"); //connect frontend to backend
import Texts from "./Texts";

function App() {
  return (
    <div className="App">
      <div>
        Hi hi! we'll insert components here (like mini widgets) in this app.js
        file to add elements on this page
      </div>
      {/* TODO: remove this header thing and add our main page component here. We also probably need to decide what states needs to be lifted up to this level*/}
      <SpotifyPlayer genre="r-n-b"></SpotifyPlayer>
      <div className="mainPage">
        <Router>
          {/* <a href="/home">Go to home page.</a> */}
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/genres" element={<Genres />} />
          </Routes>
        </Router>
      </div>
      <div className="chatBox">{chatBox()}</div>
      {/* <div className="chatBox">{Texts()}</div> */}
    </div>
  );
}

export default App;
