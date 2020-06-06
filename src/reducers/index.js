import { combineReducers } from "redux";
import logIn from "./logIn";
import Exchange from "./exchange";

const myReducer = combineReducers({
  logIn: logIn,
  Exchange: Exchange
});

export default myReducer;
