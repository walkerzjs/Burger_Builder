import { put } from "redux-saga/effects";
import { burgerActions } from "../actions/index";
import axios from "../../axios-order";

export function* fetchIngredentsSaga(action) {
  try {
    const response = yield axios.get("ingredients.json");
    let updatedPrice = yield Object.keys(response.data)
      .map(
        yield (ingredient) => {
          return (
            action.INGREDIENT_PRICES[ingredient] * response.data[ingredient]
          );
        }
      )
      .reduce(yield (sum, el) => sum + el, 0) + action.basePrice;
    yield put(burgerActions.updateBurger(response.data, updatedPrice, false));
  } catch (error) {
    console.log("1", error);
    yield put(burgerActions.fetchIngredentsFailed(error));
  }
}
