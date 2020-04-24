import React from "react";

class TestHOC extends React.Component {
  render() {
    //receive a component (function or class)
    let Child = this.props.child;

    console.log("Child: ", this.props.child);
    // const Child = (props) => {
    //   return this.props.child;
    // };

    return <Child name="AA21212" />;
  }
}

export default TestHOC;
