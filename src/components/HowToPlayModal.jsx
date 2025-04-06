// src/components/HowToPlayModal.jsx
import React from 'react';
import './HowToPlayModal.css';

function HowToPlayModal({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside */}
        <h2>How to Play</h2>
        <div className="controls">
            <h3>Controls:</h3>
            <ul>
                <li><strong>Move Left:</strong> Left Arrow / 'A' key / Tap Left Side</li>
                <li><strong>Move Right:</strong> Right Arrow / 'D' key / Tap Right Side</li>
                <li><strong>Jump:</strong> Up Arrow / 'W' key / Spacebar / Tap Jump Button (Bottom Center)</li>
            </ul>
        </div>
        <div className="rules">
            <h3>Rules:</h3>
            <ul>
                <li>Reach the <strong>Goal (🏁)</strong> on each level to advance.</li>
                <li>You have <strong>3 Lives</strong> for the entire game.</li>
                <li>Falling off the platforms will cost you a life and restart the level.</li>
                <li>Complete all 5 levels to win the trophy!</li>
                {/* Add enemy info here later */}
            </ul>
        </div>
        <button className="btn btn-close" onClick={onClose}>
          Got It!
        </button>
      </div>
    </div>
  );
}

export default HowToPlayModal;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos