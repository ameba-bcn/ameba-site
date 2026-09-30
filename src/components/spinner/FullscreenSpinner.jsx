import React, { useState, useCallback } from "react";
import "./FullscreenSpinner.css";
import Spinner from "./Spinner";

const FullscreenSpinner = ({ isClosing = false, onClosed }) => {
  const [visible, setVisible] = useState(true);

  const handleAnimationEnd = useCallback(
    (e) => {
      if (e.animationName === "overlay-exit") {
        setVisible(false);
        if (onClosed) onClosed();
      }
    },
    [onClosed],
  );

  if (!visible) return null;

  return (
    <div
      className={`fullscreen-spinner-overlay${isClosing ? " closing" : ""}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <Spinner size={100} />
    </div>
  );
};

export default FullscreenSpinner;
