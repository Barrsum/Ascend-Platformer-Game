// src/components/Header.jsx
import React from 'react';
import './Header.css'; // We will update CSS

function Header() {
  return (
    <header className="app-header">
      {/* Content is now wrapped for centering */}
      <div className="header-content">
        <h1 className="header-title">Ascend</h1>
        <p className="header-creator-credit">- Created by Ram Bapat -</p>
      </div>
    </header>
  );
}

export default React.memo(Header);

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos