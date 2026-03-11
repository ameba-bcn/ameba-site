import React from "react";
import "./CloseModal.css";
import Button from "../components/button/Button";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ModalDialog from "../components/layout/ModalDialog";

const CloseModal = (props) => {
  const {
    open = false,
    handleClose,
    handleExitFullscreen,
    copyText = "",
  } = props;
  const [t] = useTranslation("translation");

  return open ? (
    <ModalDialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="close-modal-box">
        <div className="close-modal-text-row">{copyText}</div>
        <div className="close-modal-button-row">
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--medium"
            buttonStyle="boton--primary--solid"
            hoverStyle="bg-orange"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
            {t("modal.continua")}
          </Button>
          <NavLink to={"/"}>
            <Button
              variant="contained"
              color="primary"
              buttonSize="boton--medium"
              buttonStyle="boton--back-orange--solid"
              hoverStyle="bg-red"
              onClick={(e) => {
                e.preventDefault();
                handleExitFullscreen();
              }}
            >
              {t("modal.sortir")}
            </Button>
          </NavLink>
        </div>
      </div>
    </ModalDialog>
  ) : null;
};

export default CloseModal;
