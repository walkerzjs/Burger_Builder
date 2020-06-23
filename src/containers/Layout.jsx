import React, { useState } from "react";
import styled from "styled-components";
import Toolbar from "../components/Navigation/Toolbar";
import SideDrawer from "../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const Main = styled.main`
  margin-top: 7.2rem;
`;
const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const sideDrawerCloseHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerOpenHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <React.Fragment>
      <Toolbar
        sideDrawerOpen={sideDrawerOpenHandler}
        isAuthenticated={props.isAuthenticated}
      />
      <SideDrawer
        isAuthenticated={props.isAuthenticated}
        closed={sideDrawerCloseHandler}
        showDrawer={showSideDrawer}
      />
      {/* <div>Toolbar, SideDrawer, Backdrop</div> */}
      <Main>{props.children}</Main>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.token !== null,
  };
};

export default connect(mapStateToProps, {})(Layout);
