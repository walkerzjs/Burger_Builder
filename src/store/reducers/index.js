import { combineReducers } from "redux";
import BurgerReducer from "./burgerReducer";
import CustomerReducer from "./customerReducer";
import OrderReducer from "./order";
import AuthReducer from "./auth";

export default combineReducers({
  BurgerReducer,
  CustomerReducer,
  OrderReducer,
  AuthReducer,
});
