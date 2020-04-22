import * as actionTypes from "../actions/actionTypes";

const initialState = { ingredients: {}, price: 0, basePrice: 0 };

const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_BURGER:
      console.log("burger reducer: ", action);
      return {
        ...state,
        ingredients: { ...action.ingredients },
        price: action.price,
      };
    case actionTypes.UPDATE_BASE_PRICE:
      console.log("base price reducer: ", action);
      return {
        ...state,
        basePrice: action.basePrice,
      };
    default:
      return state;
  }
};

export default burgerReducer;
