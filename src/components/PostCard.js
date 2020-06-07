import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCommentAlt,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

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
      <div className="avatar">
        <img src={avatarUrl} alt="" />
      </div>
      <div className="content-post">
        <span className="name-post">{name}</span>
        <span className="tile-post">{title}</span>
        <span className="descrption-post">{description}</span>
        <img src={imagePostUrl} alt="" />
        <div className="need-item">
          <span>Need:</span>
          <ul>
            {need.map((item) => {
              return <li>{item}</li>;
            })}
          </ul>
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
            <FontAwesomeIcon icon={faCommentAlt} />
            <span>Comment</span>
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faSyncAlt} onClick={handleExchange} />

            <span>Exchange</span>
          </div>
        </div>
        <div className="form-comment">
          <form onSubmit={handleSubmitComment}>
            <input
              type="text"
              onChange={handleValueComment}
              value={commentContent}
            />
            <button type="submit">Post</button>
          </form>
        </div>
        <div className="container-comment">
          {comments.map((comment) => {
            return (
              <div>
                {comment.name} {comment.content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
