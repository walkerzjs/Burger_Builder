import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  ingredients: {},
  price: null,
  basePrice: null,
  error: false,
};

const updateBurger = (state, action) => {
  console.log("burger reducer: ", action);
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
      return updateObject(state, { error: true });

    default:
      return state;
  }
};

export default burgerReducer;
