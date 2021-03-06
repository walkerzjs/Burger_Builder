import React from "react";
import styled from "styled-components";
import NavigationItem from "../NavigationItem";
import { withRouter, useHistory } from "react-router-dom";
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
  // console.log("nav history", props.history, props.match.url);
  // let history = useHistory();
  // console.log("history: ", history);
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

// export default WithErrorHandler(withRouter(NavigationItems), axios);
// export default withRouter(NavigationItems);
export default NavigationItems;
