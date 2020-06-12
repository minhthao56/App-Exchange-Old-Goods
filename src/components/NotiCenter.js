import React from "react";

import "../styles/NotiCenter.css";

export default function NotiCenter(props) {
  const { dataNoti } = props;
  return (
    <div className="container-noti">
      <div className="header-noti">Notifications</div>
      {dataNoti.map((data) => {
        return (
          <div className="main-noti">
            <div className="avatar-noti"></div>
            <div className="content-noti">
              {" "}
              <span>{data.content_noti}</span>{" "}
            </div>
          </div>
        );
      })}
    </div>
  );
}
