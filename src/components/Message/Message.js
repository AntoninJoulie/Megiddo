import React, { useEffect } from "react";
import "./Message.css";

const Message = ({ showMessage, fadeOut }) => {
  useEffect(() => {
    if (fadeOut) {
      const messageElement = document.querySelector(".message");
      if (messageElement) {
        const currentOpacity = window.getComputedStyle(messageElement).opacity;
        messageElement.style.animation = `messageFadeOut 3s forwards`;
        messageElement.style.setProperty("--start-opacity", currentOpacity);
      }
    }
  }, [fadeOut]);

  return (
    showMessage && (
      <div className={`message ${fadeOut ? "fade-out" : ""}`}>
        <span className="desktop-message">
          Click or press spacebar to start...
        </span>
        <span className="mobile-message">Touch your screen to start...</span>
      </div>
    )
  );
};

export default Message;
