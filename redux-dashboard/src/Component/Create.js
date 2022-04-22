import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../Feature/Item";
import "./Create.css";
import { useLocation } from "react-router-dom";

function Create() {
  const [createName, setCreateName] = useState("");
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const axios = require("axios");
  const addNewItem = () => {
    if (createName !== "") {
      axios
        .post("http://localhost:3001/posts", {
          id: location.state.id,
          title: createName,
          img: "something",
        })
        .then((resp) => {
          //console.log(resp.data.title);
          dispatch(addItem(resp.data.title));
          //console.log("create dispatch");
          history.push("/dashboard");
          //console.log("route to dashboard");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("please enter name");
    }
  };

  return (
    <div className="create-form">
      <div className="title">Title {location.state.id}</div>
      <form>
        <input
          type="text"
          value={createName}
          placeholder="Add title here"
          onChange={(e) => {
            setCreateName(e.target.value);
          }}
        />
        <div className="button-wrapper">
          <Button
            variant="contained"
            style={{ backgroundColor: "royalblue", color: "white" }}
            onClick={addNewItem}
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Create;
