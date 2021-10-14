import styled from "styled-components";

// #FAE6C5 Crema
// #F2C571 Naranja
// #EB5E3E Rojo
// #1D1D1B Negro
// #FFED00 Amarillo

export const PaymentContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin: 0 auto;
  text-transform: uppercase;
  font-family: "Bebas Neue";
  font-weight: 300;
  color: #1d1d1b;
`;

export const PaymentBox = styled.div`
  width: 100%;
  border: 4px solid black;
  margin: 20px 0px;
`;

export const PaymentSummaryBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border: 4px solid black;
  margin: 20px 0px;
  padding: 0px 80px;
`;

export const PaymentReview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px 0px;
`;

export const PayementTotalRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row !important;
  justify-content: space-between !important;
  flex-wrap: wrap;
  margin-top: 20px;
  font-size: 2.3rem;
  padding: 0px 10px;
  line-height: 1em;
  & div:nth-child(2) {
    font-weight: bold;
  }
`;
