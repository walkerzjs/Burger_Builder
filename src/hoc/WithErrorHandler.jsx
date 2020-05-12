import React from "react";
import Modal from "../components/UI/Modal";
const WithErrorHendler = (WrappedComponent, axios) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null };
      // replace componentWillMount
      const reqInterceptor = axios.interceptors.request.use(
        (req) => {
          //   this.setState({ error: null });
          return req;
        },
        (error) => {
          console.log("error1: ", error);
          this.setState({ error: error });
        }
      );
      const resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          console.log(
            "error2: ",
            error.message
            // Object.keys(error).map(key => {
            //   return error[key];
            // })
          );
          this.setState({ error: error });
        }
      );

      this.state.reqInterceptor = reqInterceptor;
      this.state.resInterceptor = resInterceptor;
    }

    componentWillUnmount() {
      // console.log(
      //   "ejecting",
      //   this.state.resInterceptor,
      //   this.state.reqInterceptor
      // );

      //notice one is request, other is response
      axios.interceptors.request.eject(this.state.resInterceptor);
      axios.interceptors.response.eject(this.state.reqInterceptor);

      // console.log("ejected: ", this.state.resInterceptor);
      // console.log("Removed auth header", { axios });
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <React.Fragment>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default WithErrorHendler;
