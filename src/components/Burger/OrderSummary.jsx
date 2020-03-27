import React, { Component } from "react";
import Button from "../UI/Button";
class OrderSummary extends Component {
  //this could be a functional component
  //   componentWillUpdate() {
  //     console.log("[order summary] WillUpdate");
  //   }
  ingredientSummary = Object.keys(this.props.ingredients).map(key => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
        {this.props.ingredients[key]}
      </li>
    );
  });
  render() {
    return (
      <React.Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients: </p>
        <ul>{this.ingredientSummary}</ul>
        <p>
          Total Price: <strong>{this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button clicked={this.props.continue} btnType="success">
          Continue
        </Button>
        <Button clicked={this.props.cancel} btnType="danger">
          Cancel
        </Button>
      </React.Fragment>
    );
  }
}

export default OrderSummary;
