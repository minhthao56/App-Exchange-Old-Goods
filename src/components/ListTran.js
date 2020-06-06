import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

    id_user_product,
    _id,
  } = props;
  const mapStateToProps = useSelector((state) => state.logIn);
  const userLoggedIn = mapStateToProps.dataUser;

  const status = "rejected";
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
        {id_user_product === userLoggedIn._id && status === "spending" ? (
          <div>
            <button className="bt-confirm">Confirm</button>
            <button className="bt">Reject</button>
          </div>
        ) : null}
        {status === "confirmed" ? (
          <button className="bt-confirm">Send your product</button>
        ) : null}

        {status === "rejected" ? (
          <button className="bt-confirm">Delete</button>
        ) : null}
      </div>
      <Link to={"/transaction/info/" + _id}>
        <button>Detail</button>
      </Link>
    </div>
  );
}
