import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import "../styles/TransactionInfo.css";
import Nav from "../components/Nav";
import SidleBarAcc from "../components/SidleBarAcc";

export default function TransactionInfo() {
  const [detailTrans, setDetialTrans] = useState({});
  const [review, setReview] = useState("");

  const mapStateToProps = useSelector((state) => state.logIn);
  const CheckLoggedIn = useSelector((state) => state.CheckLoggedIn);

  let { id } = useParams();
  // Get detial transaction
  const fetchData = async () => {
    const response = await axios.get(
      "https://tc9y3.sse.codesandbox.io/trans/listtrans/" + id
    );
    setDetialTrans(response.data[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);
  // Handle Send Product
  const handleSendProduct = () => {
    const dataSendProduct = {
      id_user: mapStateToProps._id || CheckLoggedIn.dataUser_id,
      status: "sending",
      id_trans: detailTrans._id,
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/trans/sending", dataSendProduct)
      .then((res) => {
        fetchData();
      });
  };
  // handle Received Product
  const handleReceived = () => {
    const dataSendProduct = {
      id_user: mapStateToProps._id || CheckLoggedIn.dataUser._id,
      status: "received",
      id_trans: detailTrans._id,
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/trans/sending", dataSendProduct)
      .then((res) => {
        fetchData();
      });
  };
  // handle Change Rereive
  const handleChangeRereive = (event) => {
    const value = event.target.value;
    setReview(value);
  };
  // handle Submit Review
  const handleSubmitReview = (event) => {
    event.preventDefault();
    const reviewProduct = {
      id_user: mapStateToProps._id || CheckLoggedIn.dataUser._id,
      content: review,
      id_trans: detailTrans._id,
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/trans/review", reviewProduct)
      .then((res) => {
        fetchData();
        toast("Your review is sent !");
      });
  };
  return (
    <div className="container-infotran">
      <ToastContainer />
      <Nav />
      <div>
        <Row id="row-tran">
          <Col id="col-list-acc" span={6}>
            <SidleBarAcc />
          </Col>
          <Col id="col-list-trans" span={18}>
            <div className="full-incluce-bt">
              <div className="full-infotrans">
                <div className="container-infotrans">
                  <div className="info-avatar">
                    <div
                      style={{
                        backgroundImage: `url(${detailTrans.avatarUrl_want_exchange})`,
                      }}
                      id="img-avatar"
                    />
                    <span>{detailTrans.name_want_exchange} </span>
                    <div className="status-send">
                      <div className="status">
                        <i className="fas fa-truck icon-truck"></i>
                        <span>{detailTrans.status_user_want}</span>
                      </div>
                      <div className="moment">
                        <span>
                          <FontAwesomeIcon icon={faClock} />
                        </span>
                        <Moment fromNow>{detailTrans.createdAt}</Moment>
                      </div>
                    </div>
                  </div>
                  <div className="title-descripton">
                    <div className="address-title">
                      <h3>{detailTrans.title_product_with_exchange}</h3>
                    </div>
                    <div className="main-description">
                      <div className="des-contact">
                        <div className="des">
                          <span>
                            {detailTrans.description_product_with_exchange}
                          </span>
                          <h3>Address send</h3>
                          <div className="contact">
                            <div className="icon-full">
                              <div className="icon-usercheck">
                                <i className="fas fa-user-check"></i>
                              </div>
                              <span>{detailTrans.full_name_want}</span>
                            </div>
                            <div className="icon-full">
                              <div className="icon-phne">
                                <i className="fas fa-phone-alt"></i>
                              </div>
                              <span>{detailTrans.phone_user_want}</span>
                            </div>
                            <div className="address">
                              <div className="icon-address">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                              </div>
                              <span>{detailTrans.address_user_want}</span>
                            </div>
                            <div className="icon-full">
                              <div className="icon-opmail">
                                <i className="fas fa-envelope-open"></i>
                              </div>
                              <span> {detailTrans.email_want_exchange}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="image-tl">
                        <img
                          src={detailTrans.imagePostUrl_product_with_exchange}
                          id="img-title"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="container-infotrans">
                  <div className="info-avatar">
                    <img src={detailTrans.avatarUrl} id="img-avatar" />
                    <span>{detailTrans.name} </span>
                    <div className="status-send">
                      <div className="status">
                        <i className="fas fa-truck icon-truck"></i>
                        <span>{detailTrans.status_user}</span>
                      </div>
                      <div className="moment">
                        <span>
                          <FontAwesomeIcon icon={faClock} />
                        </span>
                        <Moment fromNow>{detailTrans.createdAt}</Moment>
                      </div>
                    </div>
                  </div>
                  <div className="title-descripton">
                    <div className="address-title">
                      <h3> {detailTrans.title_product}</h3>
                    </div>
                    <div className="main-description">
                      <div className="des-contact">
                        <div className="des">
                          <span>{detailTrans.description_product}</span>
                          <h3>Address send</h3>
                          <div className="contact">
                            <div className="icon-full">
                              <div className="icon-usercheck">
                                <i className="fas fa-user-check"></i>
                              </div>
                              <span>{detailTrans.full_name}</span>
                            </div>
                            <div className="icon-full">
                              <div className="icon-phne">
                                <i className="fas fa-phone-alt"></i>
                              </div>
                              <span>{detailTrans.phone_user}</span>
                            </div>
                            <div className="address">
                              <div className="icon-address">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                              </div>
                              <span>{detailTrans.address_user_want}</span>
                            </div>
                            <div className="icon-full">
                              <div className="icon-opmail">
                                <i className="fas fa-envelope-open"></i>
                              </div>
                              <span> {detailTrans.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="image-tl">
                        <img
                          src={detailTrans.imagePostUrl_product}
                          id="img-title"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tb-action">
                {detailTrans.status === "sending" ||
                detailTrans.status === "received" ? null : (
                  <button onClick={handleSendProduct}>Sent Product</button>
                )}
                <button onClick={handleReceived}>Received</button>
              </div>
            </div>

            <div className="form review">
              <form onSubmit={handleSubmitReview}>
                <textarea
                  rows="6"
                  cols="50"
                  name="description"
                  placeholder="Review you product you received"
                  value={review}
                  onChange={handleChangeRereive}
                />
                <button type="submit">Review</button>
              </form>
              <div className="content-review">
                <ul>
                  <li>Something</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
