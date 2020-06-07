import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";

import "./styles.css";

import Home from "./components/Home";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import Profile from "./components/Profile";
import InFoAccout from "./components/InFoAccout";
import TransactionInfo from "./components/TransactionInfo";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users/login">
            <Login />
          </Route>
          <Route path="/users/create">
            <CreateUser />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/users/info">
            <InFoAccout />
          </Route>
          <Route path="/transaction/info/:id" children={<TransactionInfo />} />
        </Switch>
      </div>
    </Router>
  );
}
