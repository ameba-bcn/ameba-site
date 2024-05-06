import styled from "styled-components";

export const MemberProjectFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  #project-disclaimer {
    margin-top: 0px;
    margin-bottom: 20px;
  }
  .formMembership {
    width: 100%;
    @media screen and (max-width: 610px) {
      padding: 0px 20px;
      width: auto;
    }
  }
`;

export const MemberFormBox = styled.div`
  margin: 20px 10px;
  width: 100%;
  & > form {
    .field-wrapper {
      margin-bottom: 20px;
    }
  }
  .button-box {
    button {
      width: 100%;
    }
  }
  #project-toogle-button {
    margin-bottom: 20px;
  }
`;
