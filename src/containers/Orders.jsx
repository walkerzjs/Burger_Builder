import React, { useEffect } from "react";
import Order from "../components/Order/Order";
import Spinner from "../components/UI/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { orderActions } from "../store/actions/index";

const Orders = (props) => {
  const fetchingOrders = useSelector(
    (state) => state.OrderReducer.fetchingOrders
  );
  const { orders, token, userId, isAuthenticated } = useSelector((state) => {
    return {
      token: state.AuthReducer.token,
      userId: state.AuthReducer.userId,
      orders: state.OrderReducer.orders,
      isAuthenticated: state.AuthReducer.token !== null,
    };
  });

  const dispatch = useDispatch();

  const { history } = props;
  useEffect(() => {
    if (isAuthenticated) {
      // onFetchingOrders(token, userId);
      dispatch(orderActions.fetchOrders(token, userId));
    }
    if (!isAuthenticated) {
      history.push("/auth");
    }
  }, [isAuthenticated, token, userId, history, dispatch]);

  let ordersList = <Spinner />;
  if (!fetchingOrders && orders) {
    ordersList = orders.map((order) => {
      return (
        <Order order={{ id: order.id, data: order.data }} key={order.id} />
      );
    });
  }
  return <div>{ordersList}</div>;
};

export default Orders;
