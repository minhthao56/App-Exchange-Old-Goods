import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "antd/dist/antd.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

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
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <PrivateRoute path="/users/info/:id" children={<InFoAccout />} />
          <PrivateRoute
            path="/transaction/info/:id"
            children={<TransactionInfo />}
          />
        </Switch>
      </div>
    </Router>
  );
}
function PrivateRoute({ isAuthenticated, children, ...rest }) {
  const mapStateToProps = useSelector((state) => state.logIn);
  const CheckLoggedIn = useSelector((state) => state.CheckLoggedIn);
  if (mapStateToProps.isAuth === undefined) {
    isAuthenticated = CheckLoggedIn.isAuth;
  } else {
    isAuthenticated = mapStateToProps.isAuth;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/users/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
