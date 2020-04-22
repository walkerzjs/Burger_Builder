import { combineReducers } from "redux";
import BurgerReducer from "./burgerReducer";
import CustomerReducer from "./customerReducer";

export default combineReducers({
  BurgerReducer,
  CustomerReducer,
});
