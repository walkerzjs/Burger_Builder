import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const purchaseBurgerSuccess = (id, data) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id: id,
    data: data,
    loading: false,
    purchased: true,
  };
};

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error,
    loading: false,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
    loading: true,
  };
};

export const purchaseBurger = (data) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", data)
      .then((response) => {
        console.log(response);
        dispatch(purchaseBurgerSuccess(response.data.name, data));
        // this.props.history.push("/");
      })
      .catch((error) => {
        dispatch(purchaseBurgerFailed(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
    purchased: false,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
    fetchingOrders: false,
  };
};

export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error,
    fetchingOrders: false,
  };
};

export const fetchOrders = () => {
  return (dispatch) => {
    axios
      .get("orders.json")
      .then((response) => {
        let orders = [];
        for (let key in response.data) {
          orders.push({ id: key, data: response.data[key] });
        }
        dispatch(fetchOrdersSuccess(orders));
      })
      .catch((error) => {
        console.log("catched error in [Orders]: ", error);
        dispatch(fetchOrdersFailed(error));
      });
  };
};

export const fetchOrdersStart = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
    fetchingOrders: true,
  };
};
