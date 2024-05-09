import styled from "styled-components";

// #FAE6C5 Crema
// #F2C571 Naranja
// #EB5E3E Rojo
// #1D1D1B Negro
// #FFED00 Amarillo

export const StyledApp = styled.div`
  text-align: center;
  background-color: #fae6c5;
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: fadein 300ms;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .logViewRed {
    height: 100%;
    min-height: min-content;
    background-color: #eb5e3e;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .logViewYellow {
    width: 100%;
    min-height: min-content;
    background-color: #fae6c5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 0;
  }

  img {
    -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  .checkoutViewYellow {
    background-color: #fae6c5;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 0;
    min-height: min-content;
  }

  .freeCheckout-box {
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
  }

  .profileTitle {
    width: 100%;
    background-color: #eb5e3e;
    font-size: 120px;
    font-family: "Bebas Neue";
    width: 100%;
    font-weight: 400;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @media screen and (max-width: 500px) {
    .profileTitle {
      font-size: 80px;
    }
  }

  @media screen and (max-width: 400px) {
    .profileTitle {
      font-size: 60px;
    }
  }

  .cardForm {
    max-width: 100%;
    width: 100%;
  }

  *:focus {
    outline: 0;
  }

  /* spinner/processing state, errors */

  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }

  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 30px;
    height: 30px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }

  .spinner:before,
  .spinner:after {
    position: absolute;
    content: "";
  }

  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }

  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }

  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .Bloque {
    display: flex;
    position: relative;
    border-color: white;
    border-radius: 2px;
    flex-direction: column;
    overflow-y: hidden;
  }

  .ContainerAmeba {
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    width: 80%;
    margin: auto;
    align-items: center;
  }

  .left-side {
    width: 60%;
  }

  .right-side {
    width: 40%;
  }

  .titulo > h1 {
    font-size: 120px;
    font-family: "Bebas Neue";
    /* font-weight: 300; */
  }

  div > .nav-item {
    margin: auto;
    padding: 0px 10px 0px 10px;
  }

  .titleCoverImage {
    position: relative;
    bottom: 0;
    background: rgb(29, 29, 27);
    background: rgba(29, 29, 27, 0.5);
    background-size: contain;
    color: #f1f1f1;
    width: 100%;
    height: 100%;
    opacity: 1.2;
    color: white;
    text-align: center;
    font-size: 100px;
    font-family: "Bebas Neue";
    font-weight: 900;
    padding: 15% 0;
  }

  .error-message {
    color: red;
  }

  .subtitleCoverImage {
    font-size: 40px;
    font-family: "Bebas Neue";
    font-weight: 600;
    color: white;
  }

  #colabo {
    position: flex;
  }

  .CenteredImage {
    position: relative;
    height: 20%;
    width: auto;
  }

  /* Main Flyer */

  .mainFlyer {
    width: 100%;
    height: 100vh;
    /* background-image: url("../../images/MainAMEBA.png"); */
    background-position: center;
    background-size: cover;
  }

  @media screen and (max-width: 800px) {
    .mainFlyer {
      width: 100%;
      height: auto;
    }
  }

  .Articles,
  .Botiga,
  .BookingContent {
    background-color: #eb5e3e;
  }

  .SupportContent {
    background-color: #fae6c5;
  }

  #festi,
  #shop {
    background-color: #fae6c5;
  }

  #contacte {
    background-color: #f2c571;
  }

  .HomeContent {
    display: block;
    overflow: auto;
  }

  /* FORM CONTROL */

  .Article {
    width: 50%;
    border: 1px solid #ccc;
    padding: 10px;
    display: inline-block;
    margin-top: 100px;
  }

  /* SESSIO */

  .sessio {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .carouselFrame {
    width: 60%;
    justify-content: center;
    margin: auto;
  }

  /* WORDS CAROUSEL */

  .wordsMoveFrame {
    width: 100%;
    height: 24px;
    background-color: #1d1d1b;
  }

  .wordsMove {
    color: white;
    font-weight: bold;
    position: relative;
    width: 300px;
    animation-name: wordsInMove;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  @keyframes wordsInMove {
    0% {
      background: red;
      left: 0px;
    }
    50% {
      background: green;
      left: 100px;
    }
    100% {
      background: blue;
      left: 80%;
    }
  }

  /* LOGIN NUEVO */

  .loginWall {
    background-color: #eb5e3e;
  }

  .toast-black-background {
    background-color: #1d1d1b !important;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .Toastify__toast-body {
    margin: 0 auto;
  }

  .Toastify__toast-container {
    width: 70% !important;
  }

  @media screen and (max-width: 480px) {
    .Toastify__toast-container {
      width: 100% !important;
    }
  }

  .logTitle {
    text-transform: uppercase;
    font-family: "Bebas Neue";
    color: #1d1d1b;
    font-size: 4.5rem;
    line-height: 4rem;
  }

  .logTitleSmall {
    text-transform: uppercase;
    font-family: "Bebas Neue";
    color: #1d1d1b;
    font-size: 2.5rem;
    margin-top: 0px;
  }

  .new-member-title {
    text-transform: uppercase;
    font-family: "Bebas Neue";
    color: #1d1d1b;
    font-size: 4.5rem;
    margin-bottom: 0px;
    margin-top: 20px;
  }

  .checkout-payment-summary {
    font-family: "Montserrat", sans-serif;
    justify-content: center;
    color: #1d1d1b;
    font-size: 1.6rem;
    margin: 0 auto;
    padding: 20px 0px 20px 0px;
    max-width: 500px;
  }

  input.logForm {
    background-color: transparent;
    border: 4px solid #1d1d1b;
    border-radius: 0rem;
    padding: 12px 14px 12px 12px;
    font-family: "Montserrat", sans-serif;
    color: #1d1d1b;
    font-size: 1.2rem;
    font-weight: bold;
    width: 100%;
  }

  input.logForm:focus {
    background-color: #fae6c5;
    border: 4px solid #f2c571;
  }

  input.logForm::placeholder {
    text-transform: uppercase;
    padding-top: 2px;
    font-family: "Bebas Neue";
    color: #1d1d1b;
    font-size: 2rem;
    transform: translateY(6px);
  }

  .recovery-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }

  .form-button {
    width: 100% !important;
  }

  .form-group {
    display: flex;
    z-index: 0;
  }

  .logFormButton {
    background-color: #1d1d1b;
    color: #fae6c5;
    text-transform: uppercase;
    font-family: "Bebas Neue";
    font-size: 1.8rem;
    max-width: 130px !important;
    margin: 0 auto;
    opacity: 1;
    pointer-events: initial;
  }

  label {
    display: block;
    margin-top: 10px;
  }

  .card-form {
    display: flex;
    flex-direction: column;
    border-width: 0px !important;
    margin: 0 auto;
    max-width: 500px !important;
    background-color: transparent !important;
    padding: 40px 40px;
  }

  @media screen and (max-width: 370px) {
    .card-form {
      padding: 40px 10px;
    }
  }

  .sociLogBanner {
    background-color: #f2c571;
    color: #1d1d1b;
    text-transform: uppercase;
    font-family: "Bebas Neue";
    font-size: 1.8rem;
    text-align: center;
    margin-top: 1.8rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 8px;
    line-height: normal;
  }

  .succesful-login-modificar {
    background-color: #1d1d1b;
    cursor: pointer;
    color: #fae6c5;
    text-transform: uppercase;
    font-family: "Bebas Neue";
    font-size: 1.8rem;
    max-width: 110px !important;
    margin: 0 auto;
  }

  .succesful-login {
    color: #fae6c5;
    text-transform: uppercase;
    font-family: "Bebas Neue";
    font-size: 1.8rem;
    margin: 0 auto;
  }

  /* Main page messages */

  .full-height-msg {
    background-color: #eb5e3e;
    flex: 1 0 auto;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    word-wrap: break-word;
  }

  .single-msg {
    font-family: "Montserrat", sans-serif;
    font-size: 1.4rem;
    font-weight: bold;
    width: 100%;
    /* flex: 1 0 auto; */
  }

  .lettersMoveDiv {
    flex: 1 0 auto;
  }

  .logFormEmailPasswordRecovery {
    margin-top: 1.8rem !important;
  }

  /* Toasts */
  .notificationToast-success {
    color: #1d1d1b;
    font-weight: bold;
    background-color: #bbe5c2;
  }

  .notificationToast-error {
    color: #1d1d1b;
    font-weight: bold;
    background-color: #f9adb3;
  }

  .notificationToast-warning {
    color: #1d1d1b;
    font-weight: bold;
    background-color: #f5f1bb;
  }

  .notificationToast-info {
    color: #1d1d1b;
    font-weight: bold;
    background-color: #a2d8f4;
  }
`;
