import { useState } from "react";
import Main from "./mainPage/Main";
import Genres from "./mainPage/Genres";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatBox from "./chatBox/ChatBox";
import PrivacyPolicy from "./privacyPolicy/PrivacyPolicy";
import io from "socket.io-client";
io.connect(
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://bpmingle.herokuapp.com/"
); //connect frontend to backend

function App() {
  const [genre, setGenre] = useState("r-n-b");

  return (
    <div className="App">
      <div className="mainPage">
        <Router>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/genres" element={<Genres setGenre={setGenre} />} />
            <Route path="/chatroom" element={<ChatBox genre={genre} />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
