import * as types from "../constants/actionType";
import axios from "axios";
const initialState = {
  isAuth: false,
  dataUser: {}
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOG_IN:
      axios
        .post("https://tc9y3.sse.codesandbox.io/users/login", action.user)
        .then(res => {
          let newData = {
            isAuth: true,
            dataUser: res.data
          };

          return Object.assign(state, newData);
        });
    default:
      return state;
  }
};

export default myReducer;
