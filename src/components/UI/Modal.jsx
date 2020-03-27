import React, { Component } from "react";
import styled from "styled-components";
import Backdrop from "../../components/UI/Backdrop";

const ModelC = styled.div`
  position: fixed;
  z-index: 500;
  background-color: white;
  width: 70%;
  border: 1px solid #ccc;
  padding: 1.6rem;
  box-shadow: 1px 1px 1px black;
  left: 15%;
  top: 30%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;

  transform: ${props => (props.show ? "translateY(0)" : "translateY(-100vh)")};
  opacity: ${props => (props.show ? "1" : "0")};
  /* @media (min-width: 60rem) {
    width: 50rem;
    left: calc(50%-25rem);
  } */
`;

class modal extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show;
  }
  render() {
    console.log("update Modal");
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <ModelC show={this.props.show}>{this.props.children}</ModelC>
      </React.Fragment>
    );
  }
}

export default modal;
