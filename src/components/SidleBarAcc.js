import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "../styles/SidleBarAcc.css";
import { ReactComponent as ProFileImg } from "../images/profile.svg";

export default function SidleBarAcc() {
  const mapStateToProps = useSelector((state) => state.logIn);
  const userLoggedIn = mapStateToProps.dataUser;
  return (
    <div className="container-silde-bar">
      <div className="acc-sidle">
        <img src={userLoggedIn.avatarUrl} />
        <div className="edit-acc">
          <span className="name-acc">{userLoggedIn.name}</span>
          <Link to="/users/info">
            <span className="icon-edit">
              <i class="fas fa-pen"></i>
              <span>Edit your account</span>
            </span>
          </Link>
        </div>
      </div>
      <div className="list-icon">
        <Link to="/users/info">
          <div className="icon-user">
            <div className="wap-user">
              <i className="fas fa-user"></i>
            </div>
            <span>Your account</span>
          </div>
        </Link>
        <Link to="/profile">
          <div className="icon-lists">
            <div className="warp-list">
              <i className="fas fa-list-ul"></i>
            </div>
            <span>Your List Transactions</span>
          </div>
        </Link>
      </div>
      <div className="profile-img">
        <img src={<ProFileImg />} />
      </div>
    </div>
  );
}
