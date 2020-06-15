import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/FormTrans.css";

export default function FormTrans(props) {
  const { register, handleSubmit } = useForm();
  const mapStateToProps = useSelector((state) => state.logIn);
  const mapStateToPropsExchange = useSelector((state) => state.Exchange);
  const CheckLoggedIn = useSelector((state) => state.CheckLoggedIn);
  const dispatch = useDispatch();
  //Noit exchange
  const handleNoitExchange = async () => {
    const noti = {
      id_user_eff: mapStateToProps._id || CheckLoggedIn.dataUser._id,
      id_user_isEff: mapStateToPropsExchange.id.id_user_product,
      id_post: mapStateToPropsExchange.id.id_product,
      content_noti: "Want exchange a product in post",
    };
    const res = await axios.post(
      "https://tc9y3.sse.codesandbox.io/notis/exchange",
      noti
    );
    console.log(res.data);
  };

  // hanlde Cancel Exchange{
  const hanldeCancelExchange = () => {
    dispatch({
      type: "CANCEL_EXCHANGE",
    });
  };

  // Submit exchange
  const onSubmit = (data) => {
    const id = mapStateToPropsExchange.id;
    const trans = {
      id_product_with_exchange: data.id_produce_with_exchange,
      id_user_want_exchange: mapStateToProps._id || CheckLoggedIn.dataUser._id,
      id_product: id.id_product,
      id_user_product: id.id_user_product,
      status: "spending",
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/trans/create", trans)
      .then((res) => {
        toast("You send a request for " + id.name);
        handleNoitExchange();
        hanldeCancelExchange();
      });
  };

  const { postOfUser } = props;
  return (
    <div className="container-form-trans">
      <ToastContainer />
      <div className="main-exchange">
        <div className="container-header-ex">
          <div className="header-exchange">
            <i className="fas fa-sync-alt"></i>
            <span>Your Produces</span>
          </div>

          <i
            className="fas fa-times"
            id="icon-x"
            onClick={hanldeCancelExchange}
          ></i>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <select name="id_produce_with_exchange" ref={register}>
            {postOfUser.map((post, key) => {
              return (
                <option value={post.id_post} key={key} className="option">
                  {post.title}
                </option>
              );
            })}
          </select>
          <div className="action-exchange">
            <button className="bt-exchange" type="submit">
              Exchange
            </button>
            <button
              className="cancel-exchange"
              type="button"
              onClick={hanldeCancelExchange}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
