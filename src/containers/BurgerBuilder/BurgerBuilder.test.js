import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
configure({
  adapter: new Adapter(),
});

describe("<BurgerBuilder/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <BurgerBuilder
        onSetBuildingBurger={() => {}}
        onFetchIngredients={() => {}}
        onUpdatingBurger={() => {}}
        price={3}
        ingredients={{ salad: 0 }}
      />
    );
  });
  it("should render <BuildControls/> when receiving ingredients", () => {
    // wrapper.setProps({ ingredients: null });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
