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

  transform: ${(props) =>
    props.show ? "translateY(0)" : "translateY(-100vh)"};
  opacity: ${(props) => (props.show ? "1" : "0")};
  /* @media (min-width: 60rem) {
    width: 50rem;
    left: calc(50%-25rem);
  } */
`;
const areEqual = (prevProps, nextProps) => {
  return (
    nextProps.show === prevProps.show && nextProps.loading === prevProps.loading
  );
};

const Modal = React.memo((props) => {
  console.log("render modal");
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <ModelC show={props.show}>{props.children}</ModelC>
    </React.Fragment>
  );
}, areEqual);

export default Modal;
