import React, { Component } from "react";

import "./input.css";

const Input = ({ message, setMessage, sendMessages, room }) => {
  const doSomething = (e) => {
    sendMessages(e);
    e.currentTarget.value = "";
  };
  return (
    <>
      <form action="" className="form">
        <input
          disabled={
            room == null || room === "" || room === undefined ? true : false
          }
          type="text"
          className="input"
          placeholder="type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? doSomething(e) : null)}
        />
        <button className="sendButton" onClick={(e) => sendMessages(e)}>
          send
        </button>
      </form>
    </>
  );
};

export default Input;
