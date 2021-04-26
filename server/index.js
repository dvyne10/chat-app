const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const { addUser, removeUser, getUser, getUserArray } = require("./utils/user");

const port = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    methods: ["GET", "POST"],
  },
});
app.use(router);
app.use(cors());

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id }, name, room);
    console.log(user);
    try {
      socket.join(user.room);

      socket.emit("message", {
        user: "admin",
        text: `${user.name}, welcome to ${user.room}`,
      });
      socket.broadcast.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} just hopped inside the room`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUserArray(user.room),
      });
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("sendMessage", (message) => {
    try {
      const user = getUser(socket.id);
      io.to(user.room).emit("message", { user: user.name, text: message });
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("disconnet", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUserArray(user.room),
      });
    }
  });
});

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
