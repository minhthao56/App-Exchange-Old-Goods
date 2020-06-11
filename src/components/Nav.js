import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHome,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ExchangeIcon from "../images/047-exchange.png";
import "../styles/Nav.css";

export default function Nav(props) {
  const mapStateToProps = useSelector((state) => state.logIn);
  const CheckLoggedIn = useSelector((state) => state.CheckLoggedIn);
  const UpdateUser = useSelector((state) => state.UpdateUser);

  const { avatarUrl, name } = props;

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
          <Link className="nav-link" to="/profile">
            <div className="acc-nav">
              <div
                className="nav-avatar"
                style={{
                  backgroundImage: `url(${
                    avatarUrl ||
                    UpdateUser.avatarUrl ||
                    CheckLoggedIn.dataUser.avatarUrl ||
                    mapStateToProps.dataUser.avatarUrl
                  })`,
                }}
              ></div>
              <div className="nav-name">
                {name ||
                  UpdateUser.name ||
                  CheckLoggedIn.dataUser.name ||
                  mapStateToProps.dataUser.name}
              </div>
            </div>
          </Link>
        ) : (
          <div className="container-list">
            <Link className="nav-link" to="/users/login">
              Login
            </Link>
            <Link className="nav-link" to="/users/create">
              Users
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
