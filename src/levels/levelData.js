// src/levels/levelData.js
import { PLAYER_WIDTH, PLAYER_HEIGHT } from '../components/Player';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
// Based on JUMP_FORCE=15, GRAVITY=0.8, Max Jump Height ~140px

export const levels = [
  // Level 1: Easy Introduction (REVISED)
  {
    id: 1,
    playerStart: { x: 50, y: 20 }, // Start on the ground platform
    // Goal moved to the final platform
    goal: { x: GAME_WIDTH - 100, y: 450 + 20, width: 50, height: 50 },
    platforms: [
      // Ground platform
      { x: 0, y: 0, width: GAME_WIDTH, height: 20, type: 'ground' },
      // Simple steps up - Max ~140px jump height needed. Make these require less.
      { x: 150, y: 90, width: 150, height: 20 },  // Jump ~70px vertical
      { x: 350, y: 200, width: 150, height: 20 }, // Jump ~70px vertical
      { x: 550, y: 330, width: 150, height: 20 }, // Jump ~70px vertical
      // Platform leading to goal - Lowered significantly
      // Needs jump ~100px vertical from previous platform (top y=290)
      { x: GAME_WIDTH - 200, y: 450, width: 200, height: 20 },
    ],
    // enemies: []
  },

  // Level 2: Smaller Gaps & Higher Climb
  {
    id: 2,
    playerStart: { x: 50, y: 20 },
    // Goal moved slightly for better fit
    goal: { x: 50, y: GAME_HEIGHT - 80, width: 50, height: 50 },
    platforms: [
      { x: 0, y: 0, width: 200, height: 20, type: 'ground' }, // Top: 20
      // Jumps require ~100-120px vertical each. Should be possible.
      { x: 300, y: 120, width: 100, height: 20 }, // Top: 140 (Jump ~120px)
      { x: 500, y: 240, width: 100, height: 20 }, // Top: 260 (Jump ~120px)
      { x: 350, y: 360, width: 100, height: 20 }, // Top: 380 (Jump ~120px)
      { x: 150, y: 480, width: 100, height: 20 }, // Top: 500 (Jump ~120px)
      // Goal platform
      { x: 0, y: GAME_HEIGHT - 100, width: 150, height: 20 }, // Top: 520 (No jump needed)
    ],
    // enemies: []
  },

  // Level 3: Narrower Platforms & Ascent/Descent
  {
    id: 3,
    playerStart: { x: GAME_WIDTH / 2 - PLAYER_WIDTH / 2, y: 20 },
    // Goal adjusted slightly on its platform
    goal: { x: GAME_WIDTH - 115, y: 20, width: 50, height: 50 },
    platforms: [
      // Start platform
      { x: GAME_WIDTH / 2 - 75, y: 0, width: 150, height: 20, type: 'ground' }, // Top: 20
      // Ascending narrow platforms
      { x: GAME_WIDTH / 2 + 100, y: 100, width: 70, height: 20 }, // Top: 120 (Jump ~100px)
      { x: 280, y: 200, width: 70, height: 20 }, // Top: 220 (Jump ~100px)
      { x: GAME_WIDTH / 2 + 50, y: 300, width: 70, height: 20 }, // Top: 320 (Jump ~100px)
      // Top platform
      // Needs jump ~130px from previous
      { x: 500, y: 0, width: 20, height: 350 }, // Right Wall (Top: 350)
      { x: 0, y: 440, width: GAME_WIDTH, height: 20 }, // Top: 450
      // Descending platforms to goal (Drops, no hard jumps)
      { x: GAME_WIDTH - 200, y: 350, width: 70, height: 20 },
      { x: GAME_WIDTH - 100, y: 200, width: 70, height: 20 },
      { x: GAME_WIDTH - 250, y: 100, width: 70, height: 20 },
      // Goal platform
      { x: GAME_WIDTH - 150, y: 0, width: 150, height: 20 },
    ],
    // enemies: []
  },

   // Level 4: More Complex Path & Small Platforms
    {
        id: 4,
        playerStart: { x: 30, y: 20 },
        goal: { x: GAME_WIDTH - 60, y: 540+15, width: 40, height: 40 }, // On final platform
        platforms: [
            { x: 0, y: 0, width: 100, height: 20, type: 'ground' }, // Top: 20
            // Series of small hops (Vertical gains are small, easy jumps)
            { x: 150, y: 80, width: 50, height: 15 }, // Top: 95 (Jump ~75px)
            { x: 340, y: 200, width: 50, height: 15 }, // Top: 215 (Jump ~60px)
            // Wall section - Assuming player can't wall jump yet, just a barrier/feature
            { x: 500, y: 0, width: 20, height: 350 }, // Right Wall (Top: 350)
            // { x: 420, y: 280, width: 50, height: 15 }, // Small ledge near wall (Top: 295) (Jump ~80px from plat 3)
             // Upper section
            { x: 100, y: 400, width: 250, height: 20 }, // Top: 420 (Requires long jump from ledge, maybe ~125px vertical from wall top?)
                                                        // Let's add a step to make this easier:
            { x: 300, y: 340, width: 50, height: 15 }, // Intermediate step (Top: 355) (Jump ~60px from ledge)
                                                       // Now jump to (100, 400) is ~65px vertical. OK.
            { x: 400, y: 480, width: 150, height: 20 }, // Top: 500 (Jump ~80px from (100,400) plat)
             // Final platforms to goal
            { x: 600, y: 540, width: 200, height: 20 }, // Top: 560 (Jump ~60px) Goal is here.
        ],
       // enemies: []
    },

    // Level 5: Challenging Climb (Should be possible but tight)
    {
        id: 5,
        playerStart: { x: GAME_WIDTH / 2 - PLAYER_WIDTH / 2, y: 20 },
        goal: { x: GAME_WIDTH / 2 - 25, y: GAME_HEIGHT - 80 + 20, width: 50, height: 50 }, // On goal platform
        platforms: [
            // Ground
            { x: 0, y: 0, width: GAME_WIDTH, height: 20, type: 'ground' }, // Top: 20
            // Tricky timed jumps (Small platforms, require decent vertical gain)
            { x: 100, y: 141, width: 50, height: 15 }, // Top: 115 (Jump ~95px)
            { x: GAME_WIDTH - 150, y: 180, width: 50, height: 15 }, // Top: 195 (Jump ~80px, long horizontal)
            { x: 200, y: 275, width: 50, height: 15 }, // Top: 295 (Jump ~100px, long horizontal)
            { x: GAME_WIDTH - 250, y: 380, width: 50, height: 15 }, // Top: 395 (Jump ~100px, long horizontal)
            // Central column climb (Small target)
            { x: 480, y: 250, width: 20, height: 15 }, // Top: 465 (Jump ~70px)
             // Top platforms (Reach from central column)
            // Jump from 465 to 520 (~55px vertical)
            // { x: 0, y: GAME_HEIGHT - 150, width: GAME_WIDTH / 2 - 50, height: 20 }, // y=450, Top: 470 (Jump from central ~5px) - Let's raise this slightly
            // New Y for side platforms: Make jump from central column (top 465) require ~50px vertical. Set bottom to 510.
            { x: 0, y: 510, width: GAME_WIDTH / 2 - 50, height: 20 }, // Top: 530
            // { x: GAME_WIDTH / 2 + 50, y: 510, width: GAME_WIDTH / 2 - 50, height: 20 }, // Top: 530
            // Goal platform - Needs jump from side platform (top 530) requires ~10px vertical. OK.
            // { x: GAME_WIDTH / 2 - 75, y: GAME_HEIGHT - 80, width: 150, height: 20 }, // y=520, Top: 540
        ],
       // enemies: []
    },
];

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos