import * as types from "../constants/actionType";
const initialState = {
  isAuth: false,
  dataUser: {},
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGGED_IN:
      const dataUser = action.dataUser;
      return Object.assign({}, state, { isAuth: true, dataUser: dataUser });
    default:
      return state;
  }
};

export default myReducer;
