import * as types from "../constants/actionType";
import axios from "axios";
const initialState = {};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOG_IN:
      const dataUser = action.dataUser;
      return Object.assign({}, state, {
        isAuth: true,
        name: dataUser.name,
        email: dataUser.email,
        avatarUrl: dataUser.avatarUrl,
        notification: dataUser.notification,
        isadmin: dataUser.isadmin,
        _id: dataUser._id,
      });
    case types.RESET:
      console.log("a");

      return Object.assign({}, state, {});
    default:
      return state;
  }
};

export default myReducer;
