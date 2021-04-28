import React, { useState, useEffect } from "react";
import onlineIcon from "../../Icons/onlineIcon.png";

import "./users.css";

const Users = ({ users, setRoom, setName,initiateChat}) => {
  return (
    <>
      <div className="textContainer">
        <div>
          <h1>chats:</h1>
        </div>
        {users ? (
          <div>
            <div className="activeContainer">
              <h2>
                {users.map(({ name }) => (
                  <div key={name} className="activeItem">
                    <button
                      className="chatButton"
                      onClick={() => {
                        setRoom(name);
                        setName(name);
                        initiateChat(name)
                      }}
                    >
                      {name}
                      <img alt="Online Icon" src={onlineIcon} />
                    </button>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Users;
