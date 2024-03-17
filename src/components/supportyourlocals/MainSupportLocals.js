import React from "react";
import { ImageList } from "@material-ui/core";
import { ImageListItem } from "@material-ui/core";
import { useSelector } from "react-redux";
import "./MainSupportLocals.css";
import useMediaQuery from "../../hooks/use-media-query";

function MainSupportLocals() {
  const breakpoint = useMediaQuery("(max-width:950px)");
  const data = useSelector((state) => state.data);
  const { support = [] } = data;

  return (
    <div className="backgroundGrid">
      {support.length > 0 && (
        <ImageList
          cols={breakpoint ? 1 : 3}
          rows={1}
          gap={20}
          rowHeight={240}
          className="gridList"
        >
          {support.slice(0, breakpoint ? 3 : 9).map((tile) => (
            <ImageListItem key={tile.id} className="gridImg">
              <img
                src={tile.images[0]}
                alt={tile.name}
                className="gridImages"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </div>
  );
}

export default React.memo(MainSupportLocals);
