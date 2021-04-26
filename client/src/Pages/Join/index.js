import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router";

import "./join.css";

const Join = () => {
  const { user, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("room 1");

  if (isLoading) {
    return <div></div>;
  }

  return user && isAuthenticated ? (
    <Redirect to={`/chat?name=${user.given_name}&room=${room}`} />
  ) : (
    loginWithRedirect()
  );
};

export default Join;
