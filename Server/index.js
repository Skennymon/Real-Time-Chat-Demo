
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors')
app.use(cors());
const server = http.createServer(app);
let dataArray = [''];

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
});

io.on("connection", (socket) => {
    console.log(`User Connect: ${socket.id}`);
    io.emit("receiveArray", dataArray);
    socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
    });

    socket.on("updateMessage", (inputtedArray) => {
        dataArray = inputtedArray;
        console.log("Received Array");
        console.log(inputtedArray);
        io.emit("receiveArray", inputtedArray);
    });

    socket.on("getMessages", () => {
        io.emit("receiveArray", dataArray);
    })
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.get('/', (req, res) => {
    return res.json({
        Name: "Hello"
    });
});

