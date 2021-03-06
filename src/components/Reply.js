import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Moment from "react-moment";

import "../styles/Reply.css";

export default function Reply(props) {
  const [replyContent, setReplyContent] = useState("");
  const { id_post, id_comment, replys, fetchData, id_user_comment } = props;
  //Redux
  const mapStateToProps = useSelector((state) => state.logIn);
  const CheckLoggedIn = useSelector((state) => state.CheckLoggedIn);
  // Handle reply comment
  const handleReplyComment = (event) => {
    const vaule = event.target.value;
    setReplyContent(vaule);
  };

  //Handle Noti reply
  const handleNotiReply = async () => {
    const mapIdUserCommented = replys.map((reply) => {
      return reply.id_user_reply;
    });
    const filterIdDuplicates = [...new Set(mapIdUserCommented)];
    const notiReply = {
      id_user_comment: id_user_comment,
      content_noti: "Replied your comment in",
      id_post: id_post,
      id_user_replied: filterIdDuplicates,
      id_user_reply: mapStateToProps._id || CheckLoggedIn.dataUser._id,
      isRead: false,
    };
    const res = await axios.post(
      "https://tc9y3.sse.codesandbox.io/notis/reply",
      notiReply
    );
    console.log(res.data);
  };

  // handle Submit Reply Comment
  const handleSubmitReplyComment = (event) => {
    event.preventDefault();
    const date = new Date();
    const reply = {
      id_user_reply: mapStateToProps._id || CheckLoggedIn.dataUser._id,
      content_reply: replyContent,
      id_post: id_post,
      time_replay: date,
      id_comment: id_comment,
    };
    axios
      .post("https://tc9y3.sse.codesandbox.io/posts/reply", reply)
      .then((res) => {
        console.log(res.data);
        setReplyContent("");
        handleNotiReply();
        return fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container-reply">
      {replys.map((reply, key) => {
        return (
          <div className="dislay-replay" key={key}>
            <div
              className="avatar-reply"
              style={{
                backgroundImage: `url(${reply.avatarUrl})`,
              }}
            ></div>
            <div className="main-reply">
              <div className="comment-reply">
                <span>
                  {" "}
                  <b> {reply.name} </b> {reply.content_reply}
                </span>
              </div>
              <div className="moment-reply">
                <span>
                  <Moment fromNow>{reply.time_replay}</Moment>
                </span>
              </div>
            </div>
          </div>
        );
      })}

      <div className="reply-form">
        <div
          className="avatar-form-reply"
          style={{
            backgroundImage: `url(${
              mapStateToProps.avatarUrl || CheckLoggedIn.dataUser.avatarUrl
            })`,
          }}
        ></div>
        <form onSubmit={handleSubmitReplyComment}>
          <input
            type="text"
            placeholder="Type you reply..."
            value={replyContent}
            onChange={handleReplyComment}
          ></input>
          <button>Relay</button>
        </form>
      </div>
    </div>
  );
}
