// chat box compent
import io from "socket.io-client";
import { useState } from "react";
import Texts from "../Texts";

const user = io.connect("http://localhost:3001"); //connect frontend to backend

function ChatBox() {
  const [username, setusername] = useState("");
  const [chatroom, setchatroom] = useState("");
  const [dispalyText, setdisplaytext] = useState(false);

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
      {!dispalyText ? ( //shows sign in if user is not signed in yet
        <div className="joinChatContainer">
          <h1>Ready to mingle?</h1>
          <input
            type="text"
            placeholder="First name, Last name"
            onChange={(event) => {
              setusername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Song Room"
            onChange={(event) => {
              setchatroom(event.target.value);
            }}
          />
          <button onClick={joinroom}>Start Vibing</button>
        </div>
      ) : (
        //display chat after sign in
        <Texts user={user} username={username} chatroom={chatroom} />
      )}
      ;
    </div>
  );
}

export default ChatBox;
