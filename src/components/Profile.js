import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import "../styles/Profile.css";
import ListTran from "../components/ListTran";

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
  const mapStateToProps = useSelector(state => state.logIn);
  const userLoggedIn = mapStateToProps.dataUser;
  const filterDataTran = dataTran.filter(function(dataFilter) {
    if (
      dataFilter.id_user_product === userLoggedIn._id ||
      dataFilter.id_user_want_exchange === userLoggedIn._id
    ) {
      return true;
    }
  });
  return (
    <div className="container-frofile">
      <Link className="nav-link" to="/users/login">
        Login
      </Link>
      <Link className="nav-link" to="/users/create">
        Users
      </Link>
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Row id="row-profile">
        <Col id="col-list-acc" span={6}>
          Acc
        </Col>
        <Col id="col-list-trans" span={18}>
          {filterDataTran.map(data => {
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
                id_user_product={data.id_user_product}
                _id={data._id}
              />
            );
          })}
        </Col>
      </Row>
    </div>
  );
}
