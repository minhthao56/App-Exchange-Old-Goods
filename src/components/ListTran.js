import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faMapMarkerAlt,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/ListTrans.css";
export default function ListTran(props) {
  const {
    nameExchange,
    avatarUrlExchange,
    titleExchange,
    imagePostUrlExchange,
    addressExchange,
    name,
    avatarUrl,
    title,
    imagePostUrl,
    address,
    status,
    id_user_product,
    _id,
    createdAt,
  } = props;
  const mapStateToProps = useSelector((state) => state.logIn);
  const userLoggedIn = mapStateToProps.dataUser;
  const [statusS, setStatusS] = useState(status);
  const dispatch = useDispatch();

  // Handle update confirm
  const handleConfirm = () => {
    const dataUpdate = {
      _id: _id,
      status: "confirmed",
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/trans/update", dataUpdate)
      .then((res) => {
        console.log(res.data);
        setStatusS(dataUpdate.status);
      });
  };
  // Hanlde update reject
  const hanldeReject = () => {
    const dataUpdate = {
      _id: _id,
      status: "rejected",
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/trans/update", dataUpdate)
      .then((res) => {
        console.log(res.data);
        setStatusS(dataUpdate.status);
      });
  };
  //Hanlde send address
  const hanldeSendAddress = () => {
    dispatch({
      type: "SEND_ADDRESS",
      id: _id,
    });
  };
  return (
    <div className="transaction-status">
      <div className="tran-status">
        <span className="your-transaction">Your Transaction</span>
        <div className="moment-status">
          <div className="status">
            <i className="fas fa-truck icon-truck"></i>
            <span>{status}</span>
          </div>
          <div className="moment">
            <span>
              <FontAwesomeIcon icon={faClock} />
            </span>
            <Moment fromNow>{createdAt}</Moment>
          </div>
        </div>
      </div>
      <div className="container-full">
        <div className="transaction">
          <div className="container-tran">
            <div className="name-tran">
              <img src={avatarUrlExchange} alt="" id="imgAvatar" />
              <span> {nameExchange}</span>
            </div>
            <div className="product-tran">
              <h3> {titleExchange}</h3>
              <div className="address">
                <div className="icon-address">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <span>{address}</span>
              </div>
              <div className="imgTitle">
                <img src={imagePostUrlExchange} alt="" />
              </div>
            </div>
          </div>
          <div className="container-tran">
            <div className="name-tran">
              <img src={avatarUrl} alt="" id="imgAvatar" />
              <span> {name}</span>
            </div>
            <div className="product-tran">
              <h3>{title}</h3>
              <div className="address">
                <div className="icon-address">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <span>{address}</span>
              </div>
              <div className="imgTitle">
                <img src={imagePostUrl} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="tb-action">
          <div className="bt-trans">
            {id_user_product === userLoggedIn._id && statusS === "spending" ? (
              <div>
                <button onClick={handleConfirm}>Confirm</button>
                <button id="bt-recject" onClick={hanldeReject}>
                  Reject
                </button>
              </div>
            ) : null}
            {statusS === "confirmed" ? (
              <button onClick={hanldeSendAddress}>Send your address</button>
            ) : null}

            {statusS === "rejected" ? (
              <button id="bt-del">Delete</button>
            ) : null}
          </div>
          <div className="detail">
            <Link to={"/transaction/info/" + _id}>
              <button className="bt-detail">Detail</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
