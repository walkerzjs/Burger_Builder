import React from "react";
import styled from "styled-components";

import Logo from "../../Logo";
import NavigationItems from "../NavigationItems";
import Backdrop from "../../UI/Backdrop";
import DrawerToggle from "./DrawerToggle";

const SideDrawerC = styled.div`
  position: fixed;
  width: 28rem;
  max-width: 70%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 200;
  background-color: white;
  padding: 1rem 1.6rem;
  transition: transform 0.3s ease-out;

  @media (min-width: 500px) {
    display: none;
  }

  &.Open {
    transform: translateX(0);
  }
  &.Close {
    transform: translateX(-100%);
  }
  .logo {
    height: 11%;
    margin-bottom: 3.2rem;
  }
`;

const SideDrawer = (props) => {
  return (
    <React.Fragment>
      <Backdrop show={props.showDrawer} clicked={props.closed} />
      <SideDrawerC
        className={props.showDrawer ? "Open" : "Close"}
        onClick={props.closed}
      >
        <DrawerToggle inDrawer={true} onClick={props.closed} />
        <div className="logo">
          <Logo />
        </div>

        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </SideDrawerC>
    </React.Fragment>
  );
};

export default SideDrawer;
