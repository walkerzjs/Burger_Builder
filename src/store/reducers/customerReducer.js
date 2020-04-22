import * as actionTypes from "../actions/actionTypes";
const initialState = { customer: {} };

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CUSTOMER:
      return {
        ...state,
        customer: { ...action.customer },
      };
    default:
      return state;
  }
};

export default customerReducer;
