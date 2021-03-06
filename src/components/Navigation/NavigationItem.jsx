import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavigationItemC = styled.li`
  margin: 1rem 0;
  display: block;
  width: 100%;

  & > a {
    color: #8f5c2c;
    text-decoration: none;
    width: 100%;
    display: block;

    &:hover,
    &:active,
    &.active {
      color: #40a4c8;
    }
  }

  @media (min-width: 500px) {
    margin: 0;
    display: flex;
    height: 100%;
    width: auto;
    align-items: center;

    & > a {
      color: white;
      text-decoration: none;
      height: 100%;
      padding: 1.6rem 1rem;
      border-bottom: 4px solid transparent;
      /* display: flex;
      align-items: center; */

      &:hover,
      &:active,
      &.NavigationItemActive {
        background-color: #8f5c2c;
        border-bottom: 4px solid #40a4c8;
        color: white;
      }
    }
  }
`;

const NavigationItem = (props) => (
  <NavigationItemC>
    <NavLink to={props.link} exact activeClassName="NavigationItemActive">
      {props.children}
    </NavLink>
  </NavigationItemC>
);

export default NavigationItem;
