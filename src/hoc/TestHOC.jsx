import React from "react";

const TestHOC = (props) => {
  //receive a component (function or class)
  let Child = props.child;

  // const Child = (props) => {
  //   return this.props.child;
  // };

  return <Child name="AA21212" />;
};

export default TestHOC;
