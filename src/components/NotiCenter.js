import React from "react";
import Moment from "react-moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import "../styles/NotiCenter.css";

export default function NotiCenter(props) {
  const { dataNoti } = props;

  return (
    <div className="container-noti">
      <div className="header-noti">
        <i className="far fa-bell"></i>
        <span>Notifications</span>
      </div>
      {dataNoti.map((data, key) => {
        return (
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
                  {data.content_noti}&nbsp;your post <b>{data.title}</b>
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
        );
      })}
    </div>
  );
}
