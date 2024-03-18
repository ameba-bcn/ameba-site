import styled from "styled-components";

export const StyledSupportLocals = styled.div`
  display: flex;
  position: relative;
  border-color: white;
  border-radius: 2px;
  flex-direction: column;
  overflow-y: hidden;
  background-color: #f2c571;
`;

export const StyledOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: 0.5s ease;
  opacity: ${(props) => (props.isMobile ? 1 : 0)};
  margin: 0 auto;
  background: rgba(29, 29, 27, 0.5);
  &:hover {
    opacity: 1;
  }
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: inherit;
    height: -webkit-fill-available;
    cursor: inherit;
    div {
      cursor: pointer;
    }
  }
  .overlayTitle {
    color: #fae6c5;
    font-size: 180px;
    font-family: "Bebas Neue";
    font-weight: 400;
    line-height: 1.1em;
    overflow: hidden;
  }

  .overlayTitle:hover {
    color: #f2c571;
  }

  .overlaySubtitle {
    color: #fae6c5;
    font-family: "Bebas Neue";
    font-size: 50px;
    margin-top: -95px;
    text-transform: uppercase;
    font-weight: 100;
    line-height: 4em;
  }

  .lettersMoveSupport {
    width: 100%;
  }

  /* MOBILE */

  .overlayMobile {
    position: absolute;
    background: rgb(29, 29, 27);
    background: rgba(29, 29, 27, 0.5);
    width: 100%;
    height: 100%;
    transition: 0.5s ease;
    opacity: 1;
    text-align: center;
    padding: 20% 0;
    text-decoration: none;
  }

  .overlayTitleMobile {
    color: #fae6c5;
    font-size: 180px;
    font-family: "Bebas Neue";
    font-weight: 900;
    line-height: 0.9em;
  }

  @media screen and (max-width: 500px) {
    .overlayTitleMobile {
      font-size: 100px;
      vertical-align: center;
      margin-top: 200px;
    }
    .overlayTitle,
    .overlaySubtitle {
      display: none;
    }
  }

  @media screen and (max-width: 1200px) {
    .overlayTitle {
      font-size: 150px;
    }
    .overlaySubtitle {
      font-size: 40px;
    }
    .overlay {
      padding: 30% 0;
    }
  }
  @media screen and (max-width: 1000px) {
    .overlayTitle {
      font-size: 130px;
    }
    .overlaySubtitle {
      font-size: 35px;
      margin-top: -115px;
    }
    .overlay {
      padding: 35% 0;
    }
  }
`;
