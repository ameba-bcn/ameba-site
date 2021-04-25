import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import './CardNew.css';

export default function CardNew(props) {
  return (
    <Card className="cardMainFrame">
      <CardActionArea className="cardFrame">
        <img
          className="cardMedia"
          src={props.imatge}
          alt={props.titol}
          title={props.titol} />
        <div className="cardMediaTitle">
          {props.titol}
        </div>
        <div className="cardMediaSort">
          {props.tipo}
        </div>
        <CardContent className="row">
          <div className="cardMediaDate column1">
            {props.data}
          </div>
          <div className="cardMediaPlus column2">
            +
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}