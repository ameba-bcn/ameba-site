import styled from "styled-components";

// #FAE6C5 Crema
// #F2C571 Naranja
// #EB5E3E Rojo
// #1D1D1B Negro
// #FFED00 Amarillo

export const ToastBox = styled.div`
  a {
    width: 100%;
    height: auto;
    background-color: #1d1d1b;
    color: #1d1d1b;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    font-size: 22px;
    font-family: "Bebas Neue";
    text-transform: uppercase;
    font-weight: 500;
    text-decoration: none;
  }
`;

export const ToastLeftInBox = styled.div`
  width: 75%;
  height: auto;
  background-color: #fae6c5;
  padding: 2px;
  & > span {
    color: #eb5e3e;
  }
`;

export const ToastRightInBox = styled.div`
  width: 22%;
  height: auto;
  background-color: #eb5e3e;
  color: #fae6c5;
  padding: 2px;
`;
