import React from "react";
import styled from "styled-components";

const BuildControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 100%;
  margin: 5px 0;

  button {
    display: block;
    font: inherit;
    padding: 5px;
    width: 8rem;
    margin: 0 5px;
    border: 1px solid #aa6817;
    cursor: pointer;
    outline: none;

    &:disabled {
      background-color: #ac9980;
      border: 1px solid #7e7365;
      color: #ccc;
      cursor: default;
    }

    &:hover:disabled {
      background-color: #ac9980;
      color: #ccc;
      cursor: not-allowed;
    }
  }

  .Label {
    padding: 10px;
    font-weight: bold;
    width: 80px;
  }
  .Less {
    background-color: #d39952;
    color: white;
  }
  .More {
    background-color: #8f5e1e;
    color: white;
  }
  .Less:hover,
  .Less:active {
    background-color: #daa972;
    color: white;
  }
  .More:hover,
  .More:active {
    background-color: #99703f;
    color: white;
  }
`;

const buildControl = props => {
  // const disabledFlag = props.disabled===true?"disabled": null
  return (
    <BuildControl>
      <div className="Label">{props.label}</div>
      <button
        disabled={props.disabled}
        className="Less"
        onClick={props.removeIngredient}
      >
        Less
      </button>
      <button className="More" onClick={props.addIngredient}>
        More
      </button>
    </BuildControl>
  );
};

export default buildControl;
