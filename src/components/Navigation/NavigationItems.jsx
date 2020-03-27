import React from "react";
import styled from "styled-components";
import NavigationItem from "./NavigationItem";

const NavigationItemsC = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 100%;

  @media (min-width: 500px) {
    flex-flow: row;
  }
`;
const NavigationItems = () => (
  <NavigationItemsC>
    <NavigationItem link="/" active>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </NavigationItemsC>
);

export default NavigationItems;
