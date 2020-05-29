import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility.js";
const initialState = {
  ingredients: {},
  price: null,
  basePrice: null,
  error: false,
  errorMessage: "",
  building: false,
};

const updateBurger = (state, action) => {
  return updateObject(state, {
    ingredients: { ...action.ingredients },
    price: action.price,
    error: false,
  });
};

const updateBasePrice = (state, action) => {
  return updateObject(state, { basePrice: action.basePrice });
};
const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_BURGER:
      return updateBurger(state, action);

    case actionTypes.UPDATE_BASE_PRICE:
      return updateBasePrice(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      console.log("3", action.error);
      const updatedState = updateObject(state, {
        error: true,
        errorMessage: action.error.message,
      });
      console.log("updatedState", updatedState);
      return updatedState;

    case actionTypes.SET_BUILDING_BURGER:
      return updateObject(state, action);

    default:
      return state;
  }
};

export default burgerReducer;
