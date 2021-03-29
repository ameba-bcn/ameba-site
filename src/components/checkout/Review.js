import React from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { substractToCart } from './../../redux/actions/cart';
import { useDispatch } from "react-redux";
import './Review.css';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const mapStateToProps = state => {
  return {
    cart: state.cart.cart_data
  };
};

function Review(props) {
  const { cart_items, total} = props.cart;
  const classes = useStyles();
  const dispatch = useDispatch();

  const substractItem = (id) => {
    dispatch(substractToCart(id))
}

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Resum compra
      </Typography>
      <List disablePadding>
        {cart_items.map((item, i) => (
          <ListItem className={classes.listItem} key={i}>
            <ListItemText primary={item.name} secondary={item.discount_value} />
            <Typography variant="body2">{item.price}</Typography>
            <div className="deleteItem" onClick={() => substractItem(item.id)}><DeleteIcon /></div>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Recollida
          </Typography>
          <Typography gutterBottom>No es realitzen enviaments, només recollida a Barcelona</Typography>
          <Typography gutterBottom>La recollida es pot fer de 10-14 a l'adreça i de 16-20 a Rhythm Control</Typography>
          <Typography gutterBottom>Qualsevol dubte possat en contacte amb nosaltres: info@ameba.cat</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default connect(mapStateToProps)(Review);
