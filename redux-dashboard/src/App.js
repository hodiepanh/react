import React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Create from "./component/Create";
import Edit from "./component/Edit";
import HeaderBar from "./component/HeaderBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchItem } from "./feature/Item";
function App() {
  const axios = require("axios");
  const dispatch = useDispatch();
  // useEffect(() => {
  //   axios.get("http://localhost:3001/posts").then((response) => {
  //     dispatch(fetchItem(response.data));
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <div>
      <HeaderBar />
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
          <Route path="/edit/:id">
            <Edit />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
