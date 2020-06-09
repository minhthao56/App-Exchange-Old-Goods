import { combineReducers } from "redux";
import logIn from "./logIn";
import Exchange from "./exchange";
import SendAddress from "./sendAddress";
import UpdateUser from "./updateUser";

const myReducer = combineReducers({
  logIn: logIn,
  Exchange: Exchange,
  SendAddress: SendAddress,
  UpdateUser: UpdateUser,
});

export default myReducer;
