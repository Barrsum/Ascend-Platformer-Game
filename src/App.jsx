// src/App.jsx
import React, { useState, useCallback, useEffect, useRef } from 'react';
import Game, { GAME_WIDTH, GAME_HEIGHT } from './components/Game'; // Import constants
import HomeScreen from './components/HomeScreen';
import Header from './components/Header'; // Import Header
import Footer from './components/Footer'; // Import Footer
import './App.css'; // Import App CSS

// Function to detect touch devices (simple check)
const isTouchDevice = () => {
  try { // Add try-catch for environments where window/navigator might not be fully available
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  } catch (e) {
      return false; // Default to false if detection fails
  }
};

// Check once on load
const DEVICE_IS_TOUCH = isTouchDevice();

function App() {
  const [showHomeScreen, setShowHomeScreen] = useState(true);
  // Scale is a single uniform value again
  const [scale, setScale] = useState(1);
  // Ref now goes on the main content area, not the absolute outer container
  const mainContentRef = useRef(null);
  // State to force show touch controls on desktop (only relevant if !DEVICE_IS_TOUCH)
  const [forceShowControls, setForceShowControls] = useState(false);

  const handleStartGame = useCallback(() => {
    setShowHomeScreen(false);
    // Trigger scale update after a short delay to ensure layout is ready
    setTimeout(updateScale, 50);
  }, []); // Added updateScale dependency

  const handleGoToHome = useCallback(() => {
    setShowHomeScreen(true);
  }, []);

  // Handler for the checkbox (only used if not a touch device)
  const toggleForceShowControls = useCallback(() => {
      if (!DEVICE_IS_TOUCH) {
          setForceShowControls(prev => !prev);
      }
  }, []); // Dependency is DEVICE_IS_TOUCH (constant)

  // --- Refined Scaling Logic ---
  const updateScale = useCallback(() => {
    if (!mainContentRef.current) return;

    const screenWidth = mainContentRef.current.offsetWidth;
    const screenHeight = mainContentRef.current.offsetHeight;

    let finalScale;

    // Mobile / Narrow Screen Logic: Scale based on width to be edge-to-edge horizontally
    if (screenWidth < GAME_WIDTH) {
        finalScale = screenWidth / GAME_WIDTH;
        // Height scales proportionally. Clipping handled by CSS overflow.
    }
    // Desktop / Wide Screen Logic: Max native size, scale down if height is limiting
    else {
        // Calculate scale needed to fit vertically, but don't scale up beyond 1.0
        finalScale = Math.min(1.0, screenHeight / GAME_HEIGHT);
    }

    // Apply the calculated uniform scale
    setScale(Math.max(0.1, finalScale)); // Ensure a minimum scale

  }, []); // No component state dependencies needed here

  // Effect for initial scale and resize/orientation changes
  useEffect(() => {
    // Delay initial calculation slightly for layout stabilization
    const timerId = setTimeout(updateScale, 150); // Slightly longer delay

    window.addEventListener('resize', updateScale);
    window.addEventListener('orientationchange', updateScale);

    // Cleanup listeners
    return () => {
      clearTimeout(timerId);
      window.removeEventListener('resize', updateScale);
      window.removeEventListener('orientationchange', updateScale);
    };
  }, [updateScale]); // Re-run effect if updateScale changes (it shouldn't)

   // Update scale immediately when switching views as well
   // This ensures correct scale when returning to home or starting game
   useEffect(() => {
      // Need a slight delay here too if dimensions might change rapidly
      const timerId = setTimeout(updateScale, 50);
      return () => clearTimeout(timerId);
   }, [showHomeScreen, updateScale]);

   // Determine if controls should be shown based on device OR checkbox state
   const shouldShowControls = DEVICE_IS_TOUCH || forceShowControls;

  return (
    // Optional outer wrapper, often body handles this role
    <div className="app-wrapper">
        <Header />

        {/* This container takes space BETWEEN header/footer */}
        {/* It centers the home screen OR the game scaler */}
        <main className="main-content-area" ref={mainContentRef}>
            {showHomeScreen ? (
                <HomeScreen
                    onStartGame={handleStartGame}
                    // Pass down touch status and control state/handler
                    isTouchDevice={DEVICE_IS_TOUCH}
                    forceShowControls={forceShowControls}
                    onToggleForceShowControls={toggleForceShowControls}
                />
            ) : (
                // game-scaler applies the uniform scale and handles overflow
                <div
                    className="game-scaler"
                    style={{
                        // Apply uniform scale
                        transform: `scale(${scale})`,
                        // Base size remains the game's native resolution
                        width: `${GAME_WIDTH}px`,
                        height: `${GAME_HEIGHT}px`
                    }}
                >
                    <Game
                        // Use a stable key based on view to ensure remounting if needed
                        key={showHomeScreen ? 'home-key' : 'game-key'}
                        onGoToHome={handleGoToHome}
                        showTouchControls={shouldShowControls} // Pass down combined state
                    />
                </div>
            )}
        </main>

        <Footer />
    </div>
  );
}

export default App;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos