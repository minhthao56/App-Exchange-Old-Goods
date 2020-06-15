import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import "../styles/NotiCenter.css";

export default function NotiCenter(props) {
  const { dataNoti } = props;
  //Noti exchange
  const typeNotiSendAddress = "Sent address to recive product";
  const typeNotiComfirmDelivery = "Confirmed delivery 😍 product";
  const typeNotiComfirmRecive = "Confirmed receive 👌 product";
  // Noti post
  const typeNotiComment = "Commented";
  const typeNotiLike = "Love ❤";
  const typeNotiReply = "Replied your comment in";

  return (
    <div className="container-noti">
      <div className="header-noti">
        <i className="far fa-bell"></i>
        <span>Notifications</span>
      </div>
      {dataNoti.map((data, key) => {
        return (
          <Link
            to={
              data.content_noti === typeNotiComment ||
              data.content_noti === typeNotiLike ||
              data.content_noti === typeNotiReply
                ? "/"
                : data.content_noti === typeNotiSendAddress ||
                  data.content_noti === typeNotiComfirmDelivery ||
                  data.content_noti === typeNotiComfirmRecive
                ? "/transaction/info/" + data.id_tran
                : "/profile"
            }
          >
            <div className="main-noti" key={key}>
              <div className="center-noti">
                <div className="name-avatar-noti">
                  <div
                    className="avatar-noti"
                    style={{
                      backgroundImage: `url(${data.avatarUrl})`,
                    }}
                  />
                  <span className="name-noti">{data.name}</span>
                </div>
                <div className="content-noti">
                  <span>
                    {" "}
                    {data.content_noti}&nbsp;
                    <b>{data.title}</b>
                  </span>
                </div>
              </div>
              <div className="moment">
                <span>
                  <FontAwesomeIcon icon={faClock} />
                </span>
                <Moment fromNow>{data.createdAt}</Moment>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
