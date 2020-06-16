import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "../styles/ButtonBar.css";
export default function ButtonBar() {
  const mapStateToProps = useSelector((state) => state.logIn);
  const CheckLoggedIn = useSelector((state) => state.CheckLoggedIn);
  const [isShowBt, setIsShowBt] = useState(false);

  const handleShowButtonBar = () => {
    setIsShowBt(!isShowBt);
  };
  return (
    <div className="container-bt-bar">
      {isShowBt ? (
        <div className="list-icon">
          <Link
            to={
              mapStateToProps._id
                ? "/users/info/" + mapStateToProps._id
                : "/users/info/" + CheckLoggedIn.dataUser._id
            }
          >
            <div className="icon-user bt-bar-icon">
              <span id="span-your-acc-sildbar">Your account</span>
              <div className="wap-user">
                <i className="fas fa-user"></i>
              </div>
            </div>
          </Link>
          <Link to="/profile">
            <div className="icon-lists bt-bar-icon">
              <span id="span-list-tran-sildebar">Your List Transactions</span>
              <div className="warp-list">
                <i className="fas fa-list-ul"></i>
              </div>
            </div>
          </Link>
        </div>
      ) : null}

      <button onClick={handleShowButtonBar}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
}
