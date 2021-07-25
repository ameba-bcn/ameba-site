import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import "./CardNew.css";
import { formatISODateToDate, isCORSInactive } from "./../../utils/utils";

const CardNew = React.memo((props) => {
  return (
    <Card>
      <CardActionArea className="cardFrame">
        <img
          className="cardMedia"
          src={isCORSInactive() + props.imatge}
          alt={props.titol}
          title={props.titol}
        />
        <div className="cardMediaTitleBox">
          <div className="cardMediaTitle">{props.titol}</div>
        </div>
        <div className="cardMediaSort">{props.tipo}</div>
        <div className="cardDateRow row">
          <div className="cardMediaDate column1">
            {formatISODateToDate(props.data)}
          </div>
          <div className="cardMediaPlus column2">+</div>
        </div>
      </CardActionArea>
    </Card>
  );
});

export default CardNew;
