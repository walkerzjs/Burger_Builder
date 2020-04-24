import React, { Component } from "react";
import styled from "styled-components";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData";
import { connect } from "react-redux";
import { orderActions } from "../../store/actions/index";

class Checkout extends Component {
  constructor(props) {
    super(props);
    // this.props.onInitPurchase();
    this.state = {
      // ingredients: null,
      // price: null,
    };
    // const query = new URLSearchParams(this.props.location.search);
    // const ingredients = {};
    // let price = null;
    // for (let param of query.entries()) {
    //   if (param[0] === "price") {
    //     price = parseFloat(param[1]);
    //     continue;
    //   }
    //   ingredients[param[0]] = parseInt(param[1]);
    // }
    // this.state.ingredients = ingredients;
    // this.state.price = price;
    // this.setState({ ingredients: ingredients, price: price });
  }
  // componentWillUnmount() {
  //   this.props.onInitPurchase();
  // }

  onCheckoutCancelled = () => {
    this.props.history.goBack();
  };

  onCheckoutContinue = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    console.log(this.state);
    let summary = <Redirect to="/" />;
    if (Object.keys(this.props.ingredients).length > 0) {
      console.log("purchased: ", this.props.purchased);
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            price={this.props.price}
            onCheckoutCancelled={this.onCheckoutCancelled}
            onCheckoutContinue={this.onCheckoutContinue}
          />
          <Route
            path={`${this.props.match.url}/contact-data`}
            render={(props) => (
              <ContactData
                ingredients={this.props.ingredients}
                price={this.props.price}
                {...props}
              />
            )}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.BurgerReducer.ingredients,
    price: state.BurgerReducer.price,
    purchased: state.OrderReducer.purchased,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitPurchase: () => dispatch(orderActions.purchaseInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
