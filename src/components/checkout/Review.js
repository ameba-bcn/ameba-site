import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import { substractToCart } from "./../../redux/actions/cart";
import ErrorBox from "../forms/error/ErrorBox";
import "./Review.css";

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

function Review() {
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { item_variants = [], total } = cart_data;
  const [error, setError] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const substractItem = (id) => {
    dispatch(substractToCart(id))
      .then(setError(false))
      .catch(() => {
        setError(true);
      });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Resum compra
      </Typography>
      <List disablePadding>
        {item_variants?.map((item, i) => (
          <ListItem className={classes.listItem} key={i}>
            <ListItemText primary={item.name} secondary={item.discount_value} />
            <Typography variant="body2">{item.price}</Typography>
            <div className="deleteItem" onClick={() => substractItem(item.id)}>
              <DeleteIcon />
            </div>
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
          <Typography gutterBottom>
            No es realitzen enviaments, només recollida a Barcelona
          </Typography>
          <Typography gutterBottom>
            La recollida es pot fer de 10-14 a l'adreça i de 16-20 a Rhythm
            Control
          </Typography>
          <Typography gutterBottom>
            Qualsevol dubte possat en contacte amb nosaltres: info@ameba.cat
          </Typography>
        </Grid>
      </Grid>
      {error && <ErrorBox isError={error} />}
    </React.Fragment>
  );
}

export default Review;
