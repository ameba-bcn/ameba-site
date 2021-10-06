import styled from "styled-components";

// #FAE6C5 Crema
// #F2C571 Naranja
// #EB5E3E Rojo
// #1D1D1B Negro
// #FFED00 Amarillo

export const CheckoutTitle = styled.div`
  text-transform: uppercase;
  font-family: "Bebas Neue";
  color: #1d1d1b;
  font-size: 6.5rem;
`;

export const CheckoutSubtitle = styled.div`
  text-transform: uppercase;
  font-family: "Bebas Neue";
  color: #1d1d1b;
  font-size: 3.3rem;
  margin-top: -50px;
  margin-bottom: 30px;
`;

export const CheckoutFrame = styled.div`
  max-width: 600px;
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
`;

export const CheckoutBox = styled.div`
  padding: 24px;
  margin-bottom: 48px;
`;

export const CheckoutContent = styled.div`
  display: flex;
  border: 4px solid black;
  margin: 40px 0;
`;

export const CheckoutButtons = styled.div`
  display: flex;
  justify-content: space-around;
  & button {
    padding-left: 50px;
    padding-right: 50px;
  }
`;
