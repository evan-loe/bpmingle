import React, { useEffect, useState } from "react";
import "./Texts.css";
import ScrollToBottom from "react-scroll-to-bottom";
import { formatTime } from "./utils/utils";

function Texts({ user, username, chatroom }) {
  const [currenttext, setcurrenttext] = useState("");
  const [texthistory, settexthistory] = useState([]); //stores chat histroy

  const sendtext = async () => {
    //send data to backend
    if (currenttext !== "") {
      //prevent empty test
      const textData = {
        //data within a message
        chatroom: chatroom,
        sender: username,
        text: currenttext,
        time: formatTime(),
      };
      await user.emit("sendtext", textData);
      settexthistory((history) => [...history, textData]); //displays own text
      setcurrenttext("");
    }
  };

  useEffect(() => {
    user.on("gettext", (textdata) => {
      //chat history
      console.log(textdata);
      settexthistory((history) => [...history, textdata]);
    });
  }, [user]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Chat Log</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {texthistory.map((textcontent) => {
            return (
              <div
                className="message"
                id={username === textcontent.sender ? "other" : "you"}
              >
                <div>
                  <div className="message-content">
                    <p>{textcontent.text}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{textcontent.time}</p>
                    <p id="author">{textcontent.sender}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currenttext}
          placeholder="Omg, I love this song!"
          onChange={(event) => {
            setcurrenttext(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendtext();
          }}
        />
        <button onClick={sendtext}>&#9658;</button>
      </div>
    </div>
  );
}

export default Texts;
