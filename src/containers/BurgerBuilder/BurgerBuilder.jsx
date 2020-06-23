import React, { useEffect, useState, useCallback } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  burgerActions,
  orderActions,
  authActions,
} from "../../store/actions/index";
import TestHOC from "../../hoc/TestHOC";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export const BurgerBuilder = (props) => {
  const [purchaseable, setPurchaseable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const dispatch = useDispatch();
  const { ingredients, price, basePrice, error, isAuthenticated } = useSelector(
    (state) => {
      return {
        ingredients: state.BurgerReducer.ingredients,
        price: state.BurgerReducer.price,
        basePrice: state.BurgerReducer.basePrice,
        error: state.BurgerReducer.error,
        isAuthenticated: state.AuthReducer.token !== null,
      };
    }
  );
  const onUpdatingBurger = (ingredients, price) =>
    dispatch(burgerActions.updateBurger(ingredients, price));

  const onFetchIngredients = (ingredientPrices, basePrice) => {
    dispatch(burgerActions.fetchIngredents(ingredientPrices, basePrice));
  };
  const onInitPurchase = () => dispatch(orderActions.purchaseInit());
  const onSetAuthRedirectPath = (path) =>
    dispatch(authActions.setAuthRedirectPath(path));
  const onSetBuildingBurger = useCallback(
    (building) => dispatch(burgerActions.setBuildingBurger(building)),
    []
  );

  useEffect(() => {
    onSetBuildingBurger(false);
    if (Object.keys(ingredients).length === 0 && basePrice) {
      onFetchIngredients(INGREDIENT_PRICES, basePrice);
    } else if (Object.keys(ingredients).length > 0 && basePrice) {
      const resetedIngredients = { ...ingredients };
      for (let key in resetedIngredients) {
        resetedIngredients[key] = 0;
      }
      onUpdatingBurger(resetedIngredients, basePrice);
    }
  }, [onSetBuildingBurger]);

  useEffect(() => {
    onFetchIngredients(INGREDIENT_PRICES, basePrice);

    if (purchaseable === false) {
      setPurchaseable(true);
    }
  }, [basePrice, purchaseable]);

  const updatePurchaseState = (updatedIngredients) => {
    const ingredients = {
      ...updatedIngredients,
    };
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((sum, el) => sum + el, 0);
    setPurchaseable(sum > 0);
  };

  const addIngredient = (type) => {
    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...ingredients,
      [type]: updatedCount,
    };

    const oldPrice = price;
    const updatedPrice = INGREDIENT_PRICES[type] + oldPrice;
    onUpdatingBurger(updatedIngredients, updatedPrice);

    updatePurchaseState(updatedIngredients);
  };

  const removeIngredient = (type) => {
    const oldCount = ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    let updatedCount = oldCount - 1;

    const updatedIngredients = {
      ...ingredients,
      [type]: updatedCount,
    };
    const oldPrice = price;
    let updatedPrice = oldPrice;

    updatedPrice = oldPrice - INGREDIENT_PRICES[type];
    onUpdatingBurger(updatedIngredients, updatedPrice);

    updatePurchaseState(updatedIngredients);
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetBuildingBurger(true);
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const unPurchaseHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push(`/checkout`);
  };

  //test whether can change redux prop directly, you can mutate but cannot replace into a new one.
  // const props2 = { ...this.props };
  // this.props.ingredients.bacon = 5;
  // console.log("price: ", this.props.ingredients);
  const disabledInfo = {
    ...ingredients,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = (
    <OrderSummary
      ingredients={ingredients}
      cancel={unPurchaseHandler}
      continue={purchaseContinueHandler}
      totalPrice={price ? price : 0}
    />
  );
  console.log("orderSummary: ", orderSummary);
  if (Object.keys(ingredients).length === 0) {
    orderSummary = <Spinner />;
  }

  let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;
  if (Object.keys(ingredients).length > 0 && price) {
    burger = (
      <React.Fragment>
        <Burger ingredients={ingredients} />
        <BuildControls
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          disabledInfo={disabledInfo}
          totalPrice={price.toFixed(2)}
          purchaseable={purchaseable}
          purchasing={purchaseHandler}
          isAuthenticated={isAuthenticated}
        />
      </React.Fragment>
    );
  }
  const TestComponent = (props) => {
    return (
      <h1>This is a custom higher order component named as {props.name}!</h1>
    );
  };
  console.log("TestComponent: ", TestComponent);
  return (
    <React.Fragment>
      {/* <fieldset>
        {" "}
        <legend tabIndex="0">Personal Information</legend>
      </fieldset> */}

      <Modal
        show={purchasing}
        modalClosed={unPurchaseHandler}
        // loading={this.state.loading}
      >
        {orderSummary}
      </Modal>
      <TestHOC child={TestComponent} />
      {burger}
    </React.Fragment>
  );
};

export default WithErrorHandler(BurgerBuilder, axios);
