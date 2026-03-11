import React from "react";
import { formatISODateToDate } from "./../../utils/utils";
import PlusButton from "./../button/PlusButton";
import { MOBILE_SMALL } from "../../utils/constants";
import useMediaQuery from "../../hooks/use-media-query";
import "./CardNew.css";

const CardNew = (props) => {
  const processedText = (text) => {
    const maxLength = 45;
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };
  const isMobile = useMediaQuery(MOBILE_SMALL);

  return (
    <div className="card-new">
      <button className="card-new__action">
        <div className="cardMediaImgBox">
          <img
            className="cardMedia"
            src={props.imatge}
            alt={props.titol}
            title={props.titol}
          />
        </div>
        <div className="cardMediaTitleBox">
          <div className="cardMediaTitle">{processedText(props.titol)}</div>
        </div>
        <div className="cardMediaSort">{props.tipo}</div>
        <div className="cardDateRow row">
          <div className="cardMediaDate column1">
            {formatISODateToDate(props.data)}
          </div>
          <div className="cardMediaPlus column2">
            <PlusButton plusSize={isMobile ? "plus--medium" : "plus--big"} />
          </div>
        </div>
      </button>
    </div>
  );
};

export default React.memo(CardNew);
