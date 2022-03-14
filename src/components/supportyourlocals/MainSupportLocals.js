import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector } from "react-redux";
import "./MainSupportLocals.css";

function MainSupportLocals() {
  const breakpoint = useMediaQuery("(max-width:950px)");
  const data = useSelector((state) => state.data);
  const { support = [] } = data;

  return (
    <div className="backgroundGrid">
      {support.length > 0 && (
        <GridList
          cols={breakpoint ? 1 : 3}
          rows={1}
          spacing={20}
          cellHeight={240}
          className="gridList"
        >
          {support.slice(0, breakpoint ? 3 : 9).map((tile) => (
            <GridListTile key={tile.id} className="gridImg">
              <img
                src={tile.images[0]}
                alt={tile.name}
                className="gridImages"
              />
            </GridListTile>
          ))}
        </GridList>
      )}
    </div>
  );
}

export default React.memo(MainSupportLocals);
