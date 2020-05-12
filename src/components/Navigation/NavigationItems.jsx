import React from "react";
import styled from "styled-components";
import NavigationItem from "./NavigationItem";
import { withRouter } from "react-router-dom";
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
const NavigationItems = (props) => {
  //   console.log("nav ", props, props.match.url);
  return (
    <NavigationItemsC>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {!props.isAuthenticated ? (
        <NavigationItem link="/auth">Authenticate</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Logout</NavigationItem>
      )}
    </NavigationItemsC>
  );
};

export default withRouter(NavigationItems);
