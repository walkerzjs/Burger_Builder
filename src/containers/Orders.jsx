import React from "react";
import Order from "../components/Order/Order";
import Spinner from "../components/UI/Spinner";
// import withErrorHandler from "../hoc/WithErrorHandler";
import { connect } from "react-redux";
import { orderActions } from "../store/actions/index";
class Orders extends React.Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      // this.props.onFetchingOrdersStart();
      this.props.onFetchingOrders(this.props.token, this.props.userId);
    }
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.isAuthenticated &&
      prevProps.isAuthenticated !== this.props.isAuthenticated
    ) {
      // this.props.onFetchingOrdersStart();
      this.props.onFetchingOrders(this.props.token);
    }
    if (!this.props.isAuthenticated) {
      this.props.history.push("/auth");
    }
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
    token: state.AuthReducer.token,
    isAuthenticated: state.AuthReducer.token !== null,
    userId: state.AuthReducer.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchingOrders: (token, userId) =>
      dispatch(orderActions.fetchOrders(token, userId)),
    onFetchingOrdersStart: () => dispatch(orderActions.fetchOrdersStart()),
  };
};

// export default withErrorHandler(
//   connect(mapStateToProps, mapDispatchToProps)(Orders),
//   axios
// );

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
