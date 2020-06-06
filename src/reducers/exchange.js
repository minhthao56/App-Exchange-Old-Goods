import * as types from "../constants/actionType";
const initialState = {
  isShowExchange: false,
  id: null
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.EXCHANGE:
      let newData = {
        isShowExchange: !state.isShowExchange,
        id: action.id
      };
      return Object.assign(state, newData);

    default:
      return state;
  }
};

export default myReducer;
