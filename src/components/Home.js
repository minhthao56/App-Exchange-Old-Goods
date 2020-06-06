import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faBell,
  faHome,
  faQuestionCircle,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";
import axios from "axios";

import FormPost from "../components/FormPost";
import PostCard from "../components/PostCard";
import "../styles/Home.css";
import ExchangeIcon from "../images/047-exchange.png";
import FormTrans from "../components/FormTrans";

export default function Home(props) {
  const [isPost, setIsPost] = useState(false);
  const [dataPost, setDataPost] = useState([]);

  const mapStateToProps = useSelector(state => state.logIn);
  const mapStateToPropsExchange = useSelector(state => state.Exchange);

  // Open and lose model
  const hanldeClickPost = () => {
    setIsPost(!isPost);
  };
  const handleClose = () => {
    setIsPost(!isPost);
  };
  // Animation
  const face = useSpring({
    visibility: isPost ? "visible" : "hidden",
    opacity: isPost ? 1 : 0
  });

  //Get full data from mongoBD
  const fetchData = async () => {
    const response = await axios.get(
      "https://tc9y3.sse.codesandbox.io/posts/items/"
    );
    setDataPost(response.data);
  };
  useEffect(() => {
    fetchData(dataPost);
  }, [dataPost]);

  // Filter post of user
  const postOfUser = dataPost.filter(data => {
    return data.idUserPost === mapStateToProps.dataUser._id;
  });
  return (
    <div>
      <nav className="container-nav">
        <div className="container-bar">
          <div className="LogoPage">
            <img src={ExchangeIcon} alt="" />
            <span>Second Life</span>
          </div>
          <div className="icon-nav">
            <Link className="icon-home" to="/">
              <FontAwesomeIcon icon={faHome} />
            </Link>
            <div className="icon-noti">
              <div className="dot-noti" />
              <FontAwesomeIcon icon={faBell} />
            </div>
            <div className="icon-help">
              <FontAwesomeIcon icon={faQuestionCircle} />{" "}
            </div>
          </div>
          {mapStateToProps.isAuth ? (
            <Link to="/profile">
              <div>{mapStateToProps.dataUser.name}</div>
            </Link>
          ) : (
            <div className="container-list">
              <Link className="nav-link" to="/users/login">
                Login
              </Link>
              <Link className="nav-link" to="/users/create">
                Users
              </Link>
              <Link className="nav-link" to="/profile">
                profile
              </Link>
              {/* <Link className="nav-link" to="/trans">
                Stran
              </Link>
              <Link className="nav-link" to="/trans/info">
                Info Trans
              </Link>
              <Link className="nav-link" to="/user/info">
                Info accout
              </Link> */}
            </div>
          )}
        </div>
      </nav>
      <div className="contaiter-home">
        <Row id="row">
          <Col span={15} id="colPost">
            <div className="clickToPost">
              <h2>Let's show me</h2>
              <div className="inputAndIconPost">
                <input onClick={hanldeClickPost} />
                <button>
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </div>
            </div>
            <animated.div style={face} className="container-fixed">
              <div className="icon-time">
                <FontAwesomeIcon icon={faTimes} onClick={handleClose} />
              </div>
              <FormPost />
            </animated.div>
            {/* Post exchange */}
            {mapStateToPropsExchange.isShowExchange ? (
              <FormTrans postOfUser={postOfUser} />
            ) : null}
            {/* Car post */}
            {dataPost.map(data => {
              return (
                <PostCard
                  name={data.name}
                  title={data.title}
                  description={data.description}
                  imagePostUrl={data.imagePostUrl}
                  createdAt={data.createdAt}
                  comments={data.comment}
                  like={data.like}
                  address={data.address}
                  avatarUrl={data.avatarUrl}
                  need={data.need}
                  id_post={data.id_post}
                  id_user={data.id_user}
                  hanldeClickPost={hanldeClickPost}
                />
              );
            })}
          </Col>
          <Col span={9}>
            <div>
              <h1>accout</h1>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
