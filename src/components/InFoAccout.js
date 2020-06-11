import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import SidleBarAcc from "../components/SidleBarAcc";
import Nav from "../components/Nav";
import "../styles/InFoAccount.css";
import { ReactComponent as Account } from "../images/account.svg";

export default function InFoAccout() {
  const [file, setFile] = useState(null);
  const [dataUserFetch, setDataUserFetch] = useState({});

  const mapStateToProps = useSelector((state) => state.logIn);
  const CheckLoggedIn = useSelector((state) => state.CheckLoggedIn);
  const userLoggedIn = mapStateToProps.dataUser;
  // const dispatch = useDispatch();
  //Fetch data user detail
  const fetchData = async () => {
    const response = await axios.get(
      "https://tc9y3.sse.codesandbox.io/users/user/" + userLoggedIn._id ||
        CheckLoggedIn.dataUser._id
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
    fd.append("_id", userLoggedIn._id);
    axios
      .post("https://tc9y3.sse.codesandbox.io/users/update", fd)
      .then((res) => {
        console.log(res.data);
        fetchData();
        // dispatch({
        //   type: "UPDATE_USER",
        //   idUser: userLoggedIn._id,
        // });
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Nav avatarUrl={dataUserFetch.avatarUrl} name={dataUserFetch.name} />
      <div>
        <Row id="row-tran">
          <Col id="col-list-acc" span={6}>
            <SidleBarAcc
              avatarUrl={dataUserFetch.avatarUrl}
              name={dataUserFetch.name}
            />
          </Col>
          <Col id="col-list-trans" span={18}>
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
                    <p>Name</p>
                    <p>Mail</p>
                    <p>Change Password</p>
                  </div>
                  <button>Save</button>
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
