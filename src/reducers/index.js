import { combineReducers } from "redux";
import logIn from "./logIn";
import Exchange from "./exchange";
import SendAddress from "./sendAddress";

const myReducer = combineReducers({
  logIn: logIn,
  Exchange: Exchange,
  SendAddress: SendAddress,
});

export default myReducer;
