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
  @media (max-width: 400px) {
    padding: 0px 20px;
  }
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
  @media (max-width: 400px) {
    font-size: 1.8rem;
    padding: 0px;
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
      .reviewTable-col1 {
        text-align: left;
        width: 90px;
        padding: 10px;
        @media (max-width: 420px) {
          display: none;
        }
      }
      .reviewTable-col2 {
        text-align: left;
        max-width: 120px;
        line-height: 1em;
        font-size: 2rem;
        display: table-cell !important;
        overflow: hidden ;
        padding: 10px;
        @media (max-width: 500px) {
          font-size: 1.5rem;
        }
        @media (max-width: 340px) {
          font-size: 1rem;
        }
      }
      .reviewTable-col3 {
        font-size: 2.5rem;
        border-left: 2px dotted black;
        display: table-cell !important;
        padding: 10px;
        @media (max-width: 500px) {
          font-size: 2rem;
        }
        @media (max-width: 340px) {
          font-size: 1.5rem;
        }
      }
      .reviewTable-col4 {
        border-left: 2px dotted black;
        width: 100px;
        display: table-cell !important;
        padding: 10px;
        & div {
          & svg {
            width: 30px;
            height: auto;
          }
        }
        @media (max-width: 400px) {
          width: auto;
          & div {
          & svg {
            width: 20px;
            height: auto;
          }
        }
        }
      }
    }
  }
`;

export const ReviewFooter = styled.div`
  font-size: 2rem;
  line-height: 1em;
  font-weight: 300;
  margin-bottom: 20px;
  @media (max-width: 380px) {
          font-size: 1.5rem;
        }
`;
