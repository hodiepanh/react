import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { ItemContext } from "../Store/Context";
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

  const [itemValue, setItemValue] = useContext(ItemContext);
  const [itemMap, setItemMap] = useState(itemValue);
  const [searchValue, setSearchValue] = useState("");

  const editItem = (index) => {
    history.push(`/edit/${index}`);
  };

  const removeItem = (index) => {
    const newItemValue = itemValue.filter(
      (items) => items !== itemValue[index]
    );
    setItemMap(newItemValue);
    setItemValue(newItemValue);
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchValue !== "") {
        const searchItem = itemValue.filter((items) =>
          items.title.includes(searchValue)
        );
        setItemMap(searchItem);
      } else {
        setItemMap(itemValue);
      }
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [searchValue]);

  const itemCard = itemMap.map((data, index) => (
    <Grid className="item-wrapper" item xs={3} key={index}>
      <li key={index} style={{ listStyleType: "none" }}>
        <Paper className={classes.paper}>
          <div className="item-button-wrapper">
            <Button className="edit-button" onClick={() => editItem(index)}>
              Edit
            </Button>
            <Button className="remove-button" onClick={() => removeItem(index)}>
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
      <div className={classes.root}>
        <div className="add-button-wrapper">
          <Button
            style={{ color: "royalblue" }}
            onClick={() => {
              history.push("/create");
            }}
          >
            Add new item
          </Button>
        </div>
        <div className="searchbar-wrapper">
          <input
            className="searchbar"
            type="text"
            placeholder="Type something to search"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            //onKeyDown={searchItem}
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
