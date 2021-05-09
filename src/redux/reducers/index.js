import { combineReducers } from "redux";
import auth from "./auth";
import cart from "./cart";
import message from "./message";
import state from './state';

export default combineReducers({
  auth,
  cart,
  message,
  state
});