import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialStore = {
  orders: [],
  error: null,
  loading: false,
  purchased: false,
  fetchingOrders: false,
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: action.purchased });
};
const purchaseBurgerSuccess = (state, action) => {
  let newOrder = { id: action.id, data: action.data };
  return updateObject(state, {
    orders: state.orders.concat(newOrder),
    purchased: action.purchased,
    loading: action.loading,
  });
};

const purchaseBurgerFailed = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: action.loading,
  });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    fetchingOrders: action.fetchingOrders,
    orders: action.orders,
  });
};
const fetchOrdersFailed = (state, action) => {
  return updateObject(state, {
    fetchingOrders: action.fetchingOrders,
    error: action.error,
  });
};
const orderReducer = (state = initialStore, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, { loading: action.loading });

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAILED:
      return purchaseBurgerFailed(state, action);

    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, { fetchingOrders: action.fetchingOrders });

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);

    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOrdersFailed(state, action);

    default:
      return state;
  }
};

export default orderReducer;
