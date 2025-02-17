import React, { useEffect } from 'react';
import './Message.css';

const Message = ({ showMessage, fadeOut }) => {
  useEffect(() => {
    if (fadeOut) {
      const messageElement = document.querySelector('.message');
      if (messageElement) {
        const currentOpacity = window.getComputedStyle(messageElement).opacity;
        messageElement.style.animation = `fadeOut 3s forwards`;
        messageElement.style.setProperty('--start-opacity', currentOpacity);
      }
    }
  }, [fadeOut]);

  return (
    showMessage && (
      <div className={`message ${fadeOut ? 'fade-out' : ''}`}>
        Click or press spacebar to start...
      </div>
    )
  );
};

export default Message;