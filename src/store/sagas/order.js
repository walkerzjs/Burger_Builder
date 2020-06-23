import { put } from "redux-saga/effects";
import { orderActions } from "../actions/index";
import axios from "../../axios-order";

export function* purchaseBurgerSaga(action) {
  try {
    yield put(orderActions.purchaseBurgerStart());
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.data
    );

    yield put(
      orderActions.purchaseBurgerSuccess(
        response.data.name,
        action.responsedata
      )
    );
  } catch (error) {
    console.log(error);
    yield put(orderActions.purchaseBurgerFailed(error));
  }
}

export function* fetchOrdersSaga(action) {
  try {
    yield put(orderActions.fetchOrdersStart());
    const queryParams = yield `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
    const response = yield axios.get(`orders.json${queryParams}`);

    let orders = yield [];
    console.log("response.data: ", response.data);
    for (let key in response.data) {
      yield orders.push({ id: key, data: response.data[key] });
    }
    yield put(orderActions.fetchOrdersSuccess(orders));
  } catch (error) {
    yield put(orderActions.fetchOrdersFailed(error));
  }
}
