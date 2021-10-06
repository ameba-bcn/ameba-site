import React, { useState } from "react";
import { useSelector } from "react-redux";
import ErrorBox from "../forms/error/ErrorBox";
import "./Review.css";
import {
  ReviewContent,
  ReviewFooter,
  ReviewRowSeparator,
  ReviewTotalRow,
} from "./Review.style";
import TableProducts from "./TableProducts";

function Review({ setError: setCheckoutError }) {
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { total } = cart_data;
  const [error, setError] = useState(false);

  return (
    <ReviewContent>
      <ReviewTotalRow>
        <div> Total</div>
        <div> {total}</div>
      </ReviewTotalRow>
      <ReviewRowSeparator />
      <TableProducts isBig={true} setError={setError}/>
      <ReviewRowSeparator />
      <ReviewFooter>
        Temporalment no fem enviaments de productes, si tens qualsevol dubte
        contacta'ns a info@ameba.cat
      </ReviewFooter>
      {error && <ErrorBox isError={error} />}
    </ReviewContent>
    // <React.Fragment>
    //   <Typography variant="h6" gutterBottom>
    //     Resum compra
    //   </Typography>
    //   <List disablePadding>
    //     {item_variants?.map((item, i) => (
    //       <ListItem className={classes.listItem} key={i}>
    //         <ListItemText primary={item.name} secondary={item.discount_value} />
    //         <Typography variant="body2">{item.price}</Typography>
    //         <div className="deleteItem" onClick={() => substractItem(item.id)}>
    //           <DeleteIcon />
    //         </div>
    //       </ListItem>
    //     ))}
    //     <ListItem className={classes.listItem}>
    //       <ListItemText primary="Total" />
    //       <Typography variant="subtitle1" className={classes.total}>
    //         {total}
    //       </Typography>
    //     </ListItem>
    //   </List>
    //   <Grid container spacing={2}>
    //     <Grid item xs={12} sm={6}>
    //       <Typography variant="h6" gutterBottom className={classes.title}>
    //         Recollida
    //       </Typography>
    //       <Typography gutterBottom>
    //         No es realitzen enviaments, només recollida a Barcelona
    //       </Typography>
    //       <Typography gutterBottom>
    //         La recollida es pot fer de 10-14 a l'adreça i de 16-20 a Rhythm
    //         Control
    //       </Typography>
    //       <Typography gutterBottom>
    //         Qualsevol dubte possat en contacte amb nosaltres: info@ameba.cat
    //       </Typography>
    //     </Grid>
    //   </Grid>
    //   
    // </React.Fragment>
  );
}

export default Review;
