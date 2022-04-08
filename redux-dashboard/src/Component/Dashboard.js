import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem,removeItem,searchItem,resetSearch } from "../Feature/Item";
import './Dashboard.css'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    aspectRatio: 1 / 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    '&:hover':{
      backgroundColor: 'black'
    },
    '& .item-button-wrapper': {
      display: 'none',
    },
    '&:hover .item-button-wrapper': {
      display: 'flex',
    },
    '&:hover .item-button-wrapper .edit-button': {
      backgroundColor:'white',
      '&:hover':{
        border: '1px solid white',
        backgroundColor:'transparent',
        color: 'white',
      },
      margin: 10,
    },

    '&:hover .item-button-wrapper .remove-button': {
      backgroundColor: 'red',
      '&:hover':{
        border: '1px solid red',
        backgroundColor:'transparent',
        color: 'red',
      },
      margin: 10,
    },
  },
}));

function Dashboard() {
  const classes = useStyles();
  let history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const editItem = (index)=>{
    history.push(`/edit/${index}`)
  }
;
  const itemList = useSelector((state)=> state.itemReducer.value);
  const [itemMap,setItemMap] = useState(itemList)

  const dispatch = useDispatch();

  const test = ()=>{
    // console.log(items)
    //console.log(itemMap)
    //dispatch(addItem("purple"))
    //dispatch(removeItem(1))
  }

  const deleteItem = (index)=> {
    dispatch(removeItem(index))
    setItemMap(itemList)
  }

  const searchForItem = (event) => {
    if (event.key === "Enter") {
      if (searchValue !== "") {
        const searchItem = itemMap.filter((items) =>
          items.title.includes(searchValue)
        );
        setItemMap(searchItem);
      }
    } else {
      setItemMap(itemList);
    }
  };

  const itemCard = itemMap.map((data, index) => (
    <Grid className = "item-wrapper" item xs={3}>
      <Paper className= {classes.paper} key={data.id}>
        <div className="item-button-wrapper">
        <Button className="edit-button" 
        onClick={()=>{editItem(index)}}>Edit</Button>
        <Button className="remove-button"
        onClick={()=>deleteItem(index)}>Remove</Button>
        </div>
      </Paper>
      <div className="item-title">{data.title}</div>
    </Grid>
  ));

  return (
    <div>
      <div className={classes.root}>
        <div className="add-button-wrapper">
        <Button style = {{color: 'royalblue'}}
          onClick={() => {
            history.push("/create");
          }}
        >
          Add new item
        </Button>
        </div>
        <div className="searchbar-wrapper">
        <input className="searchbar"
          type="text"
          value = {searchValue}
          placeholder="Type something to search"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onKeyDown = {searchForItem}
        ></input>
        </div>
        <div className="grid-wrapper">
        <Grid container spacing={3}>
          {itemCard}
        </Grid>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
