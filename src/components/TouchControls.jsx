// src/components/TouchControls.jsx
import React, { useCallback } from 'react';
import { Joystick } from 'react-joystick-component'; // Import the Joystick
import './TouchControls.css';
// Assuming you still have the arrow-up icon
import ArrowUp from '../assets/arrow-up.svg?react';

// Helper to prevent default touch behavior
const preventDefault = (e) => e.preventDefault();

// Joystick movement threshold
const JOYSTICK_THRESHOLD = 0.3; // How far stick needs to move to trigger direction

function TouchControls({ onInputChange }) {

    // Store the last direction sent to prevent spamming the same input
    const lastDirectionRef = React.useRef(null); // 'left', 'right', or null

    const handleJoystickMove = useCallback((stickData) => {
        let currentDirection = null;

        if (stickData.x < -JOYSTICK_THRESHOLD) {
            currentDirection = 'left';
        } else if (stickData.x > JOYSTICK_THRESHOLD) {
            currentDirection = 'right';
        }

        // If direction changed, update inputs
        if (currentDirection !== lastDirectionRef.current) {
            // Release old direction (if any)
            if (lastDirectionRef.current) {
                onInputChange(lastDirectionRef.current, false);
            }
            // Press new direction (if any)
            if (currentDirection) {
                onInputChange(currentDirection, true);
            }
            lastDirectionRef.current = currentDirection;
        }
        // Note: We don't handle stickData.y for platformer movement
    }, [onInputChange]);

    const handleJoystickStop = useCallback(() => {
        // Release any pressed direction when stick returns to center
        if (lastDirectionRef.current) {
            onInputChange(lastDirectionRef.current, false);
            lastDirectionRef.current = null;
        }
    }, [onInputChange]);

    // Jump Button Handlers (remain similar)
    const handleTouchStart = (inputType) => (e) => {
        e.preventDefault();
        onInputChange(inputType, true);
    };
    const handleTouchEnd = (inputType) => (e) => {
        onInputChange(inputType, false);
    };
    const handleMouseDown = (inputType) => (e) => { onInputChange(inputType, true); };
    const handleMouseUp = (inputType) => (e) => { onInputChange(inputType, false); };
    const handleMouseLeave = (inputType) => (e) => { onInputChange(inputType, false); };

    return (
        // Position this container relative to the viewport using fixed positioning
        <div className="touch-controls-viewport-overlay" onContextMenu={preventDefault}>
            <div className="joystick-container">
                <Joystick
                    size={100} // Diameter of the joystick base
                    baseColor="rgba(255, 255, 255, 0.2)" // Semi-transparent base
                    stickColor="rgba(255, 255, 255, 0.5)" // Semi-transparent stick
                    move={handleJoystickMove}
                    stop={handleJoystickStop}
                    throttle={50} // Limit updates slightly (milliseconds)
                />
            </div>

            <div className="jump-button-container">
                <button
                    className="touch-button jump-button" // Reuse styling
                    onTouchStart={handleTouchStart('jump')}
                    onTouchEnd={handleTouchEnd('jump')}
                    onMouseDown={handleMouseDown('jump')}
                    onMouseUp={handleMouseUp('jump')}
                    onMouseLeave={handleMouseLeave('jump')}
                 >
                    <ArrowUp/> {/* Jump Icon */}
                </button>
            </div>
        </div>
    );
}

export default TouchControls;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos