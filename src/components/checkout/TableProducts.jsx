import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { substractToCart } from "../../redux/actions/cart";
import { clearMessage } from "../../redux/actions/message";
import { isCORSInactive } from "../../utils/utils";
import DeleteIcon from "@material-ui/icons/Delete";
import { ReviewTable } from "./Review.style";

export default function TableProducts(props) {
  const { setError } = props;
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { item_variants = [] } = cart_data;
  const dispatch = useDispatch();

  const substractItem = (id) => {
    dispatch(substractToCart(id))
      .then(() => {
        setError(false);
        dispatch(clearMessage());
      })
      .catch(() => {
        setError(true);
      });
  };
  return (
    <ReviewTable>
      <tbody>
        {item_variants?.map((item, i) => (
          <tr key={i}>
            <td className="reviewTable-col1">
              <img
                src={isCORSInactive() + item.preview}
                alt={"item-image-" + { item }}
              />
            </td>
            <td className="reviewTable-col2">{item.name}</td>
            <td className="reviewTable-col3">{item.price}</td>
            <td className="reviewTable-col4">
              <div
                className="deleteItem"
                onClick={() => substractItem(item.id)}
              >
                <DeleteIcon />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </ReviewTable>
  );
}
