    // src/components/PauseMenu.jsx
import React from 'react';
import './PauseMenu.css'; // Create this CSS file next

function PauseMenu({ onResume, onGoToHome, onShowHowToPlay }) {
    return (
        <div className="pause-menu-overlay">
            <div className="pause-menu-content">
                <h2>Paused</h2>
                <div className="pause-menu-buttons">
                    <button
                        className="btn-pause btn-resume"
                        onClick={onResume}
                    >
                        Resume
                    </button>
                    <button
                        className="btn-pause btn-how-to-play-pause"
                        onClick={onShowHowToPlay}
                    >
                        How to Play
                    </button>
                    <button
                        className="btn-pause btn-quit"
                        onClick={onGoToHome}
                    >
                        Main Menu
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PauseMenu;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos