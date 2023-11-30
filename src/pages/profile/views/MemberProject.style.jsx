import styled from "styled-components";

export const MemberProjectFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  #project-disclaimer {
    max-width: 400px;
  }
`;

export const StyledImageBox = styled.div`
  border: 4px solid #1d1d1b;
  border-radius: 0px;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  .upload__image-wrapper {
  }
`;

export const StyledImageLabelBox = styled.div`
  text-align: left;
  margin: 0px 0px -14px 13px !important;
`;

export const StyledImageLabel = styled.div`
  display: inline-block;
  position: relative;
  background-color: #fae6c5;
  width: min-content;
  color: #1d1d1b;
  text-transform: uppercase;
  font-family: "Bebas Neue";
  font-size: 20px;
  z-index: 10000;
  line-height: 0.8;
  padding: 0px 4px !important;
`;
