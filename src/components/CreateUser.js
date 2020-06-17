import React, { useState } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

import "antd/dist/antd.css";
import "../styles/CreateUser.css";
import exchange from "../images/047-exchange.png";
import imagesCreateUser from "../images/create-user.png";

export default function User() {
  const [valueName, setValueName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [isErrEmail, setIsErrEmail] = useState(false);
  const [isErrName, setIsErrName] = useState(false);
  const [msgErr, setMsgErr] = useState("");

  const validationEmail = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
    "g"
  );
  const validationName = new RegExp(
    /[a-z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/,
    "g"
  );

  const handleChangeName = (event) => {
    const value = event.target.value;

    setValueName(value);
  };
  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setValueEmail(value);
  };
  const handleChangePasword = (event) => {
    const value = event.target.value;
    setValuePassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validationEmail.test(valueEmail) === false) {
      setIsErrEmail(true);
      setMsgErr("Email Invaid");
    } else if (validationName.test(valueName) === false) {
      setIsErrName(true);
      setMsgErr("Name Inclue number and letter");
    } else {
      const user = {
        name: valueName,
        email: valueEmail,
        password: valuePassword,
      };
      axios
        .post("https://tc9y3.sse.codesandbox.io/users/create", user)
        .then((res) => {
          setValueName("");
          setValueEmail("");
          setValuePassword("");
        });
    }
  };
  return (
    <div className="container">
      <Row>
        <Col span={12} className=" containerImagesCreateUser">
          <div className="imagesCreateUser">
            <img src={imagesCreateUser} />
          </div>
        </Col>
        <Col span={12}>
          <div className="contaiter-form">
            <div className="second-life">
              <img src={exchange} />
              <h1>Second Life</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                {isErrName ? <span className="msg-err">*{msgErr}</span> : null}
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={valueName}
                  onChange={handleChangeName}
                  required
                />
              </div>
              <div className="form-group">
                {isErrEmail ? <span className="msg-err">*{msgErr}</span> : null}
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
              <button type="submit">Sign up</button>
            </form>
            <p className="policy">
              By signing up, you agree to our{" "}
              <b>Terms , Data Policy and Cookies Policy .</b>
            </p>
          </div>
          <div className="have-account">
            <span>
              Have an account? <Link to="/users/login">Log in</Link>
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
