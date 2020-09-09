import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';


export default function CardNew(props) {
  return (
    <Card >
      <CardActionArea className="cardFrame">
        <CardMedia
          component="img"
          alt={props.titol}
          height="140"
          image={props.imatge}
          title={props.titol}
          className="cardMedia"
        />
        <CardContent>
          <div className="cardMediaTitle">
            {props.titol}
          </div>
          <div className="cardMediaText">
            {props.text}
          </div>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}