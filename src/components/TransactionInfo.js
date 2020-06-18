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
import { Rate } from "antd";
import ShowMoreText from "react-show-more-text";

import "../styles/TransactionInfo.css";
import Nav from "../components/Nav";
import SidleBarAcc from "../components/SidleBarAcc";
import ButtonBar from "../components/ButtonBar";

export default function TransactionInfo() {
  const [detailTrans, setDetialTrans] = useState({});
  const [review, setReview] = useState("");
  const [rate, setRate] = useState(5);

  const mapStateToProps = useSelector((state) => state.logIn);
  const CheckLoggedIn = useSelector((state) => state.CheckLoggedIn);
  const reviews = detailTrans.review;
  console.log(reviews);

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
  // Handle Noti Confirm send produc delivery
  const handleNotiSendProduct = async () => {
    const noti = {
      content_noti: "Confirmed delivery 😍 product",
      id_post: detailTrans.id_product,
      id_user_isEff: detailTrans.id_user_want_exchange,
      id_user_eff: detailTrans.id_user_product,
      id_user_logged: mapStateToProps._id || CheckLoggedIn.dataUser._id,
      id_post_want: detailTrans.id_product_with_exchange,
      id_tran: id,
    };
    try {
      await axios.post("https://tc9y3.sse.codesandbox.io/notis/delivery", noti);
    } catch (error) {
      console.log(error);
    }
  };
  // Handle Noti Confirm send produc delivery
  const handleNotiConfirmedRecive = async () => {
    const noti = {
      content_noti: "Confirmed receive 👌 product",
      id_post: detailTrans.id_product,
      id_user_isEff: detailTrans.id_user_want_exchange,
      id_user_eff: detailTrans.id_user_product,
      id_user_logged: mapStateToProps._id || CheckLoggedIn.dataUser._id,
      id_post_want: detailTrans.id_product_with_exchange,
      id_tran: id,
    };
    try {
      await axios.post("https://tc9y3.sse.codesandbox.io/notis/receive", noti);
    } catch (error) {
      console.log(error);
    }
  };
  // Handle Send Product
  const handleSendProduct = () => {
    const dataSendProduct = {
      id_user: mapStateToProps._id || CheckLoggedIn.dataUser._id,
      status: "sending",
      id_trans: detailTrans._id,
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/trans/sending", dataSendProduct)
      .then((res) => {
        fetchData();
        handleNotiSendProduct();
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
        handleNotiConfirmedRecive();
      });
  };
  // handle Change Rereive
  const handleChangeReview = (event) => {
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
      createdAt: new Date(),
      rate: rate,
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/trans/review", reviewProduct)
      .then((res) => {
        fetchData();
        setReview("");
        toast("Your review is sent !");
      });
  };
  // handle Rate
  const handleRate = (value) => {
    setRate(value);
  };
  return (
    <div className="container-infotran">
      <ToastContainer />
      <Nav />
      <div>
        <Row id="row-tran">
          <Col id="col-list-acc" xs={0} sm={0} md={0} xl={6} lg={6}>
            <SidleBarAcc />
          </Col>
          <Col id="col-list-trans" xs={24} sm={24} md={24} xl={18} lg={18}>
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
                          <ShowMoreText
                            lines={4}
                            more="Show more"
                            less="Show less"
                            anchorClass=""
                            expanded={false}
                            width={280}
                          >
                            {detailTrans.description_product_with_exchange}
                          </ShowMoreText>
                          {/* <span>
                            {detailTrans.description_product_with_exchange}
                          </span> */}
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
                          <ShowMoreText
                            lines={4}
                            more="Show more"
                            less="Show less"
                            anchorClass=""
                            expanded={false}
                            width={280}
                          >
                            {detailTrans.description_product}
                          </ShowMoreText>
                          {/* <span>{detailTrans.description_product}</span> */}
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
                              <span>{detailTrans.address_user}</span>
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
                {detailTrans.status === "spending" ||
                detailTrans.status === "recject" ||
                detailTrans.status ===
                  "confirmed" ? null : detailTrans.status === "sending" ||
                  detailTrans.status === "received" ? (
                  <button onClick={handleReceived}>Confirm Received</button>
                ) : (
                  <button onClick={handleSendProduct}> Confirm delivery</button>
                )}
              </div>
            </div>
            {/* Review */}
            <div className="container-form-review">
              <div className="header-review">
                <i class="fas fa-edit"></i>
                <span>Review product</span>
              </div>
              <div className="form-content-review">
                <form onSubmit={handleSubmitReview} className="form-review">
                  <div className="rate-review">
                    <span className="rate">Rate</span>
                    <Rate
                      allowHalf
                      defaultValue={2.5}
                      value={rate}
                      onChange={handleRate}
                    />
                  </div>
                  <textarea
                    rows="6"
                    cols="50"
                    name="description"
                    placeholder="Review product"
                    value={review}
                    onChange={handleChangeReview}
                  />
                  <button type="submit">Review</button>
                </form>
                <div className="content-review">
                  {reviews
                    ? reviews.map((rev) => {
                        return (
                          <div className="context-review">
                            <div className="avatar-name-review">
                              <div
                                className="avatar-review"
                                style={{
                                  backgroundImage: `url(${rev.avatarUrl})`,
                                }}
                              ></div>
                              <span>{rev.name}</span>
                            </div>
                            <div className="moment">
                              <span>
                                <FontAwesomeIcon icon={faClock} />
                              </span>
                              <Moment fromNow>{rev.createdAt}</Moment>
                            </div>
                            <span>{rev.content}</span>
                            <div className="content-rate">
                              <Rate
                                allowHalf
                                disabled
                                defaultValue={rev.rate}
                                className="rate-review"
                              />
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
            <ButtonBar />
          </Col>
        </Row>
      </div>
    </div>
  );
}
