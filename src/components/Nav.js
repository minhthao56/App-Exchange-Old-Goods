import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHome,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ExchangeIcon from "../images/047-exchange.png";
import "../styles/Nav.css";
import NotiCenter from "../components/NotiCenter";

export default function Nav(props) {
  const [isShowNoti, setIsShowNoti] = useState(false);
  const [dataNoti, setDataNoti] = useState([]);

  // Redux
  const mapStateToProps = useSelector((state) => state.logIn);
  const CheckLoggedIn = useSelector((state) => state.CheckLoggedIn);
  const UpdateUser = useSelector((state) => state.UpdateUser);
  const dispatch = useDispatch();

  let history = useHistory();

  const { avatarUrl, name, fetchData } = props;

  // Fetch data Noti

  const fetchDataNoti = async () => {
    const res = await axios.post(
      "https://tc9y3.sse.codesandbox.io/notis/listnoti",
      { id_user: mapStateToProps._id || CheckLoggedIn.dataUser._id }
    );
    setDataNoti(res.data);
  };
  console.log(dataNoti);
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

  useEffect(() => {
    setTimeout(() => {
      fetchDataNoti();
    }, 10000);
  });
  useEffect(() => {
    fetchDataNoti();
  }, []);
  // Notificaiton
  if (pevDataNoti.current.length !== dataNoti.length) {
    const cutNotiFist = sortByDate[0];
    // if (cutNotiFist.length === undefined) {
    //   return;
    // }
    toast(
      cutNotiFist.name +
        " " +
        cutNotiFist.content_noti +
        " your " +
        cutNotiFist.title
    );
    const a = async () => {
      return fetchData();
    };
    a();
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
        <div className="LogoPage">
          <img src={ExchangeIcon} alt="" />
          <span>Second Life</span>
          <ToastContainer />
        </div>
        <div className="icon-nav">
          <Link className="icon-home" to="/">
            <FontAwesomeIcon icon={faHome} />
          </Link>
          <div className="icon-noti">
            <div className="dot-noti" />
            <FontAwesomeIcon icon={faBell} onClick={handleNoti} />
            <div className="container-noti-center">
              {isShowNoti ? <NotiCenter dataNoti={sortByDate} /> : null}
            </div>
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
