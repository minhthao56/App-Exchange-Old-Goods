import * as types from "../constants/actionType";
import axios from "axios";

const initialState = {};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_USER:
      axios
        .get("https://tc9y3.sse.codesandbox.io/users/user/" + action.idUser)
        .then((res) => {
          const newData = res.data;

          return Object.assign(state, newData);
        });

    default:
      return state;
  }
};

export default myReducer;
