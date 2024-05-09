import styled from "styled-components";

export const DiscountRow = styled.div`
  display: flex;
  flex-direction: row !important;
  justify-content: space-around;
  & input {
    width: 45%;
  }
  & button {
    width: 45%;
  }
  @media (max-width: 350px) {
    & input {
      width: 58%;
    }
    & button {
      width: 40%;
    }
  }
  @media (max-width: 490px) {
    & input::placeholder {
      font-size: 1.5rem;
    }
  }
`;
