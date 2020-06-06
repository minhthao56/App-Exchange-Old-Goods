import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TransactionInfo() {
  const [detailTrans, setDetialTrans] = useState("");
  let { id } = useParams();

  const fetchData = async () => {
    const response = await axios.get(
      "https://tc9y3.sse.codesandbox.io/trans/listtrans/" + id
    );
    setDetialTrans(response.data);
  };

  useEffect(() => {
    fetchData(detailTrans);
  }, [detailTrans]);

  return (
    <div>
      <h3>ID: {detailTrans}</h3>
      <p>ok chưa ông nội con mệt quá nha</p>
    </div>
  );
}
