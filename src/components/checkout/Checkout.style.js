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
  @media (max-width: 400px) {
    font-size: 4.5rem;
  }
`;

export const CheckoutSubtitle = styled.div`
  text-transform: uppercase;
  font-family: "Bebas Neue";
  color: #1d1d1b;
  font-size: 3.3rem;
  margin-bottom: 30px;
  @media (max-width: 350px) {
    font-size: 2.5rem;
    margin-top: -30px;
  }
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
  margin: 40px 0;
`;

export const CheckoutButtons = styled.div`
  display: flex;
  justify-content: space-around;
  & button {
    padding-left: 50px;
    padding-right: 50px;
    width: 48%;
    @media (max-width: 460px) {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
`;

export const CheckoutMemberFrame = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border: 4px solid black;
`;
