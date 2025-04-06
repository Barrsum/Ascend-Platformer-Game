// src/utils/collision.js

/**
 * Checks for Axis-Aligned Bounding Box (AABB) collision.
 * Assumes 'y' coordinate represents the BOTTOM edge for player/platforms.
 *
 * @param {object} rect1 - First rectangle { x, y, width, height }
 * @param {object} rect2 - Second rectangle { x, y, width, height }
 * @returns {boolean} - True if rectangles overlap, false otherwise.
 */
export function checkCollision(rect1, rect2) {
    // Check for overlap on the X axis
    const xOverlap =
      rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
  
    // Check for overlap on the Y axis (using bottom edge as 'y')
    // rect1's top is rect1.y + rect1.height
    // rect2's top is rect2.y + rect2.height
    const yOverlap =
      rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
  
    // Return true only if there's overlap on BOTH axes
    return xOverlap && yOverlap;
  }

  // Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos