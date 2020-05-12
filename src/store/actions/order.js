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
    error: false,
  };
};

export const purchaseBurger = (data, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, data)
      .then((response) => {
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

export const fetchOrders = (token, userId = null) => {
  return (dispatch) => {
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get(`orders.json${queryParams}`)
      .then((response) => {
        let orders = [];
        for (let key in response.data) {
          orders.push({ id: key, data: response.data[key] });
        }
        dispatch(fetchOrdersSuccess(orders));
      })
      .catch((error) => {
        dispatch(fetchOrdersFailed(error));
      });
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
    fetchingOrders: true,
  };
};
