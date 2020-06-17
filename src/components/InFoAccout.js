import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

import SidleBarAcc from "../components/SidleBarAcc";
import Nav from "../components/Nav";
import "../styles/InFoAccount.css";
import { ReactComponent as Account } from "../images/account.svg";
import ButtonBar from "../components/ButtonBar";

export default function InFoAccout() {
  const [file, setFile] = useState(null);
  const [dataUserFetch, setDataUserFetch] = useState({});
  const dispatch = useDispatch();
  const [isShowName, setIsShowName] = useState(false);
  const [isShowEmail, setIsShowEmail] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);

  //Router
  let { id } = useParams();
  //Fetch datar user detail
  const fetchData = async () => {
    dispatch({
      type: "UPDATE_USER",
      idUser: id,
    });
    const response = await axios.get(
      "https://tc9y3.sse.codesandbox.io/users/user/" + id
    );
    setDataUserFetch(response.data);
  };
  //Handle file
  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };
  // Handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("file", file);
    fd.append("_id", id);
    axios
      .post("https://tc9y3.sse.codesandbox.io/users/update", fd)
      .then((res) => {
        console.log(res.data);
        fetchData();
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  //handle show Chang InFo
  const handleShowChangName = () => {
    setIsShowName(!isShowName);
  };
  const handleShowChangEmail = () => {
    setIsShowEmail(!isShowEmail);
  };
  const handleShowChangPass = () => {
    setIsShowPass(!isShowPass);
  };
  return (
    <div>
      <Nav avatarUrl={dataUserFetch.avatarUrl} name={dataUserFetch.name} />
      <div>
        <Row id="row-tran">
          <Col id="col-list-acc" xs={0} sm={0} md={0} xl={6} lg={6}>
            <SidleBarAcc
              avatarUrl={dataUserFetch.avatarUrl}
              name={dataUserFetch.name}
            />
          </Col>
          <Col id="col-list-trans" xs={24} sm={24} md={24} xl={18} lg={18}>
            <div className="container-change">
              <div className="form-update">
                <div className="your-account">
                  <h2>Your account</h2>
                  <span>Manage profile information and account security</span>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="change-avatar">
                    <label>
                      <div
                        className="overplay"
                        style={{
                          backgroundImage: `url(${dataUserFetch.avatarUrl})`,
                        }}
                      >
                        <div className="over">
                          <i className="fas fa-camera"></i>
                        </div>
                      </div>
                      <input
                        type="file"
                        id="img-update"
                        onChange={handleFile}
                      />
                    </label>
                  </div>
                  <div className="change-info">
                    <div className="change-name">
                      <div className="icon-name-change">
                        <span>
                          <i className="far fa-user"></i>
                        </span>
                        <span>{dataUserFetch.name}</span>{" "}
                        <button onClick={handleShowChangName}>Change</button>
                      </div>
                      {isShowName ? <input type="text" /> : null}
                    </div>
                    <div className="change-mail">
                      <div className="icon-mail-change">
                        <span>
                          <i className="far fa-envelope-open"></i>
                        </span>
                        <span>{dataUserFetch.email}</span>
                        <button onClick={handleShowChangEmail}>Change</button>
                      </div>
                      {isShowEmail ? <input type="mail" /> : null}
                    </div>
                    <div className="change-pass">
                      <div className="span-change-pass">
                        <span>
                          <i className="fas fa-lock-open"></i>Change Password
                        </span>
                        <button onClick={handleShowChangPass}>Change</button>
                      </div>
                      {isShowPass ? <input type="password" /> : null}
                    </div>
                  </div>
                  <button>Save</button>
                </form>
              </div>
              <div className="image-update">
                <Account style={{ width: 250, height: 250 }} />
              </div>
            </div>
            <ButtonBar />
          </Col>
        </Row>
      </div>
    </div>
  );
}
