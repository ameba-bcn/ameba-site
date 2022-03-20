import React from 'react';
import styled from "styled-components";
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '../components/button/Button';
import { NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const StyledModalCloseBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 400px;
    min-width: 280px;
    background-color: #FAE6C5;
    border: 2px solid #000;
    padding: 20px;
    box-shadow: 24;
    z-index: 2010;
`

const StyledModalTextRow = styled.div`
    display:flex;
    flex-direction: row;
    width: 100%;
    text-align: center;
    font-weight: bold;
`

const StyledModalButtonRow = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 20px;
`

const CloseModal = (props) => {
    const { open, handleClose, handleExitFullscreen } = props;
    const [t] = useTranslation("translation");

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <StyledModalCloseBox>
                <Box>
                    <StyledModalTextRow>
                        {t("modal.sortir-text")}
                    </StyledModalTextRow>
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
                        <NavLink to={'/'}>
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
                </Box>
            </StyledModalCloseBox>
        </Modal>
    );
};

export default CloseModal;