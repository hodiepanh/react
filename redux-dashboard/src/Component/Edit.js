import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useHistory, useParams } from "react-router-dom";
import "./Edit.css";
import { useDispatch, useSelector } from "react-redux";
import { editItemList } from "../feature/Item";
import Loading from "./Loading";

function Edit() {
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
		</div>
	);
}

export default Edit;
