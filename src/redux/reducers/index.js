import { combineReducers } from "redux";
import auth from "./auth";
import cart from "./cart";
import message from "./message";

export default combineReducers({
  auth,
  cart,
  message,
});