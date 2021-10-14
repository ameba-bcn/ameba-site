import styled from "styled-components";

// #FAE6C5 Crema
// #F2C571 Naranja
// #EB5E3E Rojo
// #1D1D1B Negro
// #FFED00 Amarillo

export const MiniTableContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0px 20px;
  font-size: 1.2rem;
  & tbody {
    width: 100%;
    margin: 0 auto;
    & tr {
      width: 100%;
      display: table;
      & td:nth-child(1) {
        text-align: left;
        width: 100%;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      & td:nth-child(2) {
        text-align: right;
        width: 40%;
      }
    }
  }
`;
