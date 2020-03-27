import React from "react";
import styled from "styled-components";
import logo from "../assets/images/burger_image.png";

const LogoC = styled.div`
  background-color: white;
  padding: 8px;
  height: 100%;
  border-radius: 5px;

  img {
    height: 100%;
  }
`;

const Logo = props => {
  return (
    <LogoC style={{ height: props.height }}>
      <img src={logo} alt="burger logo" />
    </LogoC>
  );
};

export default Logo;
