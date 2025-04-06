// src/components/Player.jsx
import React from 'react';
import './Player.css';

// Define player dimensions (export them so Game.jsx can use them)
export const PLAYER_WIDTH = 30;
export const PLAYER_HEIGHT = 50;

function Player({ playerX, playerY }) {
  // Use the received x and y props to position the player
  const playerStyle = {
    left: `${playerX}px`,
    bottom: `${playerY}px`, // Use 'bottom' because Y=0 is the ground
    width: `${PLAYER_WIDTH}px`,
    height: `${PLAYER_HEIGHT}px`,
  };

  return <div className="player" style={playerStyle}></div>;
}

export default Player;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos