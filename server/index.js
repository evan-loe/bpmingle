//import libraries
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const Server = require("socket.io").Server;//import socket.io library

app.use(cors());//cors midware

const server = http.createServer(app);//generate server

const io = new Server(server, {//pass server created to socket.io
    cors: {
        origin: "http://localhost:3000",//to be changed
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket)=> {//detect connection-> log id
    console.log(socket.id);

    socket.on("disconnect", ()=> {//detect disconnect
        console.log("User Has Left", socket.id);
    });
});

server.listen(3001, () => {
    console.log("is running")
});