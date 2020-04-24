import { combineReducers } from "redux";
import BurgerReducer from "./burgerReducer";
import CustomerReducer from "./customerReducer";
import OrderReducer from "./order";

export default combineReducers({
  BurgerReducer,
  CustomerReducer,
  OrderReducer,
});
