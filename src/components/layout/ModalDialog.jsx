import React, { useRef, useState } from "react";
import "./ModalDialog.css";
import useOutsideClick from "../../hooks/use-outside-click";

const ModalDialog = ({ children, onClose }) => {
  const dialogRef = useRef("ModalDialog ");
  const [firstClicked, setfirstClicked] = useState(false);
  useOutsideClick(dialogRef, () => {
    setfirstClicked(true);
    firstClicked && onClose();
  });
  return (
    <div className="modal-dialog">
      <div className="backdrop-root">
        <div className="dialog-container">
          <div className="dialog-paper" ref={dialogRef}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDialog;
