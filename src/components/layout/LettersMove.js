import React from "react";
import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import "./LettersMove.css";
import { isValidUrl } from "../../utils/validations";
// https://stackoverflow.com/questions/10679367/css-moving-text-from-left-to-right

const marqueee = keyframes`
    0% { transform: translateX(0%); }
    50% { transform: translateX(-50%); }
    100% { transform: translateX(0%); }`;

const StyledWrapperLetters = styled.div`
  width: 100%;
  background: #1d1d1b;
  height: 34px;
  text-align: left;
  overflow: hidden;
  z-index: 0;
  padding: 4px 0px;
  .substituto-marquee {
    overflow: hidden;
    position: relative;
    background: #1d1d1b;
  }
  .marquee {
    animation: ${marqueee} 20s linear infinite;
    @media (max-width: 700px) {
      animation: ${marqueee} 7s linear infinite;
    }
    display: block;
    min-width: 100%;
    left: 0;
    top: 0;
    white-space: nowrap;
    z-index: 3;
    font-size: 30px;
    font-family: "Bebas Neue";
    font-weight: 500;
    text-transform: uppercase;
    cursor: default;
  }
  a,
  u {
    text-decoration: none;
  }
  .cursor-redirect {
    cursor: pointer;
  }
`;

export default function LettersMove({
  link = "",
  sentence = "",
  color = "#FAE6C5",
}) {
  if (isValidUrl(link))
    return (
      <StyledWrapperLetters>
        <a href={link} rel="noreferrer" target="_blank">
          <div className="substituto-marquee">
            <div className="marquee cursor-redirect" style={{ color: color }}>
              {Array.from(Array(24).keys()).map(() => `- ${sentence} `)}
            </div>
          </div>
        </a>
      </StyledWrapperLetters>
    );

  if (link.length > 0)
    return (
      <NavLink
        style={{ textDecoration: "none" }}
        to={{
          pathname: link,
        }}
      >
        <StyledWrapperLetters>
          <div className="substituto-marquee">
            <div className="marquee cursor-redirect" style={{ color: color }}>
              {Array.from(Array(24).keys()).map(() => `- ${sentence} `)}
            </div>
          </div>
        </StyledWrapperLetters>
      </NavLink>
    );

  return (
    <StyledWrapperLetters>
      <div className="substituto-marquee">
        <div className="marquee" style={{ color: color }}>
          {Array.from(Array(24).keys()).map(() => `- ${sentence} `)}
        </div>
      </div>
    </StyledWrapperLetters>
  );
}
