import styled from "styled-components";

export const StyledCardLayout = styled.div`
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px;
  min-height: ${(props) => (props.$emptyView ? "300px" : "min-content")};
  animation: fadein 300ms;
  background-color: var(--color-cream);
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .cardSupportDeck > i {
    width: 570px;
    min-width: 570px;
    height: 340px;
    margin: 0px 24px 48px 24px;
  }

  .fullcard {
    margin: 0px 24px 48px 24px;
    overflow: hidden;
    width: 570px;
    height: 340px;
    max-width: 570px;
    display: inline-block;
    justify-content: center;
    min-width: 570px;
  }

  .cardSupport {
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;
    display: inline-block;
    background-color: black;
  }

  .cardSupportImgTop {
    display: block;
    width: 100%;
    height: 500px;
    max-height: 500px;
    object-fit: cover;
    z-index: 0;
    transition: all 0.4s ease;
    opacity: 0.6;
    vertical-align: middle;
  }

  .cardSupport:hover .cardSupportImgTop {
    transform: scale(1.05);
    opacity: 0.7;
  }

  .cardSupportImgTop:hover {
    transform: scale(1.05);
    opacity: 0.7;
  }

  .cardSupportPlusBox {
    position: absolute;
    right: 5%;
    bottom: 5%;
  }

  .cardSupportPlusBox > div > div {
    font-size: 4em;
    line-height: 0.8em;
  }

  .cardTagBox {
    position: absolute;
    text-transform: uppercase;
    width: auto;
    height: 3rem;
    padding: 0px 10px;
    font-size: 2em;
    line-height: 1.4em;
    font-weight: 600;
    color: #fae6c5;
    background-color: #1d1d1b;
    left: 5%;
    top: 5%;
  }

  @media screen and (max-width: 1500px) {
    .fullcard {
      flex: 1 0 50%;
    }
  }

  @media screen and (max-width: 600px) {
    .fullcard {
      flex: 1 0 100%;
      min-width: 200px;
      width: auto;
    }
  }
`;
