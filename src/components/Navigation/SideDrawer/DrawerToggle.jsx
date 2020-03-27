import React from "react";
import styled from "styled-components";

const Menu = styled.div`
  width: 40px;
  height: ${props => (props.inDrawer ? "50px" : "100%")};
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
  cursor: pointer;

  div {
    width: 90%;
    height: 3px;
    background-color: ${props => (props.inDrawer ? "#703b09" : "white")};
  }

  @media (min-width: 500px) {
    display: none;
  }
`;

const DrawerToggle = props => {
  return (
    <Menu onClick={props.onClick} inDrawer={props.inDrawer}>
      <div></div>
      <div></div>
      <div></div>
    </Menu>
  );
};

export default DrawerToggle;
