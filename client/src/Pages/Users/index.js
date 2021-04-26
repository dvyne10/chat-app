import React, { Component } from "react";
import onlineIcon from "../../Icons/onlineIcon.png";

import "./users.css";

const Users = ({ users }) => {
  return (
    <>
      <div className="textContainer">
        <div>
          <h1>People currently online:</h1>
        </div>
        {users ? (
          <div>
            <div className="activeContainer">
              <h2>
                {users.map(({ name }) => (
                  <div key={name} className="activeItem" onClick={()=>{console.log('here')}}>
                    {name}
                    <img alt="Online Icon" src={onlineIcon} />
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
