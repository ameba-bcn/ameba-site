import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import './CardNew.css';

export default function CardNew(props) {
  return (
    <Card >
      <CardActionArea className="cardFrame">
        {/* <CardMedia
          component="img"
          alt={props.titol}
          image={props.imatge}
          title={props.titol}
          className="cardMedia"
        /> */}
        <img 
        className="cardMedia" 
        src={process.env.PUBLIC_URL +"/"+ props.imatge} 
        alt={props.titol} 
        title={props.titol}/>
        <div className="cardMediaTitle">
            {props.titol}
          </div>
        <CardContent>
          <div className="cardMediaDate">
            {props.data}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}