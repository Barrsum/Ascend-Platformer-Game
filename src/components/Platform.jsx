// src/components/Platform.jsx
import React from 'react';
import './Platform.css';

function Platform({ x, y, width, height }) {
  const style = {
    left: `${x}px`,
    bottom: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
  };

  return <div className="platform" style={style}></div>;
}

export default Platform;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos