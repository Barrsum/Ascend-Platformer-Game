// src/components/HomeScreen.jsx
import React, { useState } from 'react';
import HowToPlayModal from './HowToPlayModal';
import './HomeScreen.css';
import SettingsIcon from '../assets/settings.svg?react';

function HomeScreen({
    onStartGame,
    isTouchDevice,
    forceShowControls,
    onToggleForceShowControls
}) {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="home-screen">
      <div className="home-content"> {/* Added inner wrapper */}
        <h1 className="game-title-home">Ascend</h1>
        <p className="game-subtitle-home">Reach the Summit</p>

        <div className="home-button-container">
          <button className="btn-home btn-start-home" onClick={onStartGame}>
            Start Climb
          </button>
          <button className="btn-home btn-how-to-play-home" onClick={handleShowModal}>
            How to Play
          </button>
        </div>

        {/* --- Settings Area --- */}
        {!isTouchDevice && (
          <div className="home-settings"> {/* ... (keep existing) ... */} </div>
        )}

         {/* --- Creator Credit --- */}
         <p className="creator-credit">Created by Ram Bapat</p>

      </div> {/* End inner wrapper */}

      {showModal && <HowToPlayModal onClose={handleCloseModal} />}
    </div>
  );
}

export default HomeScreen;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos