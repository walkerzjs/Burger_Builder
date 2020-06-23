import React from "react";
import Button from "../UI/Button";
const OrderSummary = (props) => {
  let ingredientSummary = Object.keys(props.ingredients).map((key) => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
        {props.ingredients[key]}
      </li>
    );
  });
  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>{ingredientSummary}</ul>
      <p>
        Total Price: <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button clicked={props.continue} btnType="success">
        Continue
      </Button>
      <Button clicked={props.cancel} btnType="danger">
        Cancel
      </Button>
    </React.Fragment>
  );
};

export default OrderSummary;
