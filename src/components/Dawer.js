import React, { useState } from "react";
import { Drawer } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "../styles/Dawer.css";
import ImageEchange from "../images/047-exchange.png";

export default function Dawer(props) {
  const [visible, setVisible] = useState(false);

  const mapStateToProps = useSelector((state) => state.logIn);
  const CheckLoggedIn = useSelector((state) => state.CheckLoggedIn);
  const UpdateUser = useSelector((state) => state.UpdateUser);
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();
  const { avatarUrl, name } = props;
  // Show dawer
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  //handle SignOut
  const handleSignOut = () => {
    dispatch({ type: "RESET" });
    localStorage.removeItem("token");
    history.push("/users/login");
    window.location.reload();
  };
  return (
    <div>
      <button type="button" onClick={showDrawer} className="bt-bar">
        <i className="fas fa-bars"></i>
      </button>
      <Drawer
        title={
          <div className="dawer-header">
            <img src={ImageEchange} />
            Second Life
          </div>
        }
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <div className="container-dawer">
          <div className="icon-nav dawer-link">
            <Link
              className={
                location.pathname === "/" ? "icon-home location" : "icon-home"
              }
              to="/"
            >
              <span>Home</span>
            </Link>
            <Link
              className={
                location.pathname === "/profile"
                  ? "icon-home location"
                  : "icon-home"
              }
              to="/profile"
            >
              <span>Transactions</span>
            </Link>
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
      </Drawer>
    </div>
  );
}
