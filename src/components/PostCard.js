import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faMapMarkerAlt,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import ShowMoreText from "react-show-more-text";

import "../styles/PostCard.css";
export default function PostCard(props) {
  const {
    name,
    title,
    description,
    imagePostUrl,
    createdAt,
    comments,
    like,
    address,
    avatarUrl,
    need,
    id_post,
    id_user,
    fetchData,
  } = props;

  const [commentContent, setCommetContent] = useState("");
  const mapStateToProps = useSelector((state) => state.logIn);
  const dispatch = useDispatch();

  // Value comment
  const handleValueComment = (event) => {
    const value = event.target.value;
    setCommetContent(value);
  };
  // Submit comment
  const handleSubmitComment = (event) => {
    event.preventDefault();
    const commentPost = {
      idUserComment: mapStateToProps.dataUser._id,
      content: commentContent,
      id_post: id_post,
    };

    axios
      .post("https://tc9y3.sse.codesandbox.io/posts/comments", commentPost)
      .then((res) => {
        setCommetContent("");
        return fetchData();
      });
  };
  // Like
  const handleLike = () => {
    const like = {
      id_user_liked: mapStateToProps.dataUser._id,
      id_post: id_post,
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/posts/like", like)
      .then((res) => {
        console.log(res.data);
        return fetchData();
      });
  };
  // Unlike
  const handleUnLike = () => {
    const Unlike = {
      id_user_liked: mapStateToProps.dataUser._id,
      id_post: id_post,
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/posts/unlike", Unlike)
      .then((res) => {
        console.log(res.data);
        return fetchData();
      });
  };
  // Filter user Logged in liked
  const arrIdUserLiked = like.filter(function (userLiked) {
    return userLiked.id_user_liked === mapStateToProps.dataUser._id;
  });
  // handleExchange
  const handleExchange = () => {
    const id = { id_product: id_post, id_user_product: id_user };
    dispatch({ type: "EXCHANGE", id: id });
  };

  return (
    <div className="container-cardPost">
      <div>
        <div className="avatar-name">
          <img src={avatarUrl} alt="" />
          <div className="conten-comment">
            <span className="name-post">{name}</span>
            <div className="moment">
              <span>
                <FontAwesomeIcon icon={faClock} />
              </span>
              <Moment fromNow>{createdAt}</Moment>
            </div>
          </div>
        </div>
        <div className="address">
          <div className="icon-address">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </div>
          <span>{address}</span>
        </div>

        <h3 className="tile-post">{title}</h3>
        <div className="main-post">
          <div className="description-post">
            <ShowMoreText
              lines={4}
              more="Show more"
              less="Show less"
              anchorClass=""
              expanded={false}
              width={280}
            >
              {description}
            </ShowMoreText>
            <div className="need-item">
              <span>Need:</span>

              {need.map((item, key) => {
                return (
                  <div className="icon-need" key={key}>
                    <FontAwesomeIcon icon={faSeedling} /> <span>{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="image-post">
            <img src={imagePostUrl} alt="" className="img-post" />
          </div>
        </div>
        <div className="conunt-like">
          <span>
            <img
              src="https://cdn.glitch.com/01654afb-2edf-4d94-955a-e0046da0d025%2Fheart%20(3).png?v=1591217736855"
              alt=""
            />
            {like.length}
          </span>

          <span>{comments.length} People commented</span>
        </div>
        <div className="action">
          <div className="icon-like">
            {arrIdUserLiked.length ? (
              <img
                src="https://cdn.glitch.com/01654afb-2edf-4d94-955a-e0046da0d025%2Fheart%20(3).png?v=1591217736855"
                alt=""
                onClick={handleUnLike}
              />
            ) : (
              <img
                src="https://cdn.glitch.com/01654afb-2edf-4d94-955a-e0046da0d025%2Fthumbnails%2Fheart%20(10).png?1591217727346"
                alt=""
                onClick={handleLike}
              />
            )}
            <span>Like</span>
          </div>
          <div className="icon">
            <i className="far fa-comments"></i>
            <span>Comment</span>
          </div>
          <div className="icon">
            <i className="fas fa-exchange-alt" onClick={handleExchange}></i>
            <span>Exchange</span>
          </div>
        </div>

        <div className="container-comment">
          {comments.map((comment, key) => {
            return (
              <div key={key}>
                <div className="content-comment">
                  <img src={avatarUrl} />
                  <div className="main-comment">
                    <b> {comment.name} </b> {comment.content}
                  </div>
                </div>
                <div className="reply">
                  <button>Reply</button>
                  <span>Now</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="form-comment">
          <div>
            <img src={avatarUrl} />
          </div>
          <form onSubmit={handleSubmitComment}>
            <input
              type="text"
              onChange={handleValueComment}
              value={commentContent}
              placeholder="Type your comment"
            />
            <button type="submit">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
