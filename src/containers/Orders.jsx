import React from "react";
import styled from "styled-components";
import Order from "../components/Order/Order";
import axios from "../axios-order";
import Spinner from "../components/UI/Spinner";
import withErrorHandler from "../hoc/WithErrorHandler";
import { connect } from "react-redux";
import { orderActions } from "../store/actions/index";
class Orders extends React.Component {
  componentDidMount() {
    this.props.onFetchingOrdersStart();
    this.props.onFetchingOrders();
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.fetchingOrders && this.props.orders) {
      orders = this.props.orders.map((order) => {
        return (
          <Order order={{ id: order.id, data: order.data }} key={order.id} />
        );
      });
    }
    return <div>{orders}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    fetchingOrders: state.OrderReducer.fetchingOrders,
    orders: state.OrderReducer.orders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchingOrders: () => dispatch(orderActions.fetchOrders()),
    onFetchingOrdersStart: () => dispatch(orderActions.fetchOrdersStart()),
  };
};

export default withErrorHandler(
  connect(mapStateToProps, mapDispatchToProps)(Orders),
  axios
);
