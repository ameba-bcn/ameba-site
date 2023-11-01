import styled from "styled-components";

export const StyledHeightBlock = styled.div`
  display: flex;
  width: 100%;
  height: ${(props) => (props.height ? `${props.height}px` : "24px")};
`;
