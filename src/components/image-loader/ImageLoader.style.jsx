import styled from "styled-components";

export const StyledImageBox = styled.div`
  border: 4px solid #1d1d1b;
  border-radius: 0px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: ${(props) =>
    props.imageList?.length > 0 ? "space-between" : "center"};
  padding: 24px;
  .image-item {
    margin: 0px 12px 18px 0px;
  }
  .upload__image-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .btn-wrapper {
    display: flex;
    justify-content: center;
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
  width: fit-content;
  color: #1d1d1b;
  text-transform: uppercase;
  font-family: "Bebas Neue";
  font-size: 20px;
  z-index: 10000;
  line-height: 0.8;
  padding: 0px 4px !important;
`;
