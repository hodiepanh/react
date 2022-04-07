import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { ItemContext } from "../Store/Context";
import "./Edit.css";

function Edit() {
  const [itemCtx, setItemCtx] = useContext(ItemContext);
  let history = useHistory();
  const { id } = useParams();
  const [editName, setEditName] = useState(itemCtx[id].title);

  const editItem = () => {
    itemCtx[id].title = editName;
    history.push("/dashboard");
  };

  return (
    <div className="edit-form">
      <div className="title">Title</div>
      <div className="edit-form-wrapper">
        <input
        value={editName}
        type="text"
        onChange={(event) => setEditName(event.target.value)}
      ></input>
      <div className="button-wrapper">
        <Button className="edit-form-button"
        variant="contained" onClick={editItem}>
          Update
        </Button>
        <Button className="cancel-form-button"
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
