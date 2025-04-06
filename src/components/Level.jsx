// src/components/Level.jsx
import React from 'react';
import Platform from './Platform';
import Goal from './Goal';
// Import Enemy component later when needed

function Level({ levelData, children }) {
  if (!levelData) {
    return <div>Loading level...</div>; // Or handle error/loading state
  }

  return (
    <>
      {/* Render Platforms */}
      {levelData.platforms.map((platform, index) => (
        <Platform
          key={`platform-${levelData.id}-${index}`} // Unique key for each platform
          x={platform.x}
          y={platform.y}
          width={platform.width}
          height={platform.height}
        />
      ))}

      {/* Render Goal */}
      <Goal
         key={`goal-${levelData.id}`}
         x={levelData.goal.x}
         y={levelData.goal.y}
         width={levelData.goal.width}
         height={levelData.goal.height}
       />

      {/* Render Player (passed as children) */}
      {children}

      {/* Render Enemies later */}
      {/* {levelData.enemies?.map((enemy, index) => ... )} */}
    </>
  );
}

export default Level;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos