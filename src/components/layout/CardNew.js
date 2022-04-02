import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { formatISODateToDate } from "./../../utils/utils";
import PlusButton from "./../button/PlusButton";
import { useMediaQuery } from "@material-ui/core";
import { MOBILE_SMALL } from "../../utils/constants";
import "./CardNew.css";

const CardNew = React.memo((props) => {
  const processedText = (text) => {
    const maxLength = 45;
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };
  const isMobile = useMediaQuery(MOBILE_SMALL)

  return (
    <Card>
      <CardActionArea className="cardFrame">
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
            <PlusButton plusSize={isMobile? "plus--medium": "plus--big"}/>
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
});

export default CardNew;
