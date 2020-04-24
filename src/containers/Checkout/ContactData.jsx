import React from "react";
import styled from "styled-components";
import Button from "../../components/UI/Button";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner";
import Input from "../../components/UI/Input";
import { connect } from "react-redux";
import { orderActions } from "../../store/actions/index";

const ContactDataC = styled.div`
  margin: 2rem auto;
  width: 80%;
  text-align: center;
  box-shadow: 0 2px 3px #ccc;
  border: 1px solid #eee;
  padding: 2rem;

  button {
    margin: 0;
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

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",

        elementConfig: {
          type: "text",
          placeholder: "Your Name",
          //   name: "name"
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Email",
          //   name: "email"
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street name",
          //   name: "street"
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal code",
          //   name: "postalCode"
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          defaultValue: "cheapest",
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
          //   name: "deliveryMethod"
        },
        value: "cheapest",
      },
      country: {
        elementType: "select",
        elementConfig: {
          defaultValue: "Australia",
          options: [
            { value: "Australia", displayValue: "Australia" },
            { value: "US", displayValue: "United States" },
          ],
          //   name: "country"
        },
        value: "Australia",
      },
    },
  };

  orderSubmit = (e) => {
    e.preventDefault();

    //check whether the form is valid, check all fields, update form error config
    const form = { ...this.state.orderForm };
    let isAllValid = true;
    for (let key in form) {
      const formfield = { ...form[key] };
      const validationResult = this.checkValidity(
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
      this.setState({ orderForm: form });
      console.log(form);
      return;
    }
    //if not invlid, then start sending data.
    // this.setState({ loading: true });

    let formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price.toFixed(2),
      formData,
    };
    this.props.onSubmit(order);
    // axios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     this.setState({ loading: false });
    //     this.props.history.push("/");
    //   })
    //   .catch((error) => {
    //     this.setState({ loading: false });
    //   });
  };

  checkValidity = (value, isRuleRequired) => {
    //what a pattern!
    let isValid = true;
    let errorMessage = "";
    if (isRuleRequired.required) {
      isValid = value.trim() !== "" && isValid;
      if (!isValid) {
        errorMessage = "Please add something!";
      }
    }
    if (isRuleRequired.minLength) {
      isValid = value.length >= isRuleRequired.minLength && isValid;
      if (!isValid) {
        errorMessage = `The length of this field should be more than ${
          isRuleRequired.minLength - 1
        } and less than ${isRuleRequired.maxLength + 1}`;
      }
    }
    if (isRuleRequired.maxLength) {
      isValid = value.length <= isRuleRequired.maxLength && isValid;
      if (!isValid) {
        errorMessage = `The length of this field should be more than ${
          isRuleRequired.minLength - 1
        } and less than ${isRuleRequired.maxLength + 1}`;
      }
    }

    return { isValid, errorMessage };
  };

  inputChange = (e, fieldName) => {
    //!! notice to use deep copy
    const orderForm = { ...this.state.orderForm };
    const updatedFormField = { ...orderForm[fieldName] };
    updatedFormField.value = e.target.value;
    const validationResult = this.checkValidity(
      updatedFormField.value,
      updatedFormField.validation ? updatedFormField.validation : false
    );
    updatedFormField.valid = validationResult.isValid;
    updatedFormField.errorMessage = validationResult.errorMessage;
    updatedFormField.touched = true;
    // console.log(updatedFormField);
    orderForm[fieldName] = updatedFormField;
    this.setState({ orderForm: orderForm });
  };

  render() {
    // console.log(this.state.orderForm);

    let elements = [];
    for (let fieldName in this.state.orderForm) {
      elements.push(
        <Input
          label={fieldName.toUpperCase()}
          {...this.state.orderForm[fieldName]}
          onChange={(e) => this.inputChange(e, fieldName)}
          key={fieldName}
          invalid={!this.state.orderForm[fieldName].valid}
          shouldValidate={this.state.orderForm[fieldName].validation}
          touched={this.state.orderForm[fieldName].touched}
        />
      );
    }
    console.log("elements: ", elements);
    return (
      <ContactDataC>
        <h4>Enter your Contact Data</h4>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <form action="">
            {elements}
            <Button btnType="success" clicked={this.orderSubmit}>
              Order
            </Button>
          </form>
        )}
      </ContactDataC>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.OrderReducer.loading,
    ingredients: state.BurgerReducer.ingredients,
    price: state.BurgerReducer.price,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (data) => dispatch(orderActions.purchaseBurger(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
