import React from "react";
import "./components.css";

function Overlay({ isOpen, onClose, children }) {
  return (
    <div>
      {isOpen ? (
        <div className="overlay">
          <div className="overlay-background" onClick={onClose}>
            <div className="overlay-container">{children}</div>
            <div className="overlay-controls">
              <button className="overlay-close" onClick={onClose}>
                X
              </button>
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Overlay;
