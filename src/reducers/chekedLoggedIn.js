import * as types from "../constants/actionType";
import axios from "axios";
const initialState = {
  isAuth: false,
  dataUser: {},
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGGED_IN:
      const newData = {
        isAuth: true,
        dataUser: action.dataUser,
      };
      return newData;
    default:
      return state;
  }
};

export default myReducer;
