import React from "react";
import styled from "styled-components";

const InputC = styled.div`
  width: 100%;
  padding: 1rem;

  .label {
    font-weight: bold;
    display: flex;
    margin-bottom: 0.8rem;
    /* text-align: left; */
    justify-content: start;
  }
  .inputElement {
    outline: none;
    border: 1px solid #ccc;
    background-color: white;
    font: inherit;
    padding: 0.6rem 1rem;
    display: block;
    width: 100%;

    &:focus {
      background-color: #ccc;
    }
  }

  .invalid {
    border: 1px solid red;
    background-color: #fda49a;
  }
  .errorMessage {
    color: red;
    margin: 5px 0;
    text-align: start;
  }
`;

const Input = props => {
  let inputElement = null;
  const inputClasses = ["inputElement"];
  let errorMessage = "";
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push("invalid");
    errorMessage = <p className="errorMessage">{props.errorMessage}</p>;
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          className={inputClasses.join(" ")}
          onChange={props.onChange}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          {...props.elementConfig}
          className={inputClasses.join(" ")}
          onChange={props.onChange}
        >
          {props.elementConfig.options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          //   value={props.value}
          onChange={props.onChange}
        />
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          //   value={props.value}
          className={inputClasses.join(" ")}
          onChange={props.onChange}
        />
      );
  }

  return (
    <InputC>
      <label className="label">{props.label}</label>
      {inputElement}
      {errorMessage}
    </InputC>
  );
};

export default Input;
