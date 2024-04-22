import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import RowSupportLocals from "./RowSupportLocals";
import useMediaQuery from "../../../hooks/use-media-query";

const StyledBgGrid = styled.div`
  display: flex;
  width: 100%;
`;

const StyledImageList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 100%;
`;

function MainSupportLocals() {
  const breakpoint = useMediaQuery("(max-width:950px)");
  const data = useSelector((state) => state.data);
  const { support = [] } = data;

  const block1 = support.slice(0, 3);
  const block2 = support.slice(3, 6);
  const block3 = support.slice(6, 9);
  return (
    <StyledBgGrid>
      {support.length > 0 && (
        <StyledImageList>
          <div>
            <RowSupportLocals breakpoint={breakpoint} itemsList={block1} />
          </div>
          <div>
            <RowSupportLocals breakpoint={breakpoint} itemsList={block2} />
          </div>
          <div>
            <RowSupportLocals breakpoint={breakpoint} itemsList={block3} />
          </div>
        </StyledImageList>
      )}
    </StyledBgGrid>
  );
}

export default React.memo(MainSupportLocals);
