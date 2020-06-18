import { combineReducers } from "redux";
import logIn from "./logIn";
import Exchange from "./exchange";
import SendAddress from "./sendAddress";
import UpdateUser from "./updateUser";
import CheckLoggedIn from "./chekedLoggedIn";

const myReducer = combineReducers({
  logIn: logIn,
  Exchange: Exchange,
  SendAddress: SendAddress,
  UpdateUser: UpdateUser,
  CheckLoggedIn: CheckLoggedIn,
});

export default myReducer;
// export default myReducer;
