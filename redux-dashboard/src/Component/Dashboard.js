import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItem, removeItem } from "../Feature/Item";
import "./Dashboard.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    aspectRatio: 1 / 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgrey",
    "&:hover": {
      backgroundColor: "black",
    },
    "& .item-button-wrapper": {
      display: "none",
    },
    "&:hover .item-button-wrapper": {
      display: "flex",
    },
    "&:hover .item-button-wrapper .edit-button": {
      backgroundColor: "white",
      "&:hover": {
        border: "1px solid white",
        backgroundColor: "transparent",
        color: "white",
      },
      margin: 10,
    },

    "&:hover .item-button-wrapper .remove-button": {
      backgroundColor: "red",
      "&:hover": {
        border: "1px solid red",
        backgroundColor: "transparent",
        color: "red",
      },
      margin: 10,
    },
  },
}));

function Dashboard() {
  const classes = useStyles();
  let history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const editItem = (index) => {
    history.push(`/edit/${index}`);
  };

  const itemMap = useSelector((state) => state.itemReducer.value);
  const [itemList, setItemList] = useState(itemMap);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const axios = require("axios");

  const deleteItem = (index) => {
    axios
      .delete(`http://localhost:3001/posts/${index}`)
      .then((resp) => {})
      .catch((error) => {
        console.log(error);
      });
    //console.log(index);
    dispatch(removeItem(index));
    const delItems = itemList.filter((items) => items.id !== index);
    //console.log(itemList);
    setItemList(delItems);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setIsLoading(true);
      dispatch(fetchItem(response.data));
      //console.log("dispatch");
      setItemList(response.data);
      //console.log("set state");
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchValue !== "") {
        axios
          .get(`http://localhost:3001/posts?title_like=${searchValue}`)
          .then((resp) => {
            setItemList(resp.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios.get("http://localhost:3001/posts").then((response) => {
          //setIsLoading(true);
          setItemList(response.data);
          //setIsLoading(false);
        });
      }
    }, 500);
    return () => clearTimeout(delaySearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const itemCard = itemList.map((data, index) => (
    <Grid className="item-wrapper" item xs={3} key={data.id}>
      <li key={data.id} style={{ listStyleType: "none" }}>
        <Paper className={classes.paper}>
          <div className="item-button-wrapper">
            <Button
              className="edit-button"
              onClick={() => {
                editItem(data.id);
              }}
            >
              Edit
            </Button>
            <Button
              className="remove-button"
              onClick={() => deleteItem(data.id)}
            >
              Remove
            </Button>
          </div>
        </Paper>
        <div className="item-title">{data.title}</div>
      </li>
    </Grid>
  ));

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div className={classes.root}>
          <div className="add-button-wrapper">
            <Button
              style={{ color: "royalblue" }}
              onClick={() => {
                history.push({
                  pathname: "/create",
                  state: { id: itemList.length },
                });
              }}
            >
              Add new item
            </Button>
          </div>
          <div className="searchbar-wrapper">
            <input
              className="searchbar"
              type="text"
              value={searchValue}
              placeholder="Type something to search"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            ></input>
          </div>
          <div className="grid-wrapper">
            <Grid container spacing={3}>
              {itemCard}
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
