import React from "react";
import styled from "styled-components";
import Order from "../components/Order/Order";
import axios from "../axios-order";
import Spinner from "../components/UI/Spinner";
import withErrorHandler from "../hoc/WithErrorHandler";
class Orders extends React.Component {
  state = {
    orders: null,
    loading: true
  };
  componentDidMount() {
    axios
      .get("orders.json")
      .then(response => {
        this.setState({ orders: response.data, loading: false });
      })
      .catch(error => {
        console.log("catched error in [Orders]: ", error);
        this.setState({ loading: false });
      });
  }
  render() {
    let orders = <Spinner />;
    if (!this.state.loading && this.state.orders) {
      orders = Object.keys(this.state.orders).map(orderId => {
        return (
          <Order
            order={{ id: orderId, data: this.state.orders[orderId] }}
            key={orderId}
          />
        );
      });
    }
    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
