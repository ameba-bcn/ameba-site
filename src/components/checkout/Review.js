import React from "react";
import { useSelector } from "react-redux";
import ErrorBox from "../forms/error/ErrorBox";
import {
  ReviewContent,
  ReviewFooter,
  ReviewRowSeparator,
  ReviewTotalRow,
} from "./Review.style";
import TableProducts from "./TableProducts";

function Review({ setError: setCheckoutError }, error) {
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { total } = cart_data;

  return (
    <ReviewContent>
      <ReviewTotalRow>
        <div> Total</div>
        <div> {total}</div>
      </ReviewTotalRow>
      <ReviewRowSeparator isBig={true}/>
      <TableProducts isBig={true} setError={setCheckoutError} />
      <ReviewRowSeparator isBig={true}/>
      <ReviewFooter>
        Temporalment no fem enviaments de productes. <br/>La recollida es pot fer de
        10-14 i de 16-20 a Rhythm Control. <br/>Si tens qualsevol dubte contacta'ns a
        info@ameba.cat
      </ReviewFooter>
      {error===true && <ErrorBox isError={error} />}
    </ReviewContent>
  );
}

export default Review;
