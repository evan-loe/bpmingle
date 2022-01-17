//import libraries
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const Server = require("socket.io").Server; //import socket.io library
const path = require("path");
console.log(require("dotenv").config({ path: path.join(__dirname, "./.env") }));

app.use(cors()); //cors midware
app.use(express.static(path.join(__dirname, "../client/build")));

const spotifyRoutes = require("./spotifyAuth");
app.use("/api", spotifyRoutes);

app.get("*", (req, res) => {
  console.log(path.join(__dirname, "../client/build/index.html"));
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const server = http.createServer(app); //generate server

const io = new Server(server, {
  //pass server created to socket.io
  cors: {
    origin:
      process.env.PRODUCTION_ENV === "PRODUCTION"
        ? "https://bpmingle.herokuapp.com/"
        : "http://localhost:3000", //to be changed
    methods: ["GET", "POST"],
  },
});

io.on("connection", (user) => {
  //detect connection-> log id
  console.log("User Joined: " + user.id);

  user.on("joinroom", (roomID) => {
    user.join(roomID);
    console.log("user: " + user.id + " joined chat room: " + roomID);
  });
  user.on("sendtext", (data) => {
    // console.log(data);
    user.to(data.chatroom).emit("gettext", data); //forward data to other users
  });
  user.on("disconnect", () => {
    //detect disconnect
    console.log("User Left: " + user.id);
  });
});

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log("is running");
});
