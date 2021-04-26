import React, { Component } from "react";

import "./input.css";

const Input = ({ message, setMessage, sendMessages }) => {
  return (
    <>
      <form action="" className="form">
        <input
          type="text"
          className="input"
          placeholder="type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessages(e) : null)}
        />
        <button className="sendButton" onClick={(e) => sendMessages(e)}>send</button>
      </form>
    </>
  );
};

export default Input;
