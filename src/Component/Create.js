import React, { createContext, useContext } from "react";
import Button from "@material-ui/core/Button";
import "./Create.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ItemContext } from "../Store/Context";

function Create() {
  const [createName, setCreateName] = useState("");

  const [itemCtxCreate, setItemCtxCreate] = useContext(ItemContext);

  const addNewCreate = () => {
    if (createName !== "") {
      const newCreateItem = { id: 0, title: createName, img: "something" };
      setItemCtxCreate((prevItem) => [...prevItem, newCreateItem]);
      setCreateName("");
      history.push("dashboard");
    }
    else {
      alert("please enter name")
    }
  };

  const history = useHistory();

  return (
    <div className="create-form">
      <div className="title">Title</div>
      <form>
        <input
          type="text"
          //value={createName}
          placeholder="Add title here"
          onChange={(event) => setCreateName(event.target.value)}
        />
        <div className="button-wrapper">
          <Button variant="contained" onClick={addNewCreate}
          style = {{backgroundColor: 'royalblue', color: 'white'}}>
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Create;
