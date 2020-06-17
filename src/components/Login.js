import React, { useState } from "react";
import axios from "axios";
import { Row, Col, Alert } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import "antd/dist/antd.css";
import "../styles/CreateUser.css";
import exchange from "../images/047-exchange.png";
import imagesLogin from "../images/login.png";
import "../styles/Login.css";
import ForgotPass from "../components/ForgotPass";

export default function User(props) {
  const [mesErr, setMesErr] = useState("");
  const [isErrLogin, setIsErrLogin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isShowForgotPass, setIsShowForgotPass] = useState(false);

  const dispatch = useDispatch();
  let history = useHistory();
  const { checkLoggedIn } = props;
  // Handle mail
  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setValueEmail(value);
  };
  // Hanlde password
  const handleChangePasword = (event) => {
    const value = event.target.value;
    setValuePassword(value);
  };

  //Handle check bock
  const handleChangeCheck = (event) => {
    const value = event.target.checked;
    setIsChecked(value);
  };

  // Handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      email: valueEmail,
      password: valuePassword,
      isChecked: isChecked,
    };

    axios
      .post("https://tc9y3.sse.codesandbox.io/users/login", user)
      .then((res) => {
        setIsAuth(!isAuth);
        setValueEmail("");
        setValuePassword("");
        if (res.data.token) {
          localStorage.setItem("token", res.data.token.toString());
        }
        console.log(res.data);
        dispatch({ type: "LOG_IN", dataUser: res.data });

        history.push("/");
        return checkLoggedIn();
      })
      .catch((err) => {
        if (err.response === undefined) {
          console.log(err);
        }
        if (err.response.status === 401) {
          setIsErrLogin(true);
          setMesErr(err.response.data.msg);
        }
      });
  };
  // handle Close Forgot Pass
  const handleCloseForgotPass = () => {
    setIsShowForgotPass(!isShowForgotPass);
  };
  // handle Show Forgot Pass
  const handleShowForgotPass = () => {
    setIsShowForgotPass(!isShowForgotPass);
  };
  return (
    <div className="container">
      <Row>
        <Col span={12}>
          <div className="contaiter-form">
            <div className="second-life">
              <img src={exchange} alt="" />
              <h1>Second Life</h1>
            </div>
            {isErrLogin === true ? (
              <Alert
                style={{ marginBottom: 10 }}
                message={mesErr}
                type="error"
                showIcon
              />
            ) : null}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={valueEmail}
                  placeholder="Email"
                  onChange={handleChangeEmail}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={valuePassword}
                  placeholder="Password"
                  onChange={handleChangePasword}
                  required
                />
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  name="isChecked"
                  onChange={handleChangeCheck}
                  id="checkbox"
                />
                <span>Remmeber Me</span>
                <span
                  onClick={handleShowForgotPass}
                  className="forgot-pass-login"
                >
                  I Forgot My Password
                </span>
              </div>

              <button type="submit">Login</button>
            </form>
            <p className="policy">
              By signing up, you agree to our{" "}
              <b>Terms , Data Policy and Cookies Policy .</b>
            </p>
          </div>
          <div className="have-account">
            <span>
              Haven't an account? <Link to="/users/create">Create User</Link>
            </span>
            {isShowForgotPass ? (
              <ForgotPass handleCloseForgotPass={handleCloseForgotPass} />
            ) : null}
          </div>
        </Col>
        <Col span={12} className=" containerImagesCreateUser">
          <div className="imagesCreateUser">
            <img src={imagesLogin} alt="" />
          </div>
        </Col>
      </Row>
    </div>
  );
}
