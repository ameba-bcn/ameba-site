import styled from "styled-components";

// #FAE6C5 Crema
// #F2C571 Naranja
// #EB5E3E Rojo
// #1D1D1B Negro
// #FFED00 Amarillo

export const ReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  padding: 0px 40px;
  margin: 0 auto;
  text-transform: uppercase;
  font-family: "Bebas Neue";
  font-weight: 300;
  color: #1d1d1b;
  border: 4px solid black;
`;

export const ReviewTotalRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: -10px;
  font-size: 3.3rem;
  padding: 0px 10px;
  line-height: 1em;
  & div:nth-child(2) {
    font-weight: bold;
  }
`;

export const ReviewRowSeparator = styled.div`
  width: 100%;
  height: 2px;
  border-bottom: 2px solid black;
  ${(props) =>
    props.isBig
      ? `margin: 20px 0px
`
      : `margin: 5px 0px
`}
`;

export const ReviewTable = styled.table`
  & tbody {
    & tr:not(:last-of-type) {
      border-bottom: 2px dotted black;
    }
    & tr {
      & td {
        padding: 10px 0px;
        & img {
          width: 60px;
          height: 60px;
        }
      }
      & td:nth-child(1) {
        text-align: left;
        width: 90px;
      }
      & td:nth-child(2) {
        text-align: left;
        max-width: 120px;
        line-height: 1em;
      }
      & td:nth-child(3) {
        font-size: 2.5rem;
        border-left: 2px dotted black;
      }
      & td:nth-child(4) {
        border-left: 2px dotted black;
        width: 100px;
        & div {
          & svg {
            width: 30px;
            height: auto;
          }
        }
      }
    }
  }
  ${(props) =>
    props.isBig
      ? `
    & tbody {
      & tr {
        & td:nth-child(2) {
          font-size: 2rem;
        }
        & td:nth-child(3) {
        font-size: 2.5rem;
      }
      }
    }`
      : `
    & tbody {
      & tr {
        & td {
        padding: 5px 0px;
        }
        & td:nth-child(2) {
          font-size: 1.4rem;
        }
        & td:nth-child(3) {
        font-size: 1.5rem;
      }
      }
    }`}
`;

export const ReviewFooter = styled.div`
  font-size: 2rem;
  line-height: 1em;
  font-weight: 300;
  margin-bottom: 20px;
`;
