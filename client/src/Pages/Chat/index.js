import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { io } from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";

import "./chat.css";
import InfoBar from "../InfoBar";
import Input from "../Input";
import Messages from "../Messages";
import Users from "../Users";

let socket;

const Chat = ({ location }) => {
  const { user } = useAuth0();

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState("");
  const [userName, setUserName] = useState("");
  const { logout } = useAuth0();
  const url = "http://localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(url);
    const loadUsers = async () => {
      const profile = await user;
      socket.emit("getUsers", profile, (users) => {
        setUsers(users.filtered);
      });
    };
    loadUsers();

    setName(name);
    setRoom(room);

    return () => {
      socket.emit("disconnet");
      socket.off();
    };
  }, [location.search, user]);

  useEffect(() => {
    socket.on("message", (message) => {
      setUserName(message.to);
      setMessages([...messages, message]);
    });
  });

  const initiateChat = (room) => {
    let chatRoom = [];
    if (user.name && room) {
      chatRoom.push(room.replace(/\s/g, ""), user.name.replace(/\s/g, ""));
      const chat = chatRoom.sort().join("");
      socket.emit("chatRoom", chat);
    }
  };

  const sendMessages = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, name, user?.name, () =>
        setMessage("")
      );
    }
  };
  console.log(message, messages);

  return (
    <div className="outerContainer">
      <Users
        users={users}
        setRoom={setRoom}
        setName={setName}
        initiateChat={initiateChat}
      />
      <div className="container">
        <InfoBar room={room} />
        <Messages room={room} messages={messages} name={userName} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessages={sendMessages}
          room={room}
        />
      </div>
      <button
        className="logoutButton"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        logout
      </button>
    </div>
  );
};

export default Chat;
