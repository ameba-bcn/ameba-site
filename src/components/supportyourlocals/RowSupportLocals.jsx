import React from "react";
import styled from "styled-components";

const StyledImageListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 260px;
  padding: 10px;
  img {
    left: 50%;
    width: 100%;
    position: relative;
    transform: translateX(-50%);
    object-fit: cover;
    height: inherit;
  }
  .container-img {
    width: 33.3%;
    height: 260px;
    padding: 10px;
  }
`;

const RowSupportLocals = ({ breakpoint, itemsList = [] }) => {
  return breakpoint ? (
    <StyledImageListItem>
      <img
        src={itemsList[0]?.images[0]}
        alt={itemsList[0]?.name}
        className="gridImages"
      />
    </StyledImageListItem>
  ) : (
    <StyledImageListItem>
      {itemsList.map((tile) => (
        <div key={tile.name} className="container-img">
          <img
            src={tile.images[0]}
            alt={tile.name}
            className="gridImages"
            key={tile}
          />
        </div>
      ))}
    </StyledImageListItem>
  );
};

export default RowSupportLocals;
