import React, { useRef, useState } from "react";
import styled from "styled-components";
import useOutsideClick from "../../hooks/use-outside-click";

export const StyledDialog = styled.div`
  position: fixed;
  z-index: 1300;
  inset: 0px;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  .backdrop-root {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    z-index: -1;
    position: fixed;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    animation: fadein 300ms;
    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    -webkit-tap-highlight-color: transparent;
    .dialog-container {
      height: 100%;
      opacity: 1;
      transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      .dialog-paper {
        max-width: 600px;
        display: flex;
        max-height: calc(100% - 64px);
        flex-direction: column;
        margin: 32px;
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;
        box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
          0px 24px 38px 3px rgba(0, 0, 0, 0.14),
          0px 9px 46px 8px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        color: rgba(0, 0, 0, 0.87);
        transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        background-color: #fff;
      }
    }
  }
`;

const ModalDialog = ({ children, onClose }) => {
  const dialogRef = useRef("ModalDialog ");
  const [firstClicked, setfirstClicked] = useState(false);
  useOutsideClick(dialogRef, () => {
    setfirstClicked(true);
    firstClicked && onClose();
  });
  return (
    <StyledDialog>
      <div className="backdrop-root">
        <div className="dialog-container">
          <div className="dialog-paper" ref={dialogRef}>
            {children}
          </div>
        </div>
      </div>
    </StyledDialog>
  );
};

export default ModalDialog;
