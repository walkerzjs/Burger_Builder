import React from "react";
import styled from "styled-components";

const ButtonC = styled.button`
  background-color: transparent;
  border: none;
  color: black;
  outline: none;
  cursor: pointer;
  font: inherit;
  padding: 10px;
  margin: 10px;
  font-weight: bold;

  .Button:first-of-type {
    margin-left: 0;
    padding-left: 0;
  }

  color: ${props =>
    props.btnType === "success"
      ? "#5c9210"
      : props.btnType === "danger"
      ? "#944317"
      : "currentcolor"};
`;

const Button = props => {
  return (
    <ButtonC onClick={props.clicked} btnType={props.btnType}>
      {props.children}
    </ButtonC>
  );
};

export default Button;
