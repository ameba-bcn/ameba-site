import styled from "styled-components";

export const StyledContacte = styled.div`
  flex-shrink: 0;

  .contenedorContacto {
    margin: 0 auto;
    padding: 40px;
  }

  .inputGroupNews {
    margin-bottom: 2rem;
    padding: 0.5rem;
  }

  .contactNews {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    max-width: 900px;
    flex: 100%;
  }

  .msg-new-password-sent {
    font-family: "Montserrat", sans-serif;
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
  }

  .form-group-input {
    flex: 70%;
  }

  .form-group-input > input {
    border-radius: 0px;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #fae6c5 inset !important;
  }

  .form-group-button {
    flex: 30%;
  }

  .formNewsGlobal {
    display: flex;
    flex-grow: column;
    justify-content: center;
    flex-wrap: wrap;
  }

  .formControlNews {
    font-family: "Montserrat", sans-serif;
    font-size: 1.2rem;
    font-weight: bold;
    padding-top: 15px;
    background-color: transparent;
    color: #1d1d1b;
    border: 2px solid #1d1d1b;
    width: 95%;
    height: auto;
  }

  .formControlNews:focus,
  .formControlNews:active {
    background-color: #fae6c5;
    border: none;
    border-color: transparent;
  }

  .formControlNews::placeholder {
    color: #1d1d1b;
    font-family: "Bebas Neue";
    font-size: 2em;
    font-weight: 400;
    padding-left: 10px;
    text-transform: uppercase;
  }

  .formButton {
    font-family: "Bebas Neue";
    font-size: 2.5em;
    font-weight: 400;
    width: 15rem;
    color: #f2c571;
    background-color: #1d1d1b;
  }

  .iconsFooter {
    padding: 3rem 0rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 48px;
    flex-wrap: wrap;
  }

  .iconsFooter a {
    text-decoration: none;
    color: inherit;
    margin-right: 10px;
  }

  .iconsFooter svg {
    scale: 3;
  }

  .twitter {
    scale: 2.9 !important;
  }

  .iconsFooter svg:hover {
    color: #eb5e3e;
  }

  .rowNewsLine {
    margin: 0 auto;
  }

  .formLabelNews {
    font-family: "Bebas Neue";
    font-size: 5em;
    font-weight: 400;
    flex: 100%;
  }

  .endingText {
    font-family: "Montserrat", sans-serif;
  }

  .linkEndingText {
    text-decoration: none;
    color: black !important;
  }

  .colabText {
    font-family: "Montserrat", sans-serif;
    margin-bottom: 24px;
  }

  .AjuntamentBcnImg {
    width: 100px;
    margin-left: 20px;
  }

  .breakLine {
    height: 0px;
    width: 0%;
  }

  @media screen and (max-width: 956px) {
    .formLabelNews {
      font-size: 3em;
    }
    .formControlNews {
      font-size: 1rem;
      margin: 5px 0px;
      width: 100%;
    }
    .contactNews {
      flex-wrap: wrap;
    }
  }

  @media screen and (max-width: 870px) {
    .form-group-button {
      margin: 1rem 0rem;
    }
  }

  @media screen and (max-width: 500px) {
    .breakLine {
      height: 1em;
      width: 100%;
    }
    .formControlNews {
      margin: auto;
    }
    .inputGroupNews {
      margin: auto;
    }
    .iconsFooter svg {
      scale: 2;
    }
    .twitter {
      scale: 1.9 !important;
    }
    .iconsFooter {
      gap: 12px;
    }
  }
`;
