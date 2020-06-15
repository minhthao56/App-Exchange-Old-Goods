import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/Profile.css";
import ListTran from "../components/ListTran";
import Nav from "../components/Nav";
import SidleBarAcc from "../components/SidleBarAcc";

export default function Porfile() {
  const [dataTran, setDataTran] = useState([]);
  const { register, handleSubmit } = useForm();

  const mapStateToProps = useSelector((state) => state.logIn);
  const mapStateToPropsSendAddress = useSelector((state) => state.SendAddress);
  const CheckLoggedIn = useSelector((state) => state.CheckLoggedIn);
  const dispatch = useDispatch();
  // Fetch data transactions
  const fetchDataTran = async () => {
    const response = await axios.get(
      "https://tc9y3.sse.codesandbox.io/trans/listtrans"
    );
    setDataTran(response.data);
  };
  useEffect(() => {
    fetchDataTran();
  }, []);

  //Handler filter tran relative to user loggin
  const filterDataTran = dataTran.filter(function (dataFilter) {
    if (
      dataFilter.id_user_product === CheckLoggedIn.dataUser._id ||
      dataFilter.id_user_want_exchange === CheckLoggedIn.dataUser._id
    ) {
      return true;
    } else if (
      dataFilter.id_user_product === mapStateToProps._id ||
      dataFilter.id_user_want_exchange === mapStateToProps._id
    ) {
      return true;
    } else {
      return false;
    }
  });
  // handle Cancel Send Address
  const handleCancelSendAddress = () => {
    dispatch({
      type: "CANCEL_SEND_ADDRESS",
    });
  };
  //Handle noti address detail and phone
  const handleNotiSendAddress = async () => {
    const noti = {
      id_post: mapStateToPropsSendAddress.id.id_post,
      id_user_isEff: mapStateToPropsSendAddress.id.id_user_isEff,
      id_user_eff: mapStateToPropsSendAddress.id.id_user_eff,
      content_noti: "Sent address to recive product",
      id_user_logged: mapStateToProps._id || CheckLoggedIn.dataUser._id,
    };
    const res = await axios.post(
      "https://tc9y3.sse.codesandbox.io/notis/address",
      noti
    );
    console.log(res.data);
  };
  // Handle submit address detail and phone
  const onSubmit = (data) => {
    const addressAndPhone = {
      id_user: mapStateToProps._id || CheckLoggedIn.dataUser._id,
      id_trans: mapStateToPropsSendAddress.id._id,
      addressDetail: data.addressDetail,
      phone: data.phone,
      fullName: data.fullName,
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/trans/address", addressAndPhone)
      .then((res) => {
        console.log(res.data);
        fetchDataTran();
        toast.success("You sent address to recive product");
        handleNotiSendAddress();
        handleCancelSendAddress();
      });
  };

  return (
    <div>
      <Nav fetchDataTran={fetchDataTran} />
      <ToastContainer />
      <div className="container-frofile">
        <Row id="row-profile">
          <Col id="col-list-acc" span={6}>
            <SidleBarAcc />
          </Col>
          <Col id="col-list-trans" span={18}>
            {mapStateToPropsSendAddress.isShowSendAddress ? (
              <div className="container-form-address">
                <div className="main-form-address">
                  <div className="container-header-address">
                    <div className="header-address">
                      <i className="fas fa-address-card"></i>
                      <span>Send your address</span>
                    </div>

                    <i
                      className="fas fa-times"
                      id="icon-x"
                      onClick={handleCancelSendAddress}
                    ></i>
                  </div>
                  <div className="form-send-address">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="input-address">
                        <input
                          name="fullName"
                          type="text"
                          placeholder="Full name"
                          ref={register}
                        />
                        <input
                          name="addressDetail"
                          type="text"
                          placeholder="Detail Address"
                          ref={register}
                        />
                        <input
                          name="phone"
                          type="text"
                          placeholder="Your Phone"
                          ref={register}
                        />
                      </div>

                      <div className="action-exchange">
                        <button className="bt-exchange" type="submit">
                          Send
                        </button>
                        <button
                          className="cancel-exchange"
                          type="button"
                          onClick={handleCancelSendAddress}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : null}

            {filterDataTran.map((data, key) => {
              return (
                <ListTran
                  nameExchange={data.name_user_want_exchange}
                  avatarUrlExchange={data.avatarUrl_user_want_exchange}
                  titleExchange={data.title_product_with_exchange}
                  imagePostUrlExchange={data.imagePostUrl_product_with_exchange}
                  addressExchange={data.address_product_with_exchange}
                  name={data.name_user_product}
                  avatarUrl={data.avatarUrl_user_product}
                  title={data.title_product}
                  imagePostUrl={data.imagePostUrl_product}
                  address={data.address_product}
                  status={data.status}
                  createdAt={data.createdAt}
                  id_user_product={data.id_user_product}
                  _id={data._id}
                  key={key}
                  id_product={data.id_product}
                  id_user_want_exchange={data.id_user_want_exchange}
                />
              );
            })}
          </Col>
        </Row>
      </div>
    </div>
  );
}
