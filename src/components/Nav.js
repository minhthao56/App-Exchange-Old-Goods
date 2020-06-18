import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ExchangeIcon from "../images/047-exchange.png";
import "../styles/Nav.css";
import NotiCenter from "../components/NotiCenter";
import Dawer from "../components/Dawer";

export default function Nav(props) {
  const [isShowNoti, setIsShowNoti] = useState(false);
  const [dataNoti, setDataNoti] = useState([]);

  // Redux
  const mapStateToProps = useSelector((state) => state.logIn);
  const CheckLoggedIn = useSelector((state) => state.CheckLoggedIn);
  const UpdateUser = useSelector((state) => state.UpdateUser);
  const dispatch = useDispatch();

  let history = useHistory();
  let location = useLocation();

  const { avatarUrl, name, fetchData } = props;

  // Fetch data Noti

  const fetchDataNoti = async () => {
    const res = await axios.post(
      "https://tc9y3.sse.codesandbox.io/notis/listnoti",
      { id_user: mapStateToProps._id || CheckLoggedIn.dataUser._id }
    );
    setDataNoti(res.data);
  };
  const pevDataNoti = useRef(dataNoti);

  if (pevDataNoti.current.length === 0 && dataNoti.length > 1) {
    pevDataNoti.current = dataNoti;
  }

  // Sort by Date
  const sortByDate = dataNoti.sort((a, b) => {
    let date1 = new Date(a.createdAt);
    let date2 = new Date(b.createdAt);
    return date2 - date1;
  });
  // filter status read noti
  const filterByRead = dataNoti.filter((a) => {
    return a.isRead === false;
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDataNoti();
    }, 5000);
    return () => clearTimeout(timer);
  });

  // Notificaiton
  if (pevDataNoti.current.length !== dataNoti.length) {
    const cutNotiFist = sortByDate[0];
    toast(
      cutNotiFist.name +
        " " +
        cutNotiFist.content_noti +
        " your " +
        cutNotiFist.title
    );
    if (
      cutNotiFist.content_noti === "Commented" ||
      cutNotiFist.content_noti === "Love ❤" ||
      cutNotiFist.content_noti === "Replied your comment in"
    ) {
      try {
        const a = async () => {
          return fetchData();
        };
        a();
      } catch (error) {
        console.log(error);
      }
    }
  }
  pevDataNoti.current = dataNoti;

  //handle SignOut
  const handleSignOut = () => {
    dispatch({ type: "RESET" });
    localStorage.removeItem("token");
    history.push("/users/login");
    window.location.reload();
  };
  // handle Noti
  const handleNoti = () => {
    setIsShowNoti(!isShowNoti);
  };

  return (
    <nav className="container-nav">
      <div className="container-bar">
        <Link to="/">
          <div className="LogoPage">
            <img src={ExchangeIcon} alt="" />
            <span>Second Life</span>
          </div>
        </Link>
        <ToastContainer />
        <div className="container-action-nav">
          <div className="icon-nav">
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
                <div className="icon-noti" onClick={handleNoti}>
                  <div className="dot-noti">{filterByRead.length}</div>
                  <i className="far fa-bell"></i>
                  <div className="container-noti-center">
                    {isShowNoti ? <NotiCenter dataNoti={sortByDate} /> : null}
                  </div>
                </div>
                <div className="container-link-out-proflie">
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
                  <div className="container-signOut">
                    <div className="sign-out" onClick={handleSignOut}>
                      / Sign Out
                    </div>
                  </div>
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
          <div className="bt-dawer-nav">
            <Dawer avatarUrl={avatarUrl} name={name} className="dawer-nav" />
          </div>
        </div>
      </div>
    </nav>
  );
}
