import React from "react";
import styled from "styled-components";
import Layout from "./containers/Layout";
import BurgurBuilder from "./containers/BurgurBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Orders from "./containers/Orders";
import { connect } from "react-redux";
import * as actionTypes from "./store/actions/actionTypes";
import axios from "./axios-order";
const Container = styled.div`
  /* color: blue;
  font-size: 1rem; */
`;

class App extends React.Component {
  getBasePrice = () => {
    let basePrice = 0;
    axios
      .get("basePrice.json")
      .then((response) => {
        basePrice = response.data;
        this.props.onUpdatingBasePrice(basePrice);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("App: ", basePrice);
  };
  componentDidMount() {
    console.log("[App componentDidMount]");
    this.getBasePrice();
  }
  render() {
    return (
      <BrowserRouter>
        <Container>
          <Layout>
            <Switch>
              <Route path="/" exact component={BurgurBuilder} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
            </Switch>
          </Layout>
        </Container>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatingBasePrice: (basePrice) =>
      dispatch({
        type: actionTypes.UPDATE_BASE_PRICE,
        basePrice: basePrice,
      }),
  };
};
export default connect((state) => {
  return { basePrice: state.BurgerReducer.basePrice };
}, mapDispatchToProps)(App);
