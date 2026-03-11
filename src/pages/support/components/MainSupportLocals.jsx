import React from "react";
import "./MainSupportLocals.css";
import RowSupportLocals from "./RowSupportLocals";
import useMediaQuery from "../../../hooks/use-media-query";
import useDataStore from "../../../stores/useDataStore";

function MainSupportLocals() {
  const breakpoint = useMediaQuery("(max-width:950px)");
  const { support = [] } = useDataStore();

  const block1 = support.slice(0, 3);
  const block2 = support.slice(3, 6);
  const block3 = support.slice(6, 9);
  return (
    <div className="main-support-locals__bg-grid">
      {support.length > 0 && (
        <div className="main-support-locals__image-list">
          <div>
            <RowSupportLocals breakpoint={breakpoint} itemsList={block1} />
          </div>
          <div>
            <RowSupportLocals breakpoint={breakpoint} itemsList={block2} />
          </div>
          <div>
            <RowSupportLocals breakpoint={breakpoint} itemsList={block3} />
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(MainSupportLocals);
