import React, { Fragment } from "react";
import "./components.css";

export function Overlay({ isOpen, onClose, children }) {
  return (
    <Fragment>
      {isOpen && (
        <div className="overlay">
          <div className="overlay-background" onClick={onClose} />
          <div className="overlay-container">
            <div className="overlay-controls">
              {/* <button
                className="overlay-close"
                type="button"
                onClick={onClose}
              /> */}
            </div>
            {React.cloneElement(children, { onClose })}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Overlay;
