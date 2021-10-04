import styled from "styled-components";

export const LogFormBox = styled.div`
margin: 20px 0;
  & > form {
      & > div{
          margin-bottom: 20px;
      }
  }
`;

export const LogFormError = styled.div`
  background-color: rgb(250, 230, 197, 0.5);
  width: 99%;
  margin: 0 auto;
  padding-top: 5px;
  padding-bottom: 5px;
  color: #af3d24;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: bold;
`;
