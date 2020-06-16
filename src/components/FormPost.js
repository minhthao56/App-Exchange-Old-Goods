import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Autocomplete from "react-google-autocomplete";
import axios from "axios";
import { useSelector } from "react-redux";

import "../styles/FormPost.css";
import attachPhoto from "../images/view.png";

export default function FormPost() {
  const [address, setAddress] = useState({});
  const [file, setFile] = useState(null);
  const [needItem, setNeedItem] = useState([]);
  const [add, setAdd] = useState([]);
  const { register, handleSubmit } = useForm();
  const [isShowListNeed, setIsShowListNeed] = useState(false);

  const mapStateToProps = useSelector((state) => state.logIn);

  const handleAddress = (place) => {
    setAddress(place.name);
  };

  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };

  const handleNeed = (event) => {
    const value = event.target.value;
    setNeedItem(value);
  };

  const handleAdd = () => {
    setAdd([...add, needItem]);
    setNeedItem([]);
  };

  const onSubmit = (data, e) => {
    const title = data.title;
    const description = data.description;
    const need = add;

    const fd = new FormData();
    fd.append("fileImagePost", file);
    fd.append("title", title);
    fd.append("description", description);
    fd.append("Address", address);
    fd.append("idUserPost", mapStateToProps.dataUser._id);
    fd.append("need", need);

    axios
      .post("https://tc9y3.sse.codesandbox.io/posts/items", fd)
      .then((res) => {
        console.log(res.data);
        e.target.reset();
      });
  };
  //handle Show List Need
  const handleShowListNeed = () => {
    setIsShowListNeed(true);
  };
  return (
    <div className="container-post">
      <div className="container-heart-form-post">
        <i className="fas fa-edit"></i>
        <span>Write your post</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="content-post">
          <input
            type="text"
            id="title"
            name="title"
            ref={register}
            placeholder="What is your item?"
          />

          <textarea
            rows="6"
            cols="50"
            name="description"
            ref={register}
            placeholder="How do your item look like?"
          />
          <div className="attach-file">
            <label>
              <img src={attachPhoto} alt="" />
              <input type="file" onChange={handleFile} id="imageItem" />
            </label>
          </div>
        </div>

        <Autocomplete
          className="autoComplete"
          style={{ width: "100%" }}
          onPlaceSelected={handleAddress}
          types={["(cities)"]}
          componentRestrictions={{ country: "vn" }}
          placeholder="Type you district, province or city"
        />

        <div className="needExchange">
          <div className="addNeed">
            <input
              type="text"
              onChange={handleNeed}
              value={needItem}
              placeholder="What are your looking for?"
              onClick={handleShowListNeed}
            />
            <button onClick={handleAdd} type="button">
              Add
            </button>
          </div>
          {isShowListNeed === true ? (
            <div className="listNeed">
              <ul>
                {add.map((items, key) => {
                  return <li key={key}>{items}</li>;
                })}
              </ul>
            </div>
          ) : null}
        </div>
        <div className="action-form-post">
          <button id="button-submit" type="submit">
            Post
          </button>
          <button id="button-cancel-post" type="button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
