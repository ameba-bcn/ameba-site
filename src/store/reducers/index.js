import { combineReducers } from "redux";
import auth from "./auth";
import cart from "./cart";
import profile from "./profile";
import data from "./data";
import fullscreen from "./fullscreen";
import loaders from "./loaders";
import menu from "./menu";

export default combineReducers({
  auth,
  cart,
  profile,
  data,
  fullscreen,
  loaders,
  menu,
});
