import { combineReducers } from "redux";
import auth from "./auth";
import cart from "./cart";
import message from "./message";
import profile from "./profile";
import data from "./data";
import fullscreen from "./fullscreen";

export default combineReducers({
  auth,
  cart,
  message,
  profile,
  data,
  fullscreen,
});
