import styled from "styled-components";

export const LogFormBox = styled.div`
  margin: 20px 0px;
  & > form {
    .field-wrapper {
      margin-bottom: 20px;
      @media screen and (max-width: 340px) {
        margin: 0px 12px;
      }
    }
  }
  .submit {
    margin-top: 20px;
    width: 100%;
  }
  .button-row {
    display: flex;
    justify-content: <center></center>;
    gap: 12px;
    .column {
      width: 100%;
    }
  }
`;

export const LogButtonBox = styled.div`
  button {
    width: 100%;
  }
`;

export const LogFormError = styled.div`
  background-color: rgb(250, 230, 197, 0.5);
  width: 99%;
  margin: 0 auto;
  padding-top: 5px;
  padding-bottom: 5px;
  color: #eb5e3e;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: bold;
`;

export const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  margin: 0 auto;
  max-width: 500px !important;
`;
