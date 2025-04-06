// src/components/Footer.jsx
import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import './Footer.css'; // Create this CSS file

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
         <p className="creator-credit-footer">Ascend - Created By Ram Bapat</p> {/* Keep credit here */}
         <div className="social-links">
           <a
             href="https://www.linkedin.com/in/ram-bapat-barrsum-diamos"
             target="_blank"
             rel="noopener noreferrer"
             aria-label="LinkedIn Profile"
             title="LinkedIn Profile"
           >
             <FaLinkedin />
           </a>
           <a
             // Update this link to your actual game repository if different
             href="https://github.com/Barrsum" // Link to profile or repo
             target="_blank"
             rel="noopener noreferrer"
             aria-label="GitHub Profile"
             title="GitHub Profile"
           >
             <FaGithub />
           </a>
         </div>
        {/* Removed redundant text links as icons are present */}
        {/* <p className="connect-text">...</p> */}
        {/* Removed project-specific credit */}
        {/* <p className="connect-text tutor-credit">...</p> */}
      </div>
    </footer>
  );
}

export default React.memo(Footer);
//  Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos