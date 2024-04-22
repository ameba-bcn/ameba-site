import styled from "styled-components";

export const StyledCard = styled.div`
  overflow: hidden;
  background-color: #fae6c5 !important;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

  .cardMediaImgBox {
    width: 100%;
    padding-top: 100%;
    position: relative;
    transition: all 0.4s ease;
  }
  .cardMedia {
    -webkit-filter: grayscale(100%);
    /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
    filter: brightness(50%);
    max-width: 100%;
    min-width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .cardDateRow {
    display: flex;
    padding: 16px 0px 16px 16px;
    align-items: center;
    position: relative;
    background-color: #fae6c5;
  }

  .cardDateRow.row {
    margin-left: 0px;
    margin-right: 0px;
  }

  .cardMediaTitleBox {
    width: 100%;
    height: 85%;
    position: absolute;
    bottom: 50px;
    display: flex;
    align-items: center;
  }

  .cardMediaTitle {
    color: #fae6c5;
    text-align: center;
    padding: 30% 0;
    padding-left: 20px;
    padding-right: 10px;
    font-size: 7em;
    font-family: "Bebas Neue";
    font-weight: 400;
    line-height: 0.8em;
    text-align: left;
    word-break: normal;
  }

  .cardMediaSort {
    position: absolute;
    color: #fae6c5;
    background-color: #1d1d1b;
    top: 0;
    width: fit-content;
    text-align: center;
    padding: 4px 10px;
    margin-top: 5%;
    margin-left: 5%;
    font-size: 3em;
    font-family: "Bebas Neue";
    font-weight: 400;
    line-height: 1em;
    text-align: left;
    text-transform: uppercase;
  }

  .column1 {
    width: 80%;
  }

  .column2 {
    width: 20%;
  }

  .cardMediaDate {
    font-size: 4.5em;
    font-family: "Bebas Neue";
    font-weight: 900;
    line-height: 1em;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    padding-left: 10px;
  }

  &:hover {
    .cardMediaImgBox {
      transform: scale(1.05);
      opacity: 0.9;
    }
  }

  @media screen and (max-width: 1872px) {
    .cardMediaTitle {
      font-size: 5.5rem;
    }
  }

  @media screen and (max-width: 1490px) {
    .cardMediaTitle {
      font-size: 4.5rem;
    }
    .cardMediaSort {
      top: 0;
      font-size: 2.5em;
      width: auto;
    }
  }

  @media screen and (max-width: 1250px) {
    .cardMediaTitle {
      font-size: 3.8rem;
    }
    .cardMediaDate {
      font-size: 3.2em;
    }
  }

  @media screen and (max-width: 999px) {
    .cardMediaTitle {
      font-size: 7rem;
    }
    .cardMediaDate {
      font-size: 7em;
    }
    .cardMediaPlus {
      scale: 1.8;
    }
    .Card3GridItem {
      width: 70%;
      height: auto;
      padding-bottom: 25px;
    }

    .cardMediaSort {
      font-size: 3em;
      width: auto;
    }
  }

  @media screen and (max-width: 905px) {
    .cardMediaTitle {
      font-size: 6.5rem;
    }
  }

  @media screen and (max-width: 815px) {
    .cardMediaTitle {
      font-size: 5.5rem;
    }
    .cardMediaDate {
      font-size: 5em;
    }
    .cardMediaPlus {
      scale: 1.2;
    }
  }

  @media screen and (max-width: 705px) {
    .cardMediaTitle {
      font-size: 4.7rem;
    }
  }

  @media screen and (max-width: 605px) {
    .cardMediaTitle {
      font-size: 4.4rem;
    }
    .cardMediaDate {
      font-size: 4.5em;
    }
  }

  @media screen and (max-width: 555px) {
    .cardMediaTitle {
      font-size: 3.5rem;
    }
    .cardMediaSort {
      top: 0;
      font-size: 2.5em;
      width: auto;
    }
    .cardMediaDate {
      font-size: 3.5em;
    }
    .cardMediaPlus {
      scale: 0.6;
    }
    .cardDateRow {
      padding: 0px;
    }
  }

  @media screen and (max-width: 422px) {
    .cardMediaTitle {
      font-size: 2.5em;
    }
    .cardMediaSort {
      top: 0;
      font-size: 2.5em;
      width: auto;
    }
    .cardMediaDate {
      font-size: 2.4em;
    }
  }

  @media screen and (max-width: 322px) {
    .cardMediaTitle {
      font-size: 2rem;
    }
  }
`;

export const StyledCardAction = styled.button`
  background-color: #fae6c5 !important;
  width: 100%;
  padding-top: 100%;
  display: block;
  text-align: inherit;
  color: inherit;
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  cursor: pointer;
  position: relative;
  align-items: center;
  user-select: none;
  border-radius: 0;
  vertical-align: middle;
  -moz-appearance: none;
  justify-content: center;
  text-decoration: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
`;
