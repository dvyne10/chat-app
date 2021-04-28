const express = require("express");
require("./db/mongo");
const User = require("./models/user");
const Message = require("./models/message");
const Room = require("./models/room");
const config = require('./config.json')

const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const { addUser, removeUser, getUser, getUserArray } = require("./utils/user");

const port = config.port || 5000;

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
  socket.on("join", (acc, { name, room }, callback) => {
    // console.log(acc);
    // const { name: userName, email: userEmail } = acc;
    // const newUser = new User({ name: userName, email: userEmail });
    // newUser.save();
    // const { error, user } = addUser({ id: socket.id }, name, room);
    // try {
    //   socket.join(user.room);
    //   socket.emit("message", {
    //     user: "admin",
    //     text: `${user.name}, welcome to ${user.room}`,
    //   });
    //   socket.broadcast.to(user.room).emit("message", {
    //     user: "admin",
    //     text: `${user.name} just hopped inside the room`,
    //   });
    //   io.to(user.room).emit("roomData", {
    //     room: user.room,
    //     users: getUserArray(user.room),
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
  });

  socket.on("saveUser", async (user, callback) => {
    try {
      const { name, email } = await user;
      const { newUser, error } = addUser({ id: socket.id, name, email });
      callback(error);
    } catch (e) {}
  });

  socket.on("getUsers", async (me, callback) => {
    try {
      const users = await User.find();
      const filtered = users.filter((e) => e.name !== me.name);
      callback({ filtered });
    } catch (e) {}
  });

  socket.on("chatRoom", async (chat) => {
    try {
      const chatRoom = new Room({ name: chat });
      await chatRoom.save().then((data) => console.log(data, "data"));
    } catch (e) {}
  });

  socket.on("sendMessage", async (message, name, me) => {
    try {
      let chatRoom = [];
      chatRoom.push(name.replace(/\s/g, ""), me.replace(/\s/g, ""));
      const mRoom = chatRoom.sort().join("");

      socket.join(mRoom);

      //users from db
      const users = await User.find();
      const filteredName = users.filter((e) => e.name == me);

      const room = await Room.find({ name: mRoom });

      if (room) {
        const messages = new Message({
          message: message,
          sentBy: filteredName[0]._id,
        });

        await messages.save();
      }

      io.to(mRoom).emit("message", { user: me, message: message,to:name });
    } catch (e) {}
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
