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

    default:
      return state;
  }
};
export default myReducer;
