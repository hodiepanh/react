import React, { useEffect, useState } from "react";
import { useUpdateEffect } from "usehooks-ts";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { delItemList, fetchItemList } from "../feature/Item";
import "./Dashboard.css";
import Loading from "./Loading";
import { loadingState } from "../feature/Item";
import { itemApi } from "../api/itemApi";

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
	list: {
		listStyleType: "none",
	},
	button: {
		color: "royalblue",
	},
}));

function Dashboard() {
	const classes = useStyles();
	let history = useHistory();
	const [searchValue, setSearchValue] = useState("");
	const editItem = (index) => {
		history.push(`/edit/${index}`);
	};

	let itemMap = useSelector((state) => state.itemReducer.value);
	const stateLoading = useSelector(loadingState);
	const [itemList, setItemList] = useState([]);
	const dispatch = useDispatch();

	const testApi = () => {
		dispatch(fetchItemList())
			.unwrap()
			.then((resp) => {
				console.log(resp.data);
			});
	};

	const deleteItem = (index) => {
		dispatch(delItemList(index));
	};

	useEffect(() => {
		if (itemMap.length === 0) {
			dispatch(fetchItemList())
				.unwrap()
				.then((resp) => {
					setItemList(resp);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (itemMap.length !== 0) {
			if (searchValue !== "") {
				const delaySearch = setTimeout(() => {
					itemApi.searchItems(searchValue).then((resp) => {
						setItemList(resp.data);
					});
				}, 500);
				return () => clearTimeout(delaySearch);
			} else {
				setItemList(itemMap);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue, itemMap]);

	useUpdateEffect(() => {
		setItemList(itemMap);
	}, [itemMap]);

	const itemCard = itemList.map((data) => (
		<Grid className="item-wrapper" item xs={3} key={data.id}>
			<li key={data.id} className={classes.list}>
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
			{stateLoading && (
				<div>
					<Loading />
				</div>
			)}
			<div className={classes.root}>
				<div className="add-button-wrapper">
					<Button
						className={classes.button}
						onClick={() => {
							history.push({
								pathname: "/create",
								state: { id: itemList.length },
							});
						}}
					>
						Add new item
					</Button>
					<Button className={classes.button} onClick={testApi}>
						Test
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
		</div>
	);
}

export default Dashboard;
