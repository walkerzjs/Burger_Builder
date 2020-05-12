import React from "react";
import { authActions } from "../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Logout extends React.Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(authActions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);