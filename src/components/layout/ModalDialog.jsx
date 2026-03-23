import React, {
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import useOutsideClick from "../../hooks/use-outside-click";
import "./ModalDialog.css";

const ModalDialog = forwardRef(({ children, onClose }, ref) => {
  const dialogRef = useRef(null);
  const [firstClicked, setFirstClicked] = useState(false);
  const [closing, setClosing] = useState(false);

  const requestClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 250);
  }, [onClose, closing]);

  useImperativeHandle(ref, () => ({
    requestClose,
  }));

  useOutsideClick(dialogRef, () => {
    setFirstClicked(true);
    if (firstClicked) requestClose();
  });

  return (
    <div className={`modal-dialog${closing ? " modal-dialog--closing" : ""}`}>
      <div className="backdrop-root">
        <div className="dialog-container">
          <div className="dialog-paper" ref={dialogRef}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});

ModalDialog.displayName = "ModalDialog";

export default ModalDialog;
