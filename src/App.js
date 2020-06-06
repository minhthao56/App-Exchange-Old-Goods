import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./styles.css";

import Home from "./components/Home";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Transaction from "./components/Transaction";
import InfoTrans from "./components/InFoTrans";
import InFoAccout from "./components/InFoAccout";

export default function App() {
  return (
    <Router>
      <div>
        <InfoTrans />
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
          {/* <Route path="/profile">
            <Profile />
          </Route> */}
          {/* <Route path="/orther">
        <Orther />
      </Route> */}
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/trans">
            <Transaction />
          </Route>
          <Route path="/trans/info/:id" children={<InfoTrans />} />
          <Route path="/users/info">
            <InFoAccout />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
