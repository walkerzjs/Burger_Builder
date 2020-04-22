import React, { Component } from "react";
import styled from "styled-components";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  constructor(props) {
    super(props);
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
  // componentWillMount() {

  // }

  onCheckoutCancelled = () => {
    this.props.history.goBack();
  };

  onCheckoutContinue = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    console.log(this.state);
    return (
      <div>
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
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.BurgerReducer.ingredients,
    price: state.BurgerReducer.price,
  };
};

export default connect(mapStateToProps, {})(Checkout);
