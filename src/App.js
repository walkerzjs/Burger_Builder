import React, { Suspense, useEffect, useCallback } from "react";
import ReactDOMServer from "react-dom/server";
import styled from "styled-components";
import Layout from "./containers/Layout";
import BurgurBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "./containers/Checkout/Checkout";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import Orders from "./containers/Orders";
import { useDispatch, useSelector } from "react-redux";
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

const App = (props) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.AuthReducer.token !== null
  );
  const getBasePrice = useCallback(() => {
    console.log("get base price");
    let basePrice = 0;
    axios
      .get("basePrice.json")
      .then((response) => {
        basePrice = response.data;
        // props.onUpdatingBasePrice(basePrice);
        dispatch({ type: actionTypes.UPDATE_BASE_PRICE, basePrice: basePrice });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(authActions.authCheckState());
    getBasePrice();
  }, [dispatch, getBasePrice]);

  let routes = (
    <Switch>
      <Route path="/" exact render={(props) => <BurgurBuilder {...props} />} />
      <Route path="/auth" render={(props) => <Auth {...props} />} />

      <Redirect to="/" />
    </Switch>
  );
  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={BurgurBuilder} />
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <BrowserRouter>
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout>{routes}</Layout>
        </Suspense>
      </Container>
    </BrowserRouter>
  );
};

export default App;
