import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

export default function InFoTrans() {
  let { id } = useParams();

  return (
    <div>
      <h3>ID: {id}</h3>
      <p>ok</p>
    </div>
  );
}
