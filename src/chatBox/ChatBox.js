// chat box compent
import io from "socket.io-client";
import { useState, useEffect } from "react";
import Texts from "../Texts";

import SpotifyPlayer from "../spotifyStuff/SpotifyPlayer";

const user = io.connect("http://localhost:3001"); //connect frontend to backend

function ChatBox(props) {
  const [username, setusername] = useState("");
  const [chatroom, setchatroom] = useState("");
  const [displayText, setdisplaytext] = useState(false);

  useEffect(() => {
    setchatroom(props.genre);
  }, []);

  const joinroom = () => {
    //requirements to join room
    if (username !== "" && chatroom !== "") {
      //user join room
      user.emit("joinroom", chatroom);
      setdisplaytext(true);
    }
  };
  return (
    //takes in user info compentent
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
          <input
            type="text"
            placeholder="Song Room ID"
            onChange={(event) => {
              setchatroom(event.target.value);
            }}
          />
          <button onClick={joinroom}>Start Vibing</button>
        </div>
      )}
      <SpotifyPlayer displayText={displayText} genre={"r-n-b"}></SpotifyPlayer>
      {displayText && (
        <div className="spotifyAndText">
          <Texts user={user} username={username} chatroom={chatroom} />
        </div>
      )}
    </div>
  );
}

export default ChatBox;
