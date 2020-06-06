import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function FormTrans(props) {
  const { register, handleSubmit } = useForm();
  const mapStateToProps = useSelector(state => state.logIn);
  const mapStateToPropsExchange = useSelector(state => state.Exchange);
  const dispatch = useDispatch();

  const onSubmit = data => {
    const id = mapStateToPropsExchange.id;
    const trans = {
      id_product_with_exchange: data.id_produce_with_exchange,
      id_user_want_exchange: mapStateToProps.dataUser._id,
      id_product: id.id_product,
      id_user_product: id.id_user_product,
      status: "spending"
    };

    axios
      .post("https://tc9y3.sse.codesandbox.io/trans/create", trans)
      .then(res => console.log(res.data));
  };
  const { postOfUser } = props;
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select name="id_produce_with_exchange" ref={register}>
          {postOfUser.map(post => {
            return <option value={post.id_post}>{post.title}</option>;
          })}
        </select>
        <button type="submit">Exchange</button>
      </form>
    </div>
  );
}
