// src/components/Goal.jsx
import React from 'react';
import './Goal.css';

function Goal({ x, y, width, height }) {
  const style = {
    left: `${x}px`,
    bottom: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
  };

  return <div className="goal" style={style}>🏁</div>; // Using an emoji for now
}

export default Goal;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos