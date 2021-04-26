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
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const url = "http://localhost:5000";
  const [users, setUsers] = useState('');
  const { logout } = useAuth0();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(url);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room });

    return () => {
      socket.emit("disconnet");
      socket.off();
    };
  }, [url, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  const sendMessages = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  console.log(message, messages);

  return (
    <div className="outerContainer">
      <Users users={users} />
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessages={sendMessages}
        />
      </div>
      <button className="logoutButton" onClick={() => logout({ returnTo: window.location.origin })} >logout</button>
    </div>
  );
};

export default Chat;
