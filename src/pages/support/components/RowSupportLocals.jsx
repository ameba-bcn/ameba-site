import React from "react";
import "./RowSupportLocals.css";

const RowSupportLocals = ({ breakpoint, itemsList = [] }) => {
  return breakpoint ? (
    <div className="row-support-locals__item">
      <img
        src={itemsList[0]?.images[0]}
        alt={itemsList[0]?.name}
        className="gridImages"
      />
    </div>
  ) : (
    <div className="row-support-locals__item">
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
    </div>
  );
};

export default RowSupportLocals;
