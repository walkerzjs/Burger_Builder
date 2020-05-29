import React, { Suspense } from "react";
import styled from "styled-components";
import Layout from "./containers/Layout";
import BurgurBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "./containers/Checkout/Checkout";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import Orders from "./containers/Orders";
import { connect } from "react-redux";
import * as actionTypes from "./store/actions/actionTypes";
// import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout";
import axios from "./axios-order";
import { authActions } from "./store/actions/index";

const Container = styled.div`
  /* color: blue;
  font-size: 1rem; */
`;

const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});

const Orders = React.lazy(() => {
  return import("./containers/Orders");
});

const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

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
        {/* <Route path="/auth" component={Auth} /> */}
        <Route
          path="/auth"
          render={(props) => (
            <Suspense fallback={<div>Loading...</div>}>
              <Auth {...props} />
            </Suspense>
          )}
        />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgurBuilder} />

          <Route
            path="/checkout"
            // component={Checkout}

            render={(props) => (
              <Suspense fallback={<div>Loading...</div>}>
                <Checkout {...props} />
              </Suspense>
            )}
          />
          <Route
            path="/orders"
            render={(props) => (
              <Suspense fallback={<div>Loading...</div>}>
                <Orders {...props} />
              </Suspense>
            )}
          />

          <Route
            path="/auth"
            render={(props) => (
              <Suspense fallback={<div>Loading...</div>}>
                <Auth {...props} />
              </Suspense>
            )}
          />
          <Route path="/logout" component={Logout} />

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
