import * as types from "../constants/actionType";
const initialState = {
  isShowSendAddress: false,
  id: null,
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEND_ADDRESS:
      let newData = {
        isShowSendAddress: !state.isShowSendAddress,
        id: action.id,
      };

      return Object.assign(state, newData);

    default:
      return state;
  }
};

export default myReducer;
