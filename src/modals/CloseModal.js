import React from "react";
import styled from "styled-components";
import Button from "../components/button/Button";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ModalDialog from "../components/layout/ModalDialog";

const StyledModalCloseBox = styled.div`
  width: 100%;
  max-width: 400px;
  min-width: 280px;
  background-color: #fae6c5;
  border: 2px solid #000;
  padding: 20px;
  box-shadow: 24;
  z-index: 2010;
`;

const StyledModalTextRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  text-align: center;
  font-weight: bold;
`;

const StyledModalButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 20px;
  a {
    text-decoration: none;
  }
`;

const CloseModal = (props) => {
  const { open = false, handleClose, handleExitFullscreen } = props;
  const [t] = useTranslation("translation");

  return open ? (
    <ModalDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledModalCloseBox>
        <StyledModalTextRow>{t("modal.sortir-text")}</StyledModalTextRow>
        <StyledModalButtonRow>
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--medium"
            buttonStyle="boton--primary--solid"
            hoverStyle="bg-orange"
            onClick={() => handleClose()}
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
              onClick={() => handleExitFullscreen()}
            >
              {t("modal.sortir")}
            </Button>
          </NavLink>
        </StyledModalButtonRow>
      </StyledModalCloseBox>
    </ModalDialog>
  ) : null;
};

export default CloseModal;
