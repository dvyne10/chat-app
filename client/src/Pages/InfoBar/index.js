import React, { Component } from "react";

import closeIcon from '../../Icons/closeIcon.png';
import onlineIcon from '../../Icons/onlineIcon.png';

import './infoBar.css'

const InfoBar = ({room}) => {
  return (
    <>
      <div className="infoBar">
        <div className="leftInnerContainer">
          <img className="onlineIcon" src={onlineIcon} alt="" />
          <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
          <a href="/">
              <img src={closeIcon} alt=""/>
          </a>
        </div>
      </div>
    </>
  );
};

export default InfoBar;
