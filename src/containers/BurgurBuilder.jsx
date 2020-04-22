import React, { Component } from "react";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal";
import OrderSummary from "../components/Burger/OrderSummary";
import axios from "../axios-order";
import Spinner from "../components/UI/Spinner";
import WithErrorHandler from "../hoc/WithErrorHandler";
import { connect } from "react-redux";
import { burgerActions } from "../store/actions/index";
// import * as actions from '../store/actions/index'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgurBuilder extends Component {
  state = {
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // console.log("base price 1: ", this.props.basePrice);
    this.props.onFetchIngredients(INGREDIENT_PRICES, this.props.basePrice);
    // console.log("result: ", result);
    // console.log("base price 2: ", this.props.basePrice);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.basePrice !== this.props.basePrice) {
      this.props.onFetchIngredients(INGREDIENT_PRICES, this.props.basePrice);
      console.log("[ComponentDidUpdate basePrice: ]", this.props.basePrice);
    }
    if (
      this.props.price > this.props.basePrice &&
      prevProps.price !== this.props.price
    ) {
      this.setState({ purchaseable: true });
    }
  }

  updatePurchaseState = (updatedIngredients) => {
    const ingredients = {
      ...updatedIngredients,
    };
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((sum, el) => sum + el, 0);
    this.setState({ purchaseable: sum > 0 });
  };

  addIngredient = (type) => {
    const oldCount = this.props.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.props.ingredients,
      [type]: updatedCount,
    };

    const oldPrice = this.props.price;
    const updatedPrice = INGREDIENT_PRICES[type] + oldPrice;
    // this.setState({
    //   ingredients: updatedIngredients,
    //   totalPrice: updatedPrice,
    // });
    this.props.onUpdatingBurger(updatedIngredients, updatedPrice);

    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredient = (type) => {
    const oldCount = this.props.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    let updatedCount = oldCount - 1;

    const updatedIngredients = {
      ...this.props.ingredients,
      [type]: updatedCount,
    };
    const oldPrice = this.props.price;
    let updatedPrice = oldPrice;

    updatedPrice = oldPrice - INGREDIENT_PRICES[type];

    // this.setState({
    //   ingredients: updatedIngredients,
    //   totalPrice: updatedPrice,
    // });
    this.props.onUpdatingBurger(updatedIngredients, updatedPrice);

    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  unPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // let queries = [];
    // queries = Object.keys(this.props.ingredients).map((ingredient) => {
    //   return `${encodeURIComponent(ingredient)}=${encodeURIComponent(
    //     this.props.ingredients[ingredient]
    //   )}`;
    // });
    // let query = queries.join("&");
    // this.props.history.push(
    //   `/checkout?${query}&price=${this.props.price.toFixed(2)}`
    // );
    this.props.history.push(`/checkout`);
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
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

    let orderSummary = (
      <OrderSummary
        ingredients={this.props.ingredients}
        cancel={this.unPurchaseHandler}
        continue={this.purchaseContinueHandler}
        totalPrice={this.props.price}
      />
    );
    if (this.state.loading || !this.props.ingredients) {
      orderSummary = <Spinner />;
    }

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredient={this.addIngredient}
            removeIngredient={this.removeIngredient}
            disabledInfo={disabledInfo}
            totalPrice={this.props.price.toFixed(2)}
            purchaseable={this.state.purchaseable}
            purchasing={this.purchaseHandler}
          />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.unPurchaseHandler}
          loading={this.state.loading}
        >
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.BurgerReducer.ingredients,
    price: state.BurgerReducer.price,
    basePrice: state.BurgerReducer.basePrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatingBurger: (ingredients, price) =>
      dispatch(burgerActions.updateBurger(ingredients, price)),
    onFetchIngredients: (ingredientPrices, basePrice) => {
      dispatch(burgerActions.fetchIngredents(ingredientPrices, basePrice));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgurBuilder, axios));
