import styled from "styled-components";

export const StyledSociosMain = styled.div`
  display: block;
  flex-direction: column;
  background-color: #fae6c5;
  min-height: min-content;

  .link-section {
    padding-bottom: 30px;
  }
  .top-section {
    display: flex;
    flex-direction: column;
    min-height: min-content;
  }

  .top-section-gral {
    height: auto;
    width: 100%;
    background-color: #fae6c5;
  }

  .entrevista-gral {
    height: auto;
    width: 100%;
    background-color: #ffed00;
    padding: 80px 0px;
  }

  .media-gral {
    height: auto;
    width: 100%;
    background-color: #f2c571;
    padding: 80px 0px;
  }

  .activitats-gral {
    height: auto;
    width: 100%;
    background-color: #eb5e3e;
    padding: 80px 0px;
  }

  .top-section_entr {
    margin-top: 30px;
  }

  .ts-title {
    font-size: 130px;
    font-family: "Bebas Neue";
    font-weight: 800;
    line-height: 1em;
  }

  .ts-breadcrumbs {
    font-family: "Bebas Neue";
    font-size: 24px;
    font-weight: 500;
    text-transform: uppercase;
  }

  .ts-breadcrumbs span {
    cursor: pointer;
  }

  .ts-breadcrumbs span:hover {
    text-decoration: underline;
  }

  .ts-tags {
    font-family: "Bebas Neue";
    font-size: 26px;
    font-weight: 500;
    text-transform: uppercase;
  }

  .tags-e {
    display: inline-block;
    background-color: #1d1d1b;
    color: #fae6c5;
    line-height: 1em;
    padding: 5px 10px 3px 10px;
    margin: 2px 4px 20px 4px;
  }

  .menu-entrevista {
    width: 90%;
    background-color: #1d1d1b;
    text-transform: uppercase;
    margin: 0 auto;
    text-align: left;
    margin-top: 5px;
  }

  .menu-e {
    display: inline-block;
    font-family: "Bebas Neue";
    font-size: 36px;
    font-weight: 500;
    text-transform: uppercase;
    margin: 10px 2px 10px 12px;
    padding: 8px 12px 2px 12px;
    line-height: 1em;
    cursor: pointer;
  }

  .menu-e:hover {
    background-color: whitesmoke;
  }

  .menu-bio {
    background-color: #fae6c5;
  }

  .menu-entrev {
    background-color: #ffed00;
  }

  .menu-media {
    background-color: #f2c571;
  }

  .menu-activit {
    background-color: #eb5e3e;
  }

  .bio-section {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: stretch;
    align-content: center;
    width: 90%;
    padding-top: 20px;
    margin: 0 auto;
    padding-bottom: 30px;
  }

  /* .bio-highlights, */

  .bio-text,
  .bio-img {
    width: 45%;
    display: block;
    margin: 20px 0px 20px 0px;
    margin: 10px auto;
  }

  .bio-text {
    text-align: left;
    width: 55%;
    font-size: 22px;
    font-family: "Montserrat", sans-serif;
    white-space: pre-wrap;
  }

  .bio-highlights {
    padding-top: 30px;
  }

  .bio-data {
    font-size: 40px;
    font-family: "Bebas Neue";
    font-weight: 100;
    text-align: left;
    padding-left: 40px;
    line-height: 1em;
    padding-top: 20px;
  }

  .bio-data > span {
    font-weight: 700;
  }

  .bio-img-src {
    width: 100%;
    height: auto;
    max-width: 550px;
    /* margin: 20px 0px 20px 0px; */
  }

  .entrevista-columnes {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: stretch;
    align-content: center;
    width: 90%;
    padding-top: 30px;
    margin: 0 auto;
  }

  .col1-preguntes,
  .col2-preguntes {
    max-width: 45%;
    .hr-section {
      width: 100%;
    }
  }

  .pregunta {
    font-size: 40px;
    font-family: "Bebas Neue";
    font-weight: 100;
    text-align: left;
    position: relative;
    min-width: 100%;
    overflow: hidden;
    height: auto;
    cursor: pointer;
    line-height: 1em;
    display: flex;
    justify-content: space-between;
    margin-right: 12px;
  }

  .resposta {
    font-size: 20px;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    animation: fade 1s 1;
    -webkit-animation: fade 1s 1;
    max-width: 100%;
    line-height: 1.5em;
    white-space: pre-wrap;
    text-align: left;
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .pregunta hr {
    display: inline-block;
    width: 110%;
  }

  .plus-symbol {
    color: #ffed00;
    background-color: #1d1d1b;
    display: inline-block;
    width: 30px;
    height: 30px;
    margin: 1px;
  }

  @media screen and (max-width: 1345px) {
    .bio-highlights {
      display: none;
    }
    .bio-img {
      width: 80%;
    }
    .bio-text {
      width: 80%;
      max-width: 650px;
    }
  }

  @media screen and (max-width: 820px) {
    .entrevista-columnes {
      align-content: flex-start;
      justify-content: flex-start;
    }
    .ts-title {
      font-size: 80px;
    }
    .ts-breadcrumbs {
      font-size: 18px;
    }
    .menu-e {
      font-size: 24px;
      line-height: 1.2sem;
    }
  }

  @media screen and (max-width: 300px) {
    .ts-title {
      font-size: 60px;
    }
  }
`;
