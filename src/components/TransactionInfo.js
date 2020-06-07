import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import "../styles/TransactionInfo.css";

export default function TransactionInfo() {
  const [detailTrans, setDetialTrans] = useState({});
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

  return (
    <div>
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
        <button onClick={handleSendProduct}>Sent Product</button>
        <button>Received</button>
      </div>
      <div>
        <textarea
          rows="6"
          cols="50"
          name="description"
          placeholder="Review you product you received"
        />
      </div>
    </div>
  );
}
