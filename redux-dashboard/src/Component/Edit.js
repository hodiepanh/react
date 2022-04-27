import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useHistory, useParams } from "react-router-dom";
import "./Edit.css";
import { useDispatch, useSelector } from "react-redux";
import { editItem } from "../feature/Item";
import { editItems } from "../api/itemApi";

function Edit() {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const editInitialName = useSelector(
    (state) => state.itemReducer.value[id].title
  );
  const [editName, setEditName] = useState(editInitialName);

  const updateItem = async () => {
    editItems(id, editName).then((resp) => {
      //console.log(resp.data);
      const id = resp.data.id;
      const editName = resp.data.title;
      dispatch(editItem({ id, editName }));
      //console.log("edit dispatch");
      history.push("/dashboard");
      //console.log("edit route");
    });
  };

  return (
    <div className="edit-form">
      <div className="title">Title</div>
      <div className="edit-form-wrapper">
        <input
          type="text"
          value={editName}
          onChange={(event) => {
            setEditName(event.target.value);
          }}
        ></input>
        <div className="button-wrapper">
          <Button
            style={{
              backgroundColor: "green",
              color: "white",
              marginRight: "20px",
            }}
            variant="contained"
            onClick={updateItem}
          >
            Update
          </Button>
          <Button
            className="cancel-form-button"
            variant="contained"
            onClick={() => {
              history.push("/dashboard");
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
