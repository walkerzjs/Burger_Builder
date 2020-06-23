import React, { useReducer, useEffect } from "react";
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
  /* .btn {
    color: red;
  } */
  input {
    display: block;
    margin: 1rem auto;
  }

  @media (min-width: 600px) {
    width: 50rem;
  }
`;

const authReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      const { isValid, errorMessage } = checkValidity(
        action.value,
        state.controls[action.id].validation
      );
      const controlsId = updateObject(state.controls[action.id], {
        value: action.value,
        valid: isValid,
        errorMessage: errorMessage,
        touched: true,
      });
      const controls = updateObject(state.controls, {
        [action.id]: controlsId,
      });
      // return { controls: controls };

      return {
        ...state,
        controls: controls,
      };
    case "SWITCH_AUTH":
      return {
        ...state,
        isSignup: !state.isSignup,
      };
    case "UPDATE_ERROR":
      return {
        ...state,
        controls: action.controls,
      };

    default:
      throw Error("should not be here");
  }
};

const Auth = (props) => {
  const state = {
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

  const [authState, dispatchAuthAction] = useReducer(authReducer, state);

  const inputChange = (e, id) => {
    const value = e.target.value;
    dispatchAuthAction({ type: "INPUT_CHANGE", value: value, id: id });
  };

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== "/") {
      props.onSetAuthRedirectPath();
    }
  }, []);

  const switchAuth = () => {
    dispatchAuthAction({ type: "SWITCH_AUTH" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // const controls = this.state.controls
    //check whether the form is valid, check all fields, update form error config
    const form = { ...authState.controls };
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
      dispatchAuthAction({ type: "UPDATE_ERROR", controls: form });
      return;
    }

    props.onSubmit(form.email.value, form.password.value, authState.isSignup);
  };

  if (props.isAuthenticated) {
    return <Redirect to={props.authRedirectPath} />;
  }
  let formElementsArray = [];
  for (let key in authState.controls) {
    formElementsArray.push({
      id: key,
      config: authState.controls[key],
    });
  }
  // for safari compatability
  formElementsArray.sort((a, b) => a.id.localeCompare(b.id));
  let form = formElementsArray.map((formElement) => {
    return (
      <Input
        label={formElement.id.toUpperCase()}
        {...formElement.config}
        onChange={(e) => inputChange(e, formElement.id)}
        key={formElement.id}
        invalid={!authState.controls[formElement.id].valid}
        shouldValidate={authState.controls[formElement.id].validation}
        touched={authState.controls[formElement.id].touched}
      />
    );
  });
  if (props.loading) {
    form = <Spinner />;
  }
  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  return (
    <AuthC>
      {errorMessage}
      <form>
        {form}
        <Button btnType="success" clicked={onSubmit}>
          Submit
        </Button>
      </form>
      <Button btnType="danger" clicked={switchAuth}>
        Switch to {authState.isSignup ? "Sign In" : "Sign Up"}
      </Button>
    </AuthC>
  );
};

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
