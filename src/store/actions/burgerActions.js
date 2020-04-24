import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";
export const updateBurger = (ingredients, price) => {
  return {
    type: actionTypes.UPDATE_BURGER,
    ingredients: ingredients,
    price: price,
  };
};

export const fetchIngredents = (INGREDIENT_PRICES, basePrice) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("ingredients.json");
      let updatedPrice =
        Object.keys(response.data)
          .map((ingredient) => {
            return INGREDIENT_PRICES[ingredient] * response.data[ingredient];
          })
          .reduce((sum, el) => sum + el, 0) + basePrice;
      dispatch(updateBurger(response.data, updatedPrice));
    } catch (error) {
      dispatch(fetchIngredentsFailed());
    }
  };
};

export const fetchIngredentsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};
