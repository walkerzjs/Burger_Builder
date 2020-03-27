import React, { Component } from "react";
import styled from "styled-components";
import Toolbar from "../components/Navigation/Toolbar";
import SideDrawer from "../components/Navigation/SideDrawer/SideDrawer";

const Main = styled.main`
  margin-top: 7.2rem;
`;
class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerOpenHandler = () => {
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
  };
  render() {
    return (
      <React.Fragment>
        <Toolbar sideDrawerOpen={this.sideDrawerOpenHandler} />
        <SideDrawer
          closed={this.sideDrawerCloseHandler}
          showDrawer={this.state.showSideDrawer}
        />
        {/* <div>Toolbar, SideDrawer, Backdrop</div> */}
        <Main>{this.props.children}</Main>
      </React.Fragment>
    );
  }
}

export default Layout;
