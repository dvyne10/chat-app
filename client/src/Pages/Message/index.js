import React, { Component, useEffect, useState } from "react";
import ReactEmoji from "react-emoji";
import { useAuth0 } from "@auth0/auth0-react";

import "./message.css";

const Message = ({ message: { user: me, message, to }, name }) => {
  // console.log(name)
  const { user } = useAuth0();

  const formattedName = name.trim();

  const [isSentByCurrentUser, setIsSentByCurrentUser] = useState(false);

  useEffect(() => {
    if (user.name === me) {
      setIsSentByCurrentUser(true);
    }
  }, [me]);

  return (
    <>
      {isSentByCurrentUser ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{me}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">
              {ReactEmoji.emojify(message)}
            </p>
          </div>
        </div>
      ) : (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">
              {ReactEmoji.emojify(message)}
            </p>
          </div>
          <p className="sentText pl-10 ">{to}</p>
        </div>
      )}
    </>
  );
};

export default Message;
