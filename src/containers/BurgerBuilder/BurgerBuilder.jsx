import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler";
import { connect } from "react-redux";
import {
  burgerActions,
  orderActions,
  authActions,
} from "../../store/actions/index";
import TestHOC from "../../hoc/TestHOC";
// import * as actions from '../store/actions/index'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export class BurgerBuilder extends Component {
  state = {
    purchaseable: false,
    purchasing: false,
  };

  componentDidMount() {
    this.props.onSetBuildingBurger(false);
    if (
      Object.keys(this.props.ingredients).length === 0 &&
      this.props.basePrice
    ) {
      this.props.onFetchIngredients(INGREDIENT_PRICES, this.props.basePrice);
    } else if (
      Object.keys(this.props.ingredients).length > 0 &&
      this.props.basePrice
    ) {
      const resetedIngredients = { ...this.props.ingredients };
      for (let key in resetedIngredients) {
        resetedIngredients[key] = 0;
      }
      this.props.onUpdatingBurger(resetedIngredients, this.props.basePrice);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.basePrice !== this.props.basePrice) {
      this.props.onFetchIngredients(INGREDIENT_PRICES, this.props.basePrice);
    }
    if (
      this.props.price > this.props.basePrice &&
      prevProps.price !== this.props.price &&
      this.state.purchaseable === false
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
    this.props.onUpdatingBurger(updatedIngredients, updatedPrice);

    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetBuildingBurger(true);
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
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
    this.props.onInitPurchase();
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
    if (Object.keys(this.props.ingredients).length === 0) {
      orderSummary = <Spinner />;
    }

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (Object.keys(this.props.ingredients).length > 0 && this.props.price) {
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
            isAuthenticated={this.props.isAuthenticated}
          />
        </React.Fragment>
      );
    }
    class TestComponent extends React.Component {
      render() {
        return (
          <h1>
            This is a custom higher order component named as {this.props.name}!
          </h1>
        );
      }
    }
    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.unPurchaseHandler}
          // loading={this.state.loading}
        >
          {orderSummary}
        </Modal>
        <TestHOC child={TestComponent} />
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
    error: state.BurgerReducer.error,
    isAuthenticated: state.AuthReducer.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatingBurger: (ingredients, price) =>
      dispatch(burgerActions.updateBurger(ingredients, price)),
    onFetchIngredients: (ingredientPrices, basePrice) => {
      dispatch(burgerActions.fetchIngredents(ingredientPrices, basePrice));
    },
    onInitPurchase: () => dispatch(orderActions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(authActions.setAuthRedirectPath(path)),
    onSetBuildingBurger: (building) =>
      dispatch(burgerActions.setBuildingBurger(building)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
