import React, { Component } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../Message";

import "./messages.css";

const Messages = ({ messages, name, room }) => {
  return (
    <>
      <ScrollToBottom className="messages">
        {room &&
          messages.map((message, i) => {
            console.log(message)
            return (
              <div key={i}>
                <Message message={message} name={name}/>
              </div>
            );
          })}
      </ScrollToBottom>
    </>
  );
};

export default Messages;
