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

export default function Nav(props) {
  const mapStateToProps = useSelector((state) => state.logIn);
  // const UpdateUser = useSelector((state) => state.UpdateUser);
  const CheckLoggedIn = useSelector((state) => state.CheckLoggedIn);

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
            <div>
              {name ||
                CheckLoggedIn.dataUser.name ||
                mapStateToProps.dataUser.name}
            </div>
            <div>
              {" "}
              <img
                src={
                  avatarUrl ||
                  CheckLoggedIn.dataUser.avatarUrl ||
                  mapStateToProps.dataUser.avatarUrl
                }
                className="img-avatar"
              />{" "}
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
