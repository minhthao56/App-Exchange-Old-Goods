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
import { Spin } from "antd";

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
  const [perPage, setPerPage] = useState(3);

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

  //Get full data from mongoBD

  const fetchData = async () => {
    const response = await axios.get(
      `https://tc9y3.sse.codesandbox.io/posts/items?page=${page}&perPage=${perPage}`
    );
    setDataPost(response.data);
  };
  const fetchMoreData = async () => {
    setPage((page = page + 1));
    const response = await axios.get(
      `https://tc9y3.sse.codesandbox.io/posts/items?page=${page}&perPage=${perPage}`
    );
    setDataPost(dataPost.concat(response.data));
  };
  useEffect(() => {
    fetchData();
    checkLoggedIn();
  }, []);

  // Filter post of user
  const postOfUser = dataPost.filter((data) => {
    return (
      data.idUserPost === CheckLoggedIn.dataUser._id || mapStateToProps._id
    );
  });
  // Sort by Date
  const sortByDate = dataPost.sort((a, b) => {
    let date1 = new Date(a.createdAt);
    let date2 = new Date(b.createdAt);
    return date2 - date1;
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
              <FormTrans postOfUser={postOfUser} />
            ) : null}
            {/* Car post */}
            <InfiniteScroll
              dataLength={sortByDate}
              next={fetchMoreData}
              hasMore={true}
              loader={<Spin />}
            >
              {sortByDate.map((data, key) => {
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
                  />
                );
              })}
            </InfiniteScroll>
          </Col>
          <Col xl={9} lg={9} xs={0} sm={0} md={0}>
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
