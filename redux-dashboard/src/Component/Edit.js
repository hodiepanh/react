import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useHistory, useParams } from "react-router-dom";
import "./Edit.css";
import { useDispatch, useSelector } from "react-redux";
import { editItemList } from "../feature/Item";
import Loading from "./Loading";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	editbutton: {
		backgroundColor: "green",
		color: "white",
		marginRight: "20px",
		"&:hover": {
			backgroundColor: "green",
		},
	},
}));

function Edit() {
	const classes = useStyles();
	const history = useHistory();
	const { id } = useParams();
	const dispatch = useDispatch();
	const stateLoading = useSelector((state) => state.itemReducer.loading);
	const editInitialName = useSelector(
		(state) => state.itemReducer.value[id].title
	);
	const [editName, setEditName] = useState(editInitialName);

	const updateItem = () => {
		dispatch(editItemList({ id, editName })).then(() => {
			history.push("/dashboard");
		});
	};

	return (
		<div>
			{stateLoading && (
				<div>
					<Loading />
				</div>
			)}
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
							className={classes.editbutton}
							variant="contained"
							onClick={updateItem}
						>
							Update
						</Button>
						<Button
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
		</div>
	);
}

export default Edit;
