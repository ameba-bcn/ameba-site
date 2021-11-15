import React from "react";
import { ReactFitty } from "react-fitty";
import styled from "styled-components";
import "./PowerTitle.css";

function PowerTitle(props) {
  const { subtitle } = props;

  const TitleStyled = styled.div`
    position: relative;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Bebas Neue";
    font-weight: 600;
    margin: 0 auto;
  `;
  return (
    <div className="BGWrapper">
      <TitleStyled>
        <ReactFitty maxSize={220}>{props.title}</ReactFitty>
      </TitleStyled>
      {subtitle && <h3 className="SupportSubtitle">{subtitle}</h3>}
    </div>
  );
}

export default PowerTitle;
