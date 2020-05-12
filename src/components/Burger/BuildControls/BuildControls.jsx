import React from "react";
import styled from "styled-components";
import BuildControl from "./BuildControl";
const BuildControlsC = styled.div`
  width: 100%;
  background-color: #cf8f2e;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 1px #ccc;
  margin: auto;
  padding: 1rem 0;
  flex-wrap: wrap;

  p {
    font-size: 1.4rem;
  }
  .OrderButton {
    background-color: #dad735;
    outline: none;
    cursor: pointer;
    border: 1px solid #966909;
    color: #966909;
    font-family: inherit;
    font-size: 1.2em;
    padding: 15px 30px;
    box-shadow: 2px 2px 2px #966909;
  }

  .OrderButton:hover,
  .OrderButton:active {
    background-color: #a0db41;
    border: 1px solid #966909;
    color: #966909;
  }

  .OrderButton:disabled {
    background-color: #c7c6c6;
    cursor: not-allowed;
    border: 1px solid #ccc;
    color: #888888;
  }

  .OrderButton:not(:disabled) {
    animation: enable 0.3s linear;
  }

  @keyframes enable {
    0% {
      transform: scale(1);
    }
    60% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => {
  return (
    <BuildControlsC>
      <p>
        Total Price: <strong>{props.totalPrice}</strong>
      </p>
      {controls.map((ctrl) => {
        return (
          <BuildControl
            disabled={props.disabledInfo[ctrl.type]}
            key={ctrl.label}
            label={ctrl.label}
            addIngredient={() => props.addIngredient(ctrl.type)}
            removeIngredient={() => props.removeIngredient(ctrl.type)}
          />
        );
      })}
      <button
        className="OrderButton"
        disabled={!props.purchaseable}
        onClick={props.purchasing}
      >
        {props.isAuthenticated ? "ORDER NOW" : "SIGN UP TO ORDER"}
      </button>
    </BuildControlsC>
  );
};

export default buildControls;
