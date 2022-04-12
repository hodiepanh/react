import React, { createContext, useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import {useHistory} from 'react-router-dom';
import{useDispatch} from 'react-redux';
import {addItem} from '../Feature/Item';
import './Create.css'

function Create() {
  const [createName, setCreateName] =useState("");
  const history = useHistory()
  const dispatch = useDispatch();

  const addNewItem =()=>{
    if(createName!==""){
      dispatch(addItem(createName));
      history.push('/dashboard')
    }
    else {
      alert('please enter name')
    }
  }

  return (
    <div className="create-form">
      <div className="title">Title</div>
      <form>
        <input
          type="text"
          value={createName}
          placeholder="Add title here"
          onChange={(e)=>{setCreateName(e.target.value)}}
        />
        <div className="button-wrapper">
          <Button variant="contained"
          style = {{backgroundColor: 'royalblue', color: 'white'}}
          onClick = {addNewItem}>
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Create;
