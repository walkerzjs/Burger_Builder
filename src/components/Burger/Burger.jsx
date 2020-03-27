import React from "react";
import styled from "styled-components";
import BurgerIngredient from "./BurgerIngredients";

const BurgerC = styled.div`
  width: 100%;
  margin: auto;
  height: 25rem;
  overflow: scroll;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;

  @media (min-width: 1000px) {
    width: 70rem;
    height: 60rem;
  }

  @media (min-width: 500px) {
    width: 35rem;
    height: 30rem;
  }
`;

const Burger = props => {
  const transformedIngredients = Object.entries(props.ingredients)
    .map(entry => {
      let result = [];
      if (entry[1] > 0) {
        for (let index = 0; index < entry[1]; index++) {
          result.push(
            <BurgerIngredient type={entry[0]} key={entry[0] + index} />
          );
        }
      }
      return result;
    })
    .reduce((arr, el) => {
      //   console.log(el);
      return arr.concat(el);
    }, []);

  console.log(transformedIngredients);
  return (
    <BurgerC>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients.length > 0 ? (
        transformedIngredients
      ) : (
        <div>Please add more ingredients</div>
      )}
      <BurgerIngredient type="bread-bottom" />
    </BurgerC>
  );
};

export default Burger;
