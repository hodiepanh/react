import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Create from "./component/Create";
import Edit from "./component/Edit";
import HeaderBar from "./component/HeaderBar";
function App() {
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
