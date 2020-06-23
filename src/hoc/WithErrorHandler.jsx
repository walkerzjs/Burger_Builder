import React, { useState, useEffect } from "react";
import Modal from "../components/UI/Modal";
import useHttpErrorHandler from "../hooks/http-error-handler";
const WithErrorHendler = (WrappedComponent, axios) => {
  const Comp = (props) => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <React.Fragment>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
  return Comp;
};

export default WithErrorHendler;
