import React from "react";
import { ReactFitty } from "react-fitty";
import styled from "styled-components";

export const StyledPowerTitleBox = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &:hover {
    animation-name: TitleHovered;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }

  .SupportSubtitle {
    margin: -20px;
    text-transform: uppercase;
    font-size: 2.5rem;
    font-family: "Bebas Neue";
    font-weight: 100;
    margin-bottom: 1rem;
    width: 100%;
  }

  @media screen and (max-width: 1120px) {
    .SupportSubtitle {
      margin-top: -20px;
    }
  }

  @media screen and (max-width: 620px) {
    .SupportSubtitle {
      margin-top: -10px;
      font-size: 1.5rem;
    }
  }

  @media screen and (max-width: 620px) {
    animation-name: TitleHovered;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }

  @keyframes TitleHovered {
    0% {
      background-color: rgba(29, 29, 27, 0);
    }

    2% {
      background-color: rgba(235, 94, 62, 0.8);
    }

    23% {
      background-color: rgba(29, 29, 27, 0);
    }

    25% {
      background-color: rgba(255, 237, 0, 0.8);
    }

    48% {
      background-color: rgba(29, 29, 27, 0);
    }

    50% {
      background-color: rgba(242, 197, 113, 0.8);
    }

    98% {
      background-color: rgba(29, 29, 27, 0);
    }

    100% {
      background-color: rgba(250, 230, 197, 0.8);
    }
  }
`;

export const TitleStyled = styled.div`
  position: relative;
  width: 95%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Bebas Neue";
  font-weight: 600;
  margin: 0 auto;
  margin: 0px 20px;
`;

function PowerTitle(props) {
  const { subtitle } = props;

  return (
    <StyledPowerTitleBox>
      <TitleStyled>
        <ReactFitty maxSize={220}>{props.title}</ReactFitty>
      </TitleStyled>
      {subtitle && <h3 className="SupportSubtitle">{subtitle}</h3>}
    </StyledPowerTitleBox>
  );
}

export default PowerTitle;
