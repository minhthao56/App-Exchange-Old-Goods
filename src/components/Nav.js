import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHome,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import ExchangeIcon from "../images/047-exchange.png";
import "../styles/Nav.css";

export default function Nav(props) {
  const mapStateToProps = useSelector((state) => state.logIn);
  const CheckLoggedIn = useSelector((state) => state.CheckLoggedIn);
  const UpdateUser = useSelector((state) => state.UpdateUser);
  const dispatch = useDispatch();

  let history = useHistory();

  const { avatarUrl, name } = props;
  //handle SignOut
  const handleSignOut = () => {
    dispatch({ type: "RESET" });
    localStorage.removeItem("token");
    history.push("/users/login");
    window.location.reload();
  };
  return (
    <nav className="container-nav">
      <div className="container-bar">
        <div className="LogoPage">
          <img src={ExchangeIcon} alt="" />
          <span>Second Life</span>
        </div>
        <div className="icon-nav">
          <Link className="icon-home" to="/">
            <FontAwesomeIcon icon={faHome} />
          </Link>
          <div className="icon-noti">
            <div className="dot-noti" />
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="icon-help">
            <FontAwesomeIcon icon={faQuestionCircle} />{" "}
          </div>
        </div>
        {CheckLoggedIn.dataUser.isAuth || mapStateToProps.isAuth ? (
          <div className="contaniner-signOut-profile">
            <div className="contaniner-profile-nav">
              <Link to="/profile">
                <div className="acc-nav">
                  <div
                    className="nav-avatar"
                    style={{
                      backgroundImage: `url(${
                        avatarUrl ||
                        CheckLoggedIn.dataUser.avatarUrl ||
                        mapStateToProps.avatarUrl
                      })`,
                    }}
                  ></div>
                  <div className="nav-name">
                    {name ||
                      UpdateUser.name ||
                      CheckLoggedIn.dataUser.name ||
                      mapStateToProps.name}
                  </div>
                </div>
              </Link>
            </div>
            <div className="container-signOut">
              <div className="sign-out" onClick={handleSignOut}>
                / Sign Out
              </div>
            </div>
          </div>
        ) : (
          <div className="container-list">
            <Link className="nav-link" to="/users/login">
              Log In
            </Link>
            <Link className="nav-link" to="/users/create">
              / Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
