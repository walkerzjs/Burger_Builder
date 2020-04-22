import React from "react";
import styled from "styled-components";
import Logo from "../Logo";
import NavigationItems from "./NavigationItems";
import DrawerToggle from "../Navigation/SideDrawer/DrawerToggle";
const ToolBarC = styled.header`
  height: 5.6rem;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #703b09;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  z-index: 90;

  nav {
    height: 100%;
  }
  .logo {
    height: 80%;
  }

  @media (max-width: 499px) {
    .DesktopOnly {
      display: none;
    }
  }
  /* @media (min-width: 500px) {
    & .DrawerToggle {
      display: none;
    }
  } */
`;

const Toolbar = props => {
  return (
    <ToolBarC>
      <DrawerToggle onClick={props.sideDrawerOpen} />
      <div className="logo">
        <Logo />
      </div>
      <nav className="DesktopOnly">
        <NavigationItems />
      </nav>
    </ToolBarC>
  );
};

export default Toolbar;
