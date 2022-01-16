//import libraries
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const Server = require("socket.io").Server; //import socket.io library

app.use(cors()); //cors midware

const spotifyRoutes = require("./spotifyAuth");
app.use("/api", spotifyRoutes);

app.get("/cheese", () => {
  console.log("getting cheese");
});

const server = http.createServer(app); //generate server

const io = new Server(server, {
  //pass server created to socket.io
  cors: {
    origin: "http://localhost:3000", //to be changed
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

server.listen(3001, () => {
  console.log("is running");
});
