import { useState } from "react";
import Main from "./mainPage/Main";
import Genres from "./mainPage/Genres";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SpotifyPlayer from "./spotifyStuff/SpotifyPlayer";
import ChatBox from "./chatBox/ChatBox";
import io from "socket.io-client";
const socket = io.connect(
  process.env.PRODUCTION_ENV === "DEVELOPMENT"
    ? "http://localhost:3001"
    : "https://bpmingle.herokuapp.com/"
); //connect frontend to backend
// import Texts from "./Texts";

function App() {
  const [genre, setGenre] = useState("r-n-b");

  return (
    <div className="App">
      {/* TODO: remove this header thing and add our main page component here. We also probably need to decide what states needs to be lifted up to this level*/}
      {/* <SpotifyPlayer genre="r-n-b"></SpotifyPlayer> */}
      <div className="mainPage">
        <Router>
          {/* <a href="/home">Go to home page.</a> */}
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/genres" element={<Genres setGenre={setGenre} />} />
            <Route path="/chatroom" element={<ChatBox genre={genre} />} />
          </Routes>
        </Router>
      </div>
      {/* <div className="chatBox">{Texts()}</div> */}
    </div>
  );
}

export default App;
