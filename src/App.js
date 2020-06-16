import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import axios from "axios";
import { useDispatch } from "react-redux";

import "./styles.css";

import Home from "./components/Home";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import Profile from "./components/Profile";
import InFoAccout from "./components/InFoAccout";
import TransactionInfo from "./components/TransactionInfo";

export default function App() {
  const dispatch = useDispatch();
  //localStoage
  const token = localStorage.getItem("token");
  // check login
  const checkLoggedIn = () => {
    axios
      .post("https://tc9y3.sse.codesandbox.io/users/checklogin/", { token })
      .then((res) => {
        console.log("fetch data");
        dispatch({
          type: "LOGGED_IN",
          dataUser: res.data,
        });
      });
  };
  useEffect(() => {
    checkLoggedIn();
  });
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users/login">
            <Login checkLoggedIn={checkLoggedIn} />
          </Route>
          <Route path="/users/create">
            <CreateUser />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/users/info/:id" children={<InFoAccout />} />
          <Route path="/transaction/info/:id" children={<TransactionInfo />} />
        </Switch>
      </div>
    </Router>
  );
}
