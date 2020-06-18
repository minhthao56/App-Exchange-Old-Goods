import React, { useState } from "react";
import axios from "axios";

import "../styles/ForgotPass.css";

export default function ForgotPass(props) {
  const [email, setEmail] = useState();
  const { handleCloseForgotPass } = props;

  // handle Value Email
  const handleValueEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  // handle Submit Fotgot Pass
  const handleSubmitFotgotPass = async (event) => {
    event.preventDefault();
    const forgotEmail = { email: email };
    const res = await axios.post(
      "https://tc9y3.sse.codesandbox.io/users/forgot",
      forgotEmail
    );
    console.log(res.data);
    setEmail("");
  };
  return (
    <div className="container-form-address">
      <div className="main-form-address " id="main-from-forgot">
        <div className="container-header-address">
          <div className="header-address">
            <i className="fas fa-question"></i>
            <span>Forgot Password</span>
          </div>
          <i
            className="fas fa-times"
            id="icon-x"
            onClick={() => {
              return handleCloseForgotPass();
            }}
          ></i>
        </div>
        <div className="form-send-address">
          <form onSubmit={handleSubmitFotgotPass}>
            <input
              type="email"
              placeholder="Your email"
              onChange={handleValueEmail}
              value={email}
              required
              className="input-fogot-pass"
            />
            <div className="action-forgot-pass">
              <button className="bt-send-mail" type="submit">
                Send
              </button>
              <button
                id="cancel-send-mail"
                type="button"
                onClick={() => {
                  return handleCloseForgotPass();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
