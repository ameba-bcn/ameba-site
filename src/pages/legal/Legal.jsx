import React from "react";
import styled from "styled-components";
import { radioDublabLink } from "../../utils/constants";
import LettersMove from "../../components/layout/LettersMove";
import DisclaimerBox from "../../components/disclaimerBox/DisclaimerBox";

export const StyledLegal = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 400px;
  justify-content: center;
`;

const Legal = () => {
  return (
    <>
      <StyledLegal>
        <DisclaimerBox text="Vista en desarrollo, disculpa las molestias" />
      </StyledLegal>
      <LettersMove
        className="lettersMoveDiv"
        sentence="AMEBA RADIO @ dublab"
        link={radioDublabLink}
        color="#FAE6C5"
      />
    </>
  );
};

export default Legal;
