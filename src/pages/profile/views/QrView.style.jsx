import styled from "styled-components";

export const StyledQrBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  .image-carousel-root {
    max-width: 460px;
  }
  #qr-disclaimer {
    max-width: 460px;
    margin-bottom: 24px;
  }
  @media screen and (max-width: 610px) {
    padding: 0px 5px;
  }
`;
