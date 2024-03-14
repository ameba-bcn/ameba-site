import styled from "styled-components";

export const TextAreaLabelBox = styled.div`
  text-align: left;
  margin: 0px 0px -14px 13px !important;
`;

export const TextAreaLabel = styled.div`
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

export const TextAreaStyled = styled.div`
  display: block;
  height: 100%;
  border: 4px solid #1d1d1b;
  border-radius: 0px;
  .tox-tinymce {
    border: none;
  }
  iframe {
    background-color: transparent !important;
  }
  .tox-editor-header,
  .tox-toolbar__primary {
    background-color: #f2c571 !important;
    border-radius: 0px;
  }
`;
