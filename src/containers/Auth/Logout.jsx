import React, { useEffect } from "react";
import { authActions } from "../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Logout = (props) => {
  console.log("render logout");
  const { onLogout } = props;
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(authActions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
