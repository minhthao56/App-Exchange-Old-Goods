import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import Moment from "react-moment";
import { useSpring, animated } from "react-spring";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin, Empty } from "antd";

import FormPost from "../components/FormPost";
import PostCard from "../components/PostCard";
import "../styles/Home.css";
import FormTrans from "../components/FormTrans";
import Nav from "../components/Nav";
import NoData from "../images/nodata.png";
import Login from "../images/login2.png";

export default function Home() {
  const [isPost, setIsPost] = useState(false);
  const [dataPost, setDataPost] = useState([]);
  let [page, setPage] = useState(1);
  const [dataTran, setDataTran] = useState([]);

  //Redux
  const mapStateToProps = useSelector((state) => state.logIn);
  const mapStateToPropsExchange = useSelector((state) => state.Exchange);
  const CheckLoggedIn = useSelector((state) => state.CheckLoggedIn);
  const UpdateUser = useSelector((state) => state.UpdateUser);

  const dispatch = useDispatch();
  //localStoage
  const token = localStorage.getItem("token");
  // check login
  const checkLoggedIn = () => {
    axios
      .post("https://tc9y3.sse.codesandbox.io/users/checklogin/", { token })
      .then((res) => {
        console.log("fetch data");
        dispatch({
          type: "LOGGED_IN",
          dataUser: res.data,
        });
      });
  };

  // Open and lose model
  const hanldeClickPost = () => {
    if (mapStateToProps.isAuth === false || CheckLoggedIn.isAuth === false) {
      toast.error("Let Login or Sign Up 👍");
    } else {
      setIsPost(!isPost);
    }
  };
  const handleCloseFormPost = () => {
    setIsPost(!isPost);
  };
  // Animation
  const face = useSpring({
    visibility: isPost ? "visible" : "hidden",
    opacity: isPost ? 1 : 0,
  });

  // Fetch data transactions
  const fetchDataTran = async () => {
    const response = await axios.get(
      "https://tc9y3.sse.codesandbox.io/trans/listtrans"
    );
    setDataTran(response.data);
  };

  //Get full data from mongoBD

  const fetchData = async () => {
    const response = await axios.get(
      `https://tc9y3.sse.codesandbox.io/posts/items?page=${page}&perPage=${3}`
    );
    setDataPost(response.data);
  };
  const fetchMoreData = async () => {
    setPage((page = page + 1));
    const response = await axios.get(
      `https://tc9y3.sse.codesandbox.io/posts/items?page=${page}&perPage=${3}`
    );
    setDataPost(dataPost.concat(response.data));
  };
  useEffect(() => {
    fetchData();
    checkLoggedIn();
    fetchDataTran();
  }, []);

  // Filter post of user
  const postOfUser = dataPost.filter((data) => {
    return (
      data.idUserPost === CheckLoggedIn.dataUser._id || mapStateToProps._id
    );
  });

  const filterTransed = postOfUser.filter((data) => {
    if (
      data.status === "confirmed" ||
      data.status === "sending" ||
      data.status === "received"
    ) {
      return false;
    } else {
      return true;
    }
  });
  // Sort by Date
  // const sortByDate = dataPost.sort((a, b) => {
  //   let date1 = new Date(a.createdAt);
  //   let date2 = new Date(b.createdAt);
  //   return date2 - date1;
  // });

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

  return (
    <div>
      <Nav fetchData={fetchData} />
      <ToastContainer />
      <div className="contaiter-home">
        <Row id="row">
          <Col xs={24} sm={24} md={24} xl={15} lg={15} id="colPost">
            {/* input Post */}
            <div className="clickToPost">
              <div className="title-form-post">
                <i className="fab fa-hubspot"></i>
                <p>Let's show me</p>
              </div>
              <div className="inputAndIconPost">
                <button className="bt-post-1">Sign Out</button>
                <button className="bt-post-2">Post</button>
                <input onClick={hanldeClickPost} />
              </div>
            </div>
            {/*form post + animated*/}
            <animated.div style={face} className="container-fixed">
              <FormPost
                handleCloseFormPost={handleCloseFormPost}
                fetchData={fetchData}
              />
            </animated.div>
            {/* Post exchange */}
            {mapStateToPropsExchange.isShowExchange ? (
              <FormTrans postOfUser={filterTransed} />
            ) : null}
            {/* Car post */}
            <InfiniteScroll
              dataLength={dataPost}
              next={fetchMoreData}
              hasMore={true}
              loader={<Spin />}
            >
              {dataPost.map((data, key) => {
                return (
                  <PostCard
                    name={data.name}
                    title={data.title}
                    description={data.description}
                    imagePostUrl={data.imagePostUrl}
                    createdAt={data.createdAt}
                    comments={data.comments}
                    like={data.like}
                    address={data.address}
                    avatarUrl={data.avatarUrl}
                    need={data.need}
                    id_post={data.id_post}
                    id_user={data.id_user}
                    fetchData={fetchData}
                    key={key}
                    status={data.status}
                  />
                );
              })}
            </InfiniteScroll>
          </Col>
          <Col xl={9} lg={9} xs={0} sm={0} md={0} id="home-col-2">
            {/* Infor fixed */}
            {mapStateToProps.isAuth || CheckLoggedIn.isAuth ? (
              <div className="container-accout">
                <div className="account-fixed">
                  <div className="img-acc">
                    <div className="img-color">
                      <div
                        className="avatar-fixed"
                        style={{
                          backgroundImage: `url(${
                            UpdateUser.avatarUrl ||
                            mapStateToProps.avatarUrl ||
                            CheckLoggedIn.dataUser.avatarUrl
                          })`,
                        }}
                      ></div>
                    </div>
                    <span>
                      {UpdateUser.name ||
                        CheckLoggedIn.dataUser.name ||
                        mapStateToProps.name}
                    </span>
                  </div>
                </div>

                <div className="email-fixed">
                  <h3>Your info</h3>
                  <span>
                    <i className="fas fa-envelope icon-mail"> </i>
                    <span>
                      {UpdateUser.email ||
                        mapStateToProps.email ||
                        CheckLoggedIn.dataUser.email}
                    </span>
                  </span>
                  <span>
                    <i className="fas fa-user-clock icon-user-clock"></i>
                    <span>
                      <Moment fromNow>
                        {mapStateToProps.createdAt ||
                          CheckLoggedIn.dataUser.createdAt}
                      </Moment>
                    </span>
                  </span>
                </div>
                <div className="acc-transaction">
                  <h3> Your Transactions</h3>

                  <table>
                    <thead>
                      <tr id="title-table">
                        <th id="name-th">Name</th>
                        <th>Status</th>
                        <th>View More</th>
                      </tr>
                    </thead>
                    {filterDataTran.length ? null : <Empty />}
                    {filterDataTran.map((data, key) => {
                      return (
                        <tbody key={key}>
                          <tr>
                            <td>
                              <div className="name-avatar-table">
                                <div
                                  className="avatar-postcard avatar-table"
                                  style={{
                                    backgroundImage: `url(${data.avatarUrl_user_want_exchange})`,
                                  }}
                                ></div>
                                <span>{data.name_user_want_exchange}</span>{" "}
                              </div>
                            </td>
                            <td>{data.status}</td>
                            <td>
                              <Link to={"/transaction/info/" + data._id}>
                                Detail
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              </div>
            ) : (
              <div className="nodata">
                <div className="fixed-login">
                  <img src={Login} />
                  <h1>Login Now</h1>
                  <div>
                    <Link to="/users/login">
                      <button>Login</button>
                    </Link>
                    <Link to="/users/login">
                      <button>Sign up</button>
                    </Link>
                  </div>
                </div>
                <img src={NoData} />
              </div>
            )}
            {/* Infor fixed  */}
          </Col>
        </Row>
      </div>
    </div>
  );
}
