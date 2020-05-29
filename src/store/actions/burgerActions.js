import * as actionTypes from "./actionTypes";
export const updateBurger = (ingredients, price) => {
  return {
    type: actionTypes.UPDATE_BURGER,
    ingredients: ingredients,
    price: price,
  };
};

export const fetchIngredents = (INGREDIENT_PRICES, basePrice) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS,
    INGREDIENT_PRICES: INGREDIENT_PRICES,
    basePrice: basePrice,
  };
};

export const fetchIngredentsFailed = (error) => {
  console.log("2", error);
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error: error,
  };
};

export const setBuildingBurger = (building) => {
  return {
    type: actionTypes.SET_BUILDING_BURGER,
    building: building,
  };
};
