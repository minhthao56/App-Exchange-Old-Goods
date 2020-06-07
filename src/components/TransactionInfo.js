import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/TransactionInfo.css";

export default function TransactionInfo() {
  const [detailTrans, setDetialTrans] = useState({});
  const [review, setReview] = useState("");
  const mapStateToProps = useSelector((state) => state.logIn);
  const userLoggedIn = mapStateToProps.dataUser;
  let { id } = useParams();
  // Get detial transaction
  const fetchData = async () => {
    const response = await axios.get(
      "https://tc9y3.sse.codesandbox.io/trans/listtrans/" + id
    );
    setDetialTrans(response.data[0]);
  };
  console.log(detailTrans);

  useEffect(() => {
    fetchData(detailTrans);
  }, [id]);
  // Handle Send Product
  const handleSendProduct = () => {
    const dataSendProduct = {
      id_user: userLoggedIn._id,
      status: "sending",
      id_trans: detailTrans._id,
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/trans/sending", dataSendProduct)
      .then((res) => {
        console.log(res.data);
      });
  };
  // handle Received Product
  const handleReceived = () => {
    const dataSendProduct = {
      id_user: userLoggedIn._id,
      status: "received",
      id_trans: detailTrans._id,
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/trans/sending", dataSendProduct)
      .then((res) => {
        console.log(res.data);
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
      id_user: userLoggedIn._id,
      content: review,
      id_trans: detailTrans._id,
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/trans/review", reviewProduct)
      .then((res) => {
        console.log(res.data);
        toast("Your review is sent !");
      });
  };
  return (
    <div>
      <ToastContainer />
      <div>
        <span>Name:{detailTrans.name_want_exchange} </span>
        <img src={detailTrans.avatarUrl_want_exchange} id="img-avatar" />
        <span>mail: {detailTrans.email_want_exchange}</span>
        <span>Tiltle: {detailTrans.title_product_with_exchange}</span>
        <img
          src={detailTrans.imagePostUrl_product_with_exchange}
          id="img-title"
        />
        <span>Address: {detailTrans.address_product_with_exchange}</span>
        <span>{detailTrans.description_product_with_exchange}</span>
      </div>
      <hr />
      <div>
        <span>Name:{detailTrans.name} </span>
        <img src={detailTrans.avatarUrl} id="img-avatar" />
        <span>mail: {detailTrans.email}</span>
        <span>Tiltle: {detailTrans.title_product}</span>
        <img src={detailTrans.imagePostUrl_product} id="img-title" />
        <span>Address: {detailTrans.address_product}</span>
        <span>{detailTrans.description_product}</span>
      </div>
      <div>
        {detailTrans.status === "sending" ||
        detailTrans.status === "received" ? null : (
          <button onClick={handleSendProduct}>Sent Product</button>
        )}

        <button onClick={handleReceived}>Received</button>
      </div>
      <div>
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
    </div>
  );
}
