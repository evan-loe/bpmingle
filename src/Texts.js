import React, { useEffect, useState } from "react";

function Texts({user, username, chatroom }){
    const [currenttext, setcurrenttext] = useState("");

    const sendtext = async()=>{//send data to backend
        if (currenttext !==""){//prevent empty test
            const textData = {//data within a message
                chatroom: chatroom,
                sender: username,
                text: currenttext,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await user.emit("sendtext", textData);
        }
    };

    useEffect(()=>{
        user.on("gettext", (data)=>{
            console.log(data);
        })
    }, [user]);
    return(
        <div>
            <div className="text-header">
                <p>Chat Log</p>
            </div>
            <div className="text-body">

            </div>
            <div className="text-tosend">
                <input tpye="messange" placeholder="Hey, you like this song too?" onChange = {(event) => {setcurrenttext(event.target.value)}}/>
                <button onClick={sendtext}>&#9658;</button>
            </div>
        </div>
    );
}

export default Texts