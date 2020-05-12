import React from "react";
import styled from "styled-components";
import Layout from "./containers/Layout";
import BurgurBuilder from "./containers/BurgurBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Orders from "./containers/Orders";
import { connect } from "react-redux";
import * as actionTypes from "./store/actions/actionTypes";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout";
import axios from "./axios-order";
import { authActions } from "./store/actions/index";

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
  };
  componentDidMount() {
    this.props.onAuthCheckState();
    this.getBasePrice();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgurBuilder} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgurBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />

          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <BrowserRouter>
        <Container>
          <Layout>
            <Switch>{routes}</Switch>
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

    onAuthCheckState: () => dispatch(authActions.authCheckState()),
  };
};
export default connect((state) => {
  return {
    basePrice: state.BurgerReducer.basePrice,
    isAuthenticated: state.AuthReducer.token !== null,
  };
}, mapDispatchToProps)(App);
