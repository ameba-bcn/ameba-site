import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import "./CardNew.css";
import { formatISODateToDate, isCORSInactive } from "./../../utils/utils";
import PlusButton from "./../button/PlusButton";

const CardNew = React.memo((props) => {
  return (
    <Card>
      <CardActionArea className="cardFrame">
        <div className="cardMediaImgBox">
          <img
            className="cardMedia"
            src={isCORSInactive() + props.imatge}
            alt={props.titol}
            title={props.titol}
          />
        </div>
        <div className="cardMediaTitleBox">
          <div className="cardMediaTitle">{props.titol}</div>
        </div>
        <div className="cardMediaSort">{props.tipo}</div>
        <div className="cardDateRow row">
          <div className="cardMediaDate column1">
            {formatISODateToDate(props.data)}
          </div>
          <div className="cardMediaPlus column2">
            <PlusButton />
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
});

export default CardNew;
