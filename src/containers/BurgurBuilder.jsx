import React, { Component } from "react";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal";
import OrderSummary from "../components/Burger/OrderSummary";
import Backdrop from "../components/UI/Backdrop";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgurBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  };

  updatePurchaseState = updatedIngredients => {
    const ingredients = {
      ...updatedIngredients
    };
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => sum + el, 0);
    this.setState({ purchaseable: sum > 0 });
  };

  addIngredient = type => {
    console.log(type);
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: updatedCount
    };

    const oldPrice = this.state.totalPrice;
    const updatedPrice = INGREDIENT_PRICES[type] + oldPrice;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredient = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    let updatedCount = oldCount - 1;

    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: updatedCount
    };
    const oldPrice = this.state.totalPrice;
    let updatedPrice = oldPrice;

    updatedPrice = oldPrice - INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  unPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("You continue!");
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    // Object.entries(this.state.ingredients).forEach(el => {
    //   if (el[1] === 0) {
    //     disabledInfo[el[0]] = true;
    //   } else {
    //     disabledInfo[el[0]] = false;
    //   }
    // });
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.unPurchaseHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            cancel={this.unPurchaseHandler}
            continue={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice}
          />
        </Modal>

        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredient}
          removeIngredient={this.removeIngredient}
          disabledInfo={disabledInfo}
          totalPrice={this.state.totalPrice.toFixed(2)}
          purchaseable={this.state.purchaseable}
          purchasing={this.purchaseHandler}
        />
      </React.Fragment>
    );
  }
}

export default BurgurBuilder;
