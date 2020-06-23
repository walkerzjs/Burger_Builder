import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData";
import { connect } from "react-redux";
import { orderActions } from "../../store/actions/index";

const Checkout = (props) => {
  const onCheckoutCancelled = () => {
    props.history.goBack();
  };

  const onCheckoutContinue = () => {
    props.history.replace("/checkout/contact-data");
  };

  let summary = <Redirect to="/" />;
  if (Object.keys(props.ingredients).length > 0) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ingredients}
          price={props.price}
          onCheckoutCancelled={onCheckoutCancelled}
          onCheckoutContinue={onCheckoutContinue}
        />
        <Route
          path={`${props.match.url}/contact-data`}
          render={(props) => (
            <ContactData
              ingredients={props.ingredients}
              price={props.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
  return summary;
};

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
