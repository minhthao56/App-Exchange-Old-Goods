import * as types from "../constants/actionType";
const initialState = {
  isShowSendAddress: false,
  id: null,
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEND_ADDRESS:
      const id = action.id;
      return Object.assign({}, state, {
        isShowSendAddress: true,
        id: id,
      });
    case types.CANCEL_SEND_ADDRESS:
      return Object.assign({}, state, {
        isShowSendAddress: false,
        id: null,
      });
    default:
      return state;
  }
};
export default myReducer;
