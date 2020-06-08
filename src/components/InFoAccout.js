import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";

import SidleBarAcc from "../components/SidleBarAcc";
import Nav from "../components/Nav";
import "../styles/InFoAccount.css";
import { ReactComponent as Account } from "../images/account.svg";

export default function InFoAccout() {
  const mapStateToProps = useSelector((state) => state.logIn);
  const userLoggedIn = mapStateToProps.dataUser;
  return (
    <div>
      <Nav />
      <div>
        <Row id="row-tran">
          <Col id="col-list-acc" span={6}>
            <SidleBarAcc />
          </Col>
          <Col id="col-list-trans" span={18}>
            <div className="container-change">
              <div className="form-update">
                <div className="your-account">
                  <h2>Your account</h2>
                  <span>Manage profile information and account security</span>
                </div>
                <form>
                  <div className="change-avatar">
                    <label>
                      <div
                        className="overplay"
                        style={{
                          backgroundImage: `url(${userLoggedIn.avatarUrl})`,
                        }}
                      >
                        <div className="over">
                          <i className="fas fa-camera"></i>
                        </div>
                      </div>
                      <input type="file" id="img-update" />
                    </label>
                  </div>
                  <div className="change-info">
                    <p>Name</p>
                    <p>Mail</p>
                    <p>Change Password</p>
                  </div>
                </form>
              </div>
              <div className="image-update">
                <Account style={{ width: 250, height: 250 }} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
