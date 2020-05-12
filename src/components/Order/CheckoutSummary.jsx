import React from "react";
import styled from "styled-components";
import Burger from "../Burger/Burger";
import Button from "../UI/Button";
const CheckoutSummaryC = styled.div`
  text-align: center;
  width: 80%;
  margin: auto;

  @media (min-width: 600px) {
    width: 50rem;
  }

  .Burger {
    width: 100%;
    /* height: 30rem; */
    margin: auto;
  }
`;

const CheckoutSummary = (props) => {
  return (
    <CheckoutSummaryC>
      <h1>We hope it tastes well!</h1>
      <div className="Burger">
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="danger" clicked={props.onCheckoutCancelled}>
        Cancel
      </Button>
      <Button btnType="success" clicked={props.onCheckoutContinue}>
        Continue
      </Button>
    </CheckoutSummaryC>
  );
};

export default CheckoutSummary;
