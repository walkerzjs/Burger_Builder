import React from "react";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import styled from "styled-components";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "../../shared/utility";

const AuthC = styled.div`
  margin: 2rem auto;
  width: 80%;
  text-align: center;
  box-shadow: 0 2px 3px #ccc;
  border: 1px solid #eee;
  padding: 2rem;

  button {
    margin: 0;
    /* color: green; */
    /* padding: 0; */
  }
  input {
    display: block;
    margin: 1rem auto;
  }

  @media (min-width: 600px) {
    width: 50rem;
  }
`;

class Auth extends React.Component {
  state = {
    isSignup: false,
    controls: {
      email: {
        elementType: "input",

        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
          //   name: "name"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",

        elementConfig: {
          type: "password",
          placeholder: "Password",
          //   name: "name"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
  };

  inputChange = (e, id) => {
    const value = e.target.value;
    this.setState((prevState) => {
      const { isValid, errorMessage } = checkValidity(
        value,
        prevState.controls[id].validation
      );
      const controlsId = updateObject(prevState.controls[id], {
        value: value,
        valid: isValid,
        errorMessage: errorMessage,
        touched: true,
      });
      const controls = updateObject(prevState.controls, { [id]: controlsId });
      return { controls: controls };
    });
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }
  switchAuth = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    // const controls = this.state.controls
    //check whether the form is valid, check all fields, update form error config
    const form = { ...this.state.controls };
    let isAllValid = true;
    for (let key in form) {
      const formfield = { ...form[key] };
      const validationResult = checkValidity(
        formfield.value,
        formfield.validation ? formfield.validation : false
      );
      if (!validationResult.isValid) {
        isAllValid = false;
        formfield.valid = false;
        formfield.touched = true;
        formfield.errorMessage = validationResult.errorMessage;
      }
      form[key] = formfield;
    }
    //if not all fields are valid, update state for error and stop submit;
    if (!isAllValid) {
      this.setState({ controls: form });
      return;
    }

    this.props.onSubmit(
      form.email.value,
      form.password.value,
      this.state.isSignup
    );
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.authRedirectPath} />;
    }
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formElementsArray.map((formElement) => {
      return (
        <Input
          label={formElement.id.toUpperCase()}
          {...formElement.config}
          onChange={(e) => this.inputChange(e, formElement.id)}
          key={formElement.id}
          invalid={!this.state.controls[formElement.id].valid}
          shouldValidate={this.state.controls[formElement.id].validation}
          touched={this.state.controls[formElement.id].touched}
        />
      );
    });
    if (this.props.loading) {
      form = <Spinner />;
    }
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <AuthC>
        {errorMessage}
        <form>
          {form}
          <Button btnType="success" clicked={this.onSubmit}>
            Submit
          </Button>
        </form>
        <Button btnType="danger" clicked={this.switchAuth}>
          Switch to {this.state.isSignup ? "Sign In" : "Sign Up"}
        </Button>
      </AuthC>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (email, password, isSignup) =>
      dispatch(actions.authActions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () =>
      dispatch(actions.authActions.setAuthRedirectPath("/")),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.AuthReducer.loading,
    error: state.AuthReducer.error,
    isAuthenticated: state.AuthReducer.token !== null,
    buildingBurger: state.BurgerReducer.building,
    authRedirectPath: state.AuthReducer.authRedirectPath,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
