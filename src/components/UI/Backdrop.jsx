import React, { useRef } from "react";
import styled from "styled-components";

const BackdropC = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Backdrop = props => {
  const textInput = useRef(null);
  //   const toggle = () => {
  //     console.log(textInput);
  //     if (textInput.current.style.display !== "none") {
  //       textInput.current.style.display = "none";
  //     }
  //   };

  return props.show ? (
    <BackdropC ref={textInput} onClick={props.clicked}></BackdropC>
  ) : null;
};

export default Backdrop;
