import React from "react";
import styled from "styled-components";

const OrderC = styled.div`
  width: 80%;
  border: 1px solid #eee;
  padding: 1rem;
  margin: 1rem auto;

  .OrderIngredient {
    text-transform: capitalize;
    display: inline-block;
    margin: 0 0.8rem;
    border: 1px solid #ccc;
    padding: 0.5rem;
  }
`;

const Order = (props) => {
  const ingredients = [];
  //alternative for Object.keys(array)
  console.log("order props: ", props);
  for (let name in props.order.data.ingredients) {
    ingredients.push({
      name: name,
      amount: props.order.data.ingredients[name],
    });
  }
  return (
    <OrderC>
      <p>Order Id: {props.order.id}</p>

      <span>Ingredients:</span>
      {ingredients.map((item) => {
        return (
          <span key={item.name} className="OrderIngredient">
            {item.name}: ({item.amount})
          </span>
        );
      })}
      <p>
        Price: <strong>AUD {props.order.data.price}</strong>
      </p>
    </OrderC>
  );
};

export default Order;
