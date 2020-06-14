import * as types from "../constants/actionType";
const initialState = {
  isShowExchange: false,
  id: null,
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.EXCHANGE:
      const id = action.id;

      return Object.assign({}, state, {
        isShowExchange: true,
        id: id,
      });
    case types.CANCEL_EXCHANGE:
      return Object.assign({}, state, {
        isShowExchange: false,
        id: null,
      });
    default:
      return state;
  }
};

export default myReducer;
