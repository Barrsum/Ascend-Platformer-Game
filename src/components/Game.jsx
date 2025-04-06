// src/components/Game.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Game.css';
import Player, { PLAYER_WIDTH, PLAYER_HEIGHT } from './Player';
import Level from './Level';
import { levels } from '../levels/levelData';
import { checkCollision } from '../utils/collision';
import TouchControls from './TouchControls';
import PauseMenu from './PauseMenu'; // Import PauseMenu
import HowToPlayModal from './HowToPlayModal'; // Import HowToPlayModal

// Import an icon for the pause button - ensure you have this file
import PauseIcon from '../assets/pause.svg?react';

// --- Constants ---
export const GAME_WIDTH = 800; // Export for App.jsx
export const GAME_HEIGHT = 600; // Export for App.jsx
const GRAVITY = 0.8;
const JUMP_FORCE = 15;
const MOVE_SPEED = 5;
const INITIAL_LIVES = 3;
const DEATH_Y_THRESHOLD = -PLAYER_HEIGHT - 20; // Below screen threshold

const defaultOnGoToHome = () => console.warn("onGoToHome not provided to Game component");

// Added showTouchControls prop
function Game({ onGoToHome = defaultOnGoToHome, showTouchControls }) {
    // --- State ---
    const [levelIndex, setLevelIndex] = useState(0);
    const [lives, setLives] = useState(INITIAL_LIVES);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [isPaused, setIsPaused] = useState(false); // <<< New Pause State
    const [showHowToPlay, setShowHowToPlay] = useState(false); // <<< New Modal State

    const currentLevelData = levels[levelIndex] || levels[0]; // Fallback
    const [playerX, setPlayerX] = useState(currentLevelData.playerStart.x);
    const [playerY, setPlayerY] = useState(currentLevelData.playerStart.y);
    const [playerVy, setPlayerVy] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const keysPressed = useRef({});
    const gameAreaRef = useRef(null); // Ref for the actual game area div inside scaler
    const animationFrameId = useRef(null);
    const lastTimeRef = useRef(0);

    // --- Pause/Resume/Modal Handlers ---
    const togglePause = useCallback(() => {
        // Can only pause/unpause if game is actively playing
        if (!gameOver && !gameWon) {
            setIsPaused(prev => !prev);
        }
    }, [gameOver, gameWon]);

    const handleResume = useCallback(() => {
        setIsPaused(false);
        // Ensure focus is returned to game area after resuming
        requestAnimationFrame(() => { gameAreaRef.current?.focus(); });
    }, []);

    const handleShowHowToPlay = useCallback(() => {
        // Show the modal, pause state remains unchanged
        setShowHowToPlay(true);
    }, []);

    const handleCloseHowToPlay = useCallback(() => {
        setShowHowToPlay(false);
         // Ensure focus returns appropriately
         if (!isPaused && !gameOver && !gameWon) {
              requestAnimationFrame(() => { gameAreaRef.current?.focus(); });
         }
         // If paused, focus should remain implicitly on the pause menu logic/elements
    }, [isPaused, gameOver, gameWon]);

    // --- Touch Control Handlers ---
    const handleTouchInput = useCallback((inputType, isPressed) => {
        // Ignore touch if paused, game over, or modal is open
        if (isPaused || gameOver || gameWon || showHowToPlay) return;

        let key = '';
        switch (inputType) {
            case 'left': key = 'arrowleft'; break;
            case 'right': key = 'arrowright'; break;
            case 'jump': key = 'arrowup'; break;
            default: return;
        }
        keysPressed.current[key] = isPressed;
        if (inputType === 'jump' && isPressed && !isJumping) {
            setPlayerVy(JUMP_FORCE);
            setIsJumping(true);
        }
    }, [isJumping, JUMP_FORCE, gameOver, gameWon, isPaused, showHowToPlay]); // Added dependencies

    // --- Game Reset / State Change Functions ---
    const handlePlayerDeath = useCallback(() => {
         if (gameOver || gameWon) return;
         const newLives = lives - 1;
         setLives(newLives);
         if (newLives <= 0) {
            console.log("Game Over!");
            setGameOver(true);
         } else {
             console.log(`Life lost. ${newLives} lives remaining. Restarting level ${levelIndex + 1}`);
             const currentLevel = levels[levelIndex];
              if(currentLevel) {
                  setPlayerX(currentLevel.playerStart.x); setPlayerY(currentLevel.playerStart.y);
                  setPlayerVy(0); setIsJumping(false); keysPressed.current = {}; lastTimeRef.current = 0;
                  requestAnimationFrame(() => { gameAreaRef.current?.focus(); });
              }
         }
    }, [lives, levelIndex, gameOver, gameWon]);

    const restartGame = useCallback(() => {
         console.log("Restarting game...");
         setLevelIndex(0); setLives(INITIAL_LIVES); setGameOver(false); setGameWon(false);
         setIsPaused(false); // Ensure unpaused on restart
         setShowHowToPlay(false); // Ensure modal closed on restart
         const firstLevel = levels[0];
          if (firstLevel) { setPlayerX(firstLevel.playerStart.x); setPlayerY(firstLevel.playerStart.y); }
         setPlayerVy(0); setIsJumping(false); keysPressed.current = {}; lastTimeRef.current = 0;
         requestAnimationFrame(() => { gameAreaRef.current?.focus(); });
    }, []); // Updated restart

    const goToNextLevel = useCallback(() => {
         if (gameWon) return;
         const nextLevelIndex = levelIndex + 1;
         if (nextLevelIndex < levels.length) { setLevelIndex(nextLevelIndex); }
         else { setGameWon(true); }
    }, [levelIndex, gameWon]);

    // --- Reset Player Position on Level Change ---
    useEffect(() => {
         const newLevelData = levels[levelIndex];
         if (newLevelData && !gameOver && !gameWon) {
             setPlayerX(newLevelData.playerStart.x); setPlayerY(newLevelData.playerStart.y);
             setPlayerVy(0); setIsJumping(false); keysPressed.current = {}; lastTimeRef.current = 0;
             requestAnimationFrame(() => { gameAreaRef.current?.focus(); });
         }
    }, [levelIndex, gameOver, gameWon]);

    // --- Keyboard Event Handlers ---
    const handleKeyDown = useCallback((e) => {
        const key = e.key.toLowerCase();

        // Allow closing modal with Escape even if paused
        if (showHowToPlay && key === 'escape') {
            e.preventDefault();
            handleCloseHowToPlay();
            return;
        }

        // Handle Pause Key (Escape or P) - only if modal isn't open
        if ((key === 'escape' || key === 'p') && !showHowToPlay) {
            e.preventDefault();
            togglePause();
            return;
        }

        // Ignore game input if paused, game over, or modal is open
        if (isPaused || gameOver || gameWon || showHowToPlay) return;

        keysPressed.current[key] = true;
        if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' ', 'a', 'd', 'w', 's'].includes(key)) e.preventDefault();
        if ((key === 'arrowup' || key === ' ' || key === 'w') && !isJumping) { setPlayerVy(JUMP_FORCE); setIsJumping(true); }
    }, [gameOver, gameWon, isJumping, JUMP_FORCE, isPaused, showHowToPlay, togglePause, handleCloseHowToPlay]); // Added dependencies

    const handleKeyUp = useCallback((e) => {
        // Always allow key up to clear keysPressed, regardless of state
        keysPressed.current[e.key.toLowerCase()] = false;
    }, []);

    // --- Game Loop ---
    useEffect(() => {
        // Stop loop if game is over, won, OR PAUSED
        if (gameOver || gameWon || isPaused) {
             if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
             animationFrameId.current = null;
             if (isPaused) lastTimeRef.current = 0; // Reset time only when pausing
             return;
        }

        // Refocus needed when resuming or starting
        gameAreaRef.current?.focus();

        const gameLoop = (timestamp) => {
            if (gameOver || gameWon || isPaused) { // Double check state
                 if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
                 animationFrameId.current = null;
                 return;
            }

            // --- Delta Time ---
            if (!lastTimeRef.current) lastTimeRef.current = timestamp; // Initialize or resume time
            const deltaTime = Math.min(2.0, (timestamp - lastTimeRef.current) / 16.67);
            lastTimeRef.current = timestamp;

            // --- Rest of the loop logic (unchanged physics and collision) ---
            if (!gameAreaRef.current) { animationFrameId.current = requestAnimationFrame(gameLoop); return; }
            const currentLevel = levels[levelIndex]; if (!currentLevel) { console.error("Missing level data"); setGameOver(true); return; }
            let currentVx = 0; if (keysPressed.current['arrowleft'] || keysPressed.current['a']) currentVx -= MOVE_SPEED; if (keysPressed.current['arrowright'] || keysPressed.current['d']) currentVx += MOVE_SPEED;
            let newVy = playerVy - GRAVITY * deltaTime; let potentialY = playerY + newVy * deltaTime; let potentialX = playerX + currentVx * deltaTime;
            let nextX = potentialX; let nextY = potentialY; let finalVy = newVy; let landedOnPlatform = false;
            const prevPlayerX = playerX; const prevPlayerY = playerY; const playerRect = { x: potentialX, y: potentialY, width: PLAYER_WIDTH, height: PLAYER_HEIGHT };
            for (const platform of currentLevel.platforms) {
                 const platformRect = { ...platform }; const checkPlayerRect = { ...playerRect };
                 if (checkCollision(checkPlayerRect, platformRect)) {
                     const playerBottom = potentialY; const playerTop = potentialY + PLAYER_HEIGHT; const playerLeft = potentialX; const playerRight = potentialX + PLAYER_WIDTH;
                     const platformBottom = platformRect.y; const platformTop = platformRect.y + platformRect.height; const platformLeft = platformRect.x; const platformRight = platformRect.x + platformRect.width;
                     if (prevPlayerY >= platformTop && playerBottom < platformTop) { nextY = platformTop; finalVy = 0; landedOnPlatform = true; if(isJumping) setIsJumping(false); }
                     else if (prevPlayerY + PLAYER_HEIGHT <= platformBottom && playerTop > platformBottom) { nextY = platformBottom - PLAYER_HEIGHT; finalVy = Math.min(0, finalVy); }
                     const adjustedPlayerRectForHorizontalCheck = { ...checkPlayerRect, y: nextY };
                     if (checkCollision(adjustedPlayerRectForHorizontalCheck, platformRect)) {
                          if (prevPlayerX + PLAYER_WIDTH <= platformLeft && playerRight > platformLeft) { nextX = platformLeft - PLAYER_WIDTH; currentVx = 0; }
                          else if (prevPlayerX >= platformRight && playerLeft < platformRight) { nextX = platformRight; currentVx = 0; }
                     }
                 }
            }
            if (!landedOnPlatform && nextY <= 0) {
                let isOnGroundPlatform = false; const playerGroundCheckX = nextX;
                for (const platform of currentLevel.platforms) { if (platform.y === 0) { const horizontalOverlap = playerGroundCheckX < platform.x + platform.width && playerGroundCheckX + PLAYER_WIDTH > platform.x; if (horizontalOverlap) { isOnGroundPlatform = true; break; } } }
                if (isOnGroundPlatform) { nextY = 0; finalVy = 0; landedOnPlatform = true; if (isJumping) setIsJumping(false); }
                else { handlePlayerDeath(); return; }
            }
            if (nextY < DEATH_Y_THRESHOLD) { handlePlayerDeath(); return; }
            const gameWidth = GAME_WIDTH; if (nextX < 0) nextX = 0; else if (nextX + PLAYER_WIDTH > gameWidth) nextX = gameWidth - PLAYER_WIDTH;
            setPlayerX(nextX); setPlayerY(nextY); setPlayerVy(finalVy);
            const finalPlayerRect = { x: nextX, y: nextY, width: PLAYER_WIDTH, height: PLAYER_HEIGHT };
            if (currentLevel.goal && checkCollision(finalPlayerRect, currentLevel.goal)) { goToNextLevel(); return; }

            // --- Next Frame ---
            animationFrameId.current = requestAnimationFrame(gameLoop);
        };

        // --- Start Loop ---
        if (!animationFrameId.current) { // Start loop only if not already running
             animationFrameId.current = requestAnimationFrame(gameLoop);
        }

        // --- Listeners ---
        const currentRef = gameAreaRef.current;
        currentRef?.addEventListener('keydown', handleKeyDown);
        currentRef?.addEventListener('keyup', handleKeyUp);

        // --- Cleanup ---
        return () => {
             if(animationFrameId.current) { cancelAnimationFrame(animationFrameId.current); animationFrameId.current = null; }
             currentRef?.removeEventListener('keydown', handleKeyDown);
             currentRef?.removeEventListener('keyup', handleKeyUp);
             // Don't reset lastTimeRef here
        };
    }, [ // Add isPaused to dependency array
        gameOver, gameWon, isPaused, // Main loop control
        levelIndex, lives, playerX, playerY, playerVy, isJumping, // State affecting loop
        handleKeyDown, handleKeyUp, goToNextLevel, handlePlayerDeath, // Callbacks used in loop/handlers
        GRAVITY, MOVE_SPEED, JUMP_FORCE // Constants
    ]);

    // --- Rendering ---
    return (
        <div
            ref={gameAreaRef}
            className="game-area"
            tabIndex={0} // Keep focusable
            // Prevent focusing if paused, game ended, or modal is open
            onClick={() => { if (!gameOver && !gameWon && !isPaused && !showHowToPlay) gameAreaRef.current?.focus(); }}
        >
            {/* Render Pause Button - Visible only when playing */}
            {!gameOver && !gameWon && !isPaused && (
                <button className="pause-button" onClick={togglePause} aria-label="Pause Game">
                    <PauseIcon />
                </button>
            )}

            {/* Render HUD only if game is active and not paused */}
            {!gameOver && !gameWon && !isPaused && (
                 <div className="hud">
                    <span>Level: {levelIndex + 1} / {levels.length}</span>
                    <span>Lives: {lives}</span>
                 </div>
            )}

            {/* Render the Level and Player only if game is active (visible even if paused) */}
            {!gameOver && !gameWon && currentLevelData ? (
                 <Level levelData={currentLevelData}>
                    <Player playerX={playerX} playerY={playerY} />
                 </Level>
             ) : null}

            {/* Render Pause Menu */}
            {isPaused && !gameOver && !gameWon && (
                 <PauseMenu
                     onResume={handleResume}
                     onGoToHome={onGoToHome}
                     onShowHowToPlay={handleShowHowToPlay} // Pass handler to show modal
                 />
            )}

            {/* Game Over / Win Screens */}
            {gameOver && (
                 <div className="game-over-screen overlay">
                    <h2>Game Over</h2>
                    <p>You stumbled before the summit.</p>
                    <div className="button-container overlay-buttons">
                        <button className="btn-overlay btn-restart-overlay" onClick={restartGame}>Try Again</button>
                        <button className="btn-overlay btn-gohome-overlay" onClick={onGoToHome}>Main Menu</button>
                    </div>
                 </div>
             )}
            {gameWon && (
                <div className="win-screen overlay">
                    <h2>Summit Reached!</h2>
                    <span className="trophy-icon">🏆</span>
                    <p>A true climber!</p>
                    <div className="button-container overlay-buttons">
                         <button className="btn-overlay btn-restart-overlay" onClick={restartGame}>Climb Again</button>
                         <button className="btn-overlay btn-gohome-overlay" onClick={onGoToHome}>Main Menu</button>
                     </div>
                </div>
             )}

             {/* Render Touch Controls conditionally (hide if paused) */}
             {showTouchControls && !gameOver && !gameWon && !isPaused && (
                <TouchControls onInputChange={handleTouchInput} />
             )}

             {/* Render How To Play Modal (controlled by its own state) */}
             {showHowToPlay && (
                 <HowToPlayModal onClose={handleCloseHowToPlay} />
             )}
        </div>
    );
}

export default Game;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos