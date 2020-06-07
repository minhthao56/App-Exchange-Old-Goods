import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

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
  //Hanlde send address
  const hanldeSendAddress = () => {
    dispatch({
      type: "SEND_ADDRESS",
      id: _id,
    });
  };
  return (
    <div>
      {status}
      <div className="container-tran">
        <span>name {nameExchange}</span>
        <img src={avatarUrlExchange} alt="" id="imgAvatar" />
        <span>Title {titleExchange}</span>
        <img src={imagePostUrlExchange} alt="" id="imgTitle" />
        <span>from:{addressExchange}</span>
      </div>
      <hr />
      <div className="container-tran">
        <span>name {name}</span>
        <img src={avatarUrl} alt="" id="imgAvatar" />
        <span>Title {title}</span>
        <img src={imagePostUrl} alt="" id="imgTitle" />
        <span>from:{address}</span>
      </div>
      <div>
        {id_user_product === userLoggedIn._id && statusS === "spending" ? (
          <div>
            <button className="bt-confirm" onClick={handleConfirm}>
              Confirm
            </button>
            <button className="bt">Reject</button>
          </div>
        ) : null}
        {statusS === "confirmed" ? (
          <button className="bt-confirm" onClick={hanldeSendAddress}>
            Send your address
          </button>
        ) : null}

        {statusS === "rejected" ? (
          <button className="bt-confirm">Delete</button>
        ) : null}
      </div>
      <Link to={"/transaction/info/" + _id}>
        <button>Detail</button>
      </Link>
    </div>
  );
}
