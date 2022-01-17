// chat box compent
import io from "socket.io-client";
import { useState } from "react";
import Texts from "../Texts";

import SpotifyPlayer from "../spotifyStuff/SpotifyPlayer";

const user = io.connect(
  process.env.PRODUCTION_ENV === "PRODUCTION"
    ? `https://bpmingle.herokuapp.com/${process.env.PORT || 3001}`
    : "http://localhost:3001/api/callback"
); //connect frontend to backend

function ChatBox(prop) {
  const [username, setusername] = useState("");
  const [displayText, setdisplaytext] = useState(false);
  const [genre, setGenre] = useState(
    localStorage.getItem("selectedGenre") ?? "r-n-b"
  );

  const joinroom = () => {
    //requirements to join room
    if (username !== "" && genre !== "") {
      //user join room
      user.emit("joinroom", genre);
      setdisplaytext(true);
    }
  };

  return (
    //takes in user info compentent
    <div className="parentChatContainer">
      <div className="chatRoomTitle">{`Signalling -> ${genre}`}</div>
      <div className="Appl">
        {!displayText && (
          <div className="joinChatContainer">
            <h1>Ready to mingle?</h1>
            <input
              type="text"
              placeholder="Name"
              onChange={(event) => {
                setusername(event.target.value);
              }}
            />
            {/* <input
              type="text"
              placeholder="Song Room ID"
              onChange={(event) => {
                setchatroom(event.target.value);
              }}
            /> */}
            <button onClick={joinroom}>Start Vibing</button>
          </div>
        )}
        <SpotifyPlayer displayText={displayText}></SpotifyPlayer>
        {displayText && (
          <div className="spotifyAndText">
            <Texts user={user} username={username} chatroom={genre} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatBox;
