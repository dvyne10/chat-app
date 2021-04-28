import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router";
import "./join.css";

let socket;

const Join = () => {
  const url = "http://localhost:5000";
  const { user, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("room 1");

  useEffect(() => {
    socket = io(url);
    socket.emit("saveUser",user);
  });
  
  if (isLoading) {
    return <div>loading...</div>;
  }

  return user && isAuthenticated ? (
    <Redirect to={`/chat`} />
  ) : (
    loginWithRedirect()
  );
};

export default Join;
