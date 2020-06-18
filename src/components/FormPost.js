import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import Autocomplete from "react-google-autocomplete";
import axios from "axios";
import { useSelector } from "react-redux";

import "../styles/FormPost.css";
import attachPhoto from "../images/view.png";

export default function FormPost(props) {
  const [address, setAddress] = useState({});
  const [file, setFile] = useState(null);
  const [needItem, setNeedItem] = useState([]);
  const [add, setAdd] = useState([]);

  const { register, handleSubmit } = useForm();

  const mapStateToProps = useSelector((state) => state.logIn);
  const CheckLoggedIn = useSelector((state) => state.CheckLoggedIn);
  const { handleCloseFormPost, fetchData } = props;
  // form auto address
  const handleAddress = (event) => {
    const value = event.target.value;
    setAddress(value);
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
    if (mapStateToProps._id !== undefined) {
      fd.append("idUserPost", mapStateToProps._id);
    } else {
      fd.append("idUserPost", CheckLoggedIn.dataUser._id);
    }
    fd.append("need", need);

    axios
      .post("https://tc9y3.sse.codesandbox.io/posts/items", fd)
      .then((res) => {
        console.log(res.data);
        e.target.reset();
        return fetchData();
      });
  };
  //handle Show List Need

  return (
    <div className="container-post">
      <div className="container-heart-form-post">
        <i className="fas fa-edit"></i>
        <span>Write your post</span>
        <i
          className="fas fa-times icon-times-form-post"
          onClick={() => {
            return handleCloseFormPost();
          }}
        ></i>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="content-post">
          <input
            type="text"
            id="title"
            name="title"
            ref={register}
            placeholder="What is your item?"
            required
          />

          <textarea
            rows="6"
            cols="50"
            name="description"
            ref={register}
            placeholder="How do your item look like?"
            required
          />
          <div className="attach-file">
            <label>
              <img src={attachPhoto} alt="" />
              <input
                type="file"
                onChange={handleFile}
                id="imageItem"
                required
              />
            </label>
          </div>
        </div>

        <input
          className="autoComplete"
          onChange={handleAddress}
          placeholder="Type province or city"
          required
        />

        <div className="needExchange">
          <div className="addNeed">
            <input
              type="text"
              onChange={handleNeed}
              value={needItem}
              placeholder="What are your looking for?"
            />
            <button onClick={handleAdd} type="button">
              Add
            </button>
          </div>
          <div className="container-list-need">
            <div className="listNeed">
              <ul>
                {add.map((items, key) => {
                  return <li key={key}>{items}</li>;
                })}
              </ul>
            </div>
            <div className="action-form-post">
              <button id="button-submit" type="submit">
                Post
              </button>
              <button
                id="button-cancel-post"
                type="button"
                onClick={() => {
                  return handleCloseFormPost();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
