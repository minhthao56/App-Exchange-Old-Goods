import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import "../styles/Profile.css";
import ListTran from "../components/ListTran";
import Nav from "../components/Nav";
import SidleBarAcc from "../components/SidleBarAcc";

export default function Porfile() {
  const [dataTran, setDataTran] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://tc9y3.sse.codesandbox.io/trans/listtrans"
    );
    setDataTran(response.data);
  };
  useEffect(() => {
    fetchData(dataTran);
  }, [dataTran]);
  const mapStateToProps = useSelector((state) => state.logIn);
  const userLoggedIn = mapStateToProps.dataUser;
  const { register, handleSubmit } = useForm();
  const mapStateToPropsSendAddress = useSelector((state) => state.SendAddress);

  //Handler filter tran relative to user loggin
  const filterDataTran = dataTran.filter(function (dataFilter) {
    if (
      dataFilter.id_user_product === userLoggedIn._id ||
      dataFilter.id_user_want_exchange === userLoggedIn._id
    ) {
      return true;
    }
  });
  // Handle submit address detail and phone

  const onSubmit = (data) => {
    const addressAndPhone = {
      id_user: userLoggedIn._id,
      id_trans: mapStateToPropsSendAddress.id,
      addressDetail: data.addressDetail,
      phone: data.phone,
      fullName: data.fullName,
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/trans/address", addressAndPhone)
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <div>
      <Nav />
      <div className="container-frofile">
        <Row id="row-profile">
          <Col id="col-list-acc" span={6}>
            <SidleBarAcc />
          </Col>
          <Col id="col-list-trans" span={18}>
            {mapStateToPropsSendAddress.isShowSendAddress ? (
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                  <button type="submit">Send</button>
                </form>
              </div>
            ) : null}

            {filterDataTran.map((data) => {
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
                />
              );
            })}
          </Col>
        </Row>
      </div>
    </div>
  );
}
