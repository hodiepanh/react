import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemList } from "../feature/Item";
import "./Create.css";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";

function Create() {
	const [createName, setCreateName] = useState("");
	const stateLoading = useSelector((state) => state.itemReducer.loading);
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	const addNewItem = () => {
		if (createName !== "") {
			const newItem = {
				id: location.state.id,
				title: createName,
				img: "something",
			};
			dispatch(addItemList(newItem)).then(() => {
				history.push("/dashboard");
			});
		} else {
			alert("please enter name");
		}
	};

	return (
		<div>
			{stateLoading && (
				<div>
					<Loading />
				</div>
			)}
			<div className="create-form">
				<div className="title">Title {location.state.id}</div>
				<form>
					<input
						type="text"
						value={createName}
						placeholder="Add title here"
						onChange={(e) => {
							setCreateName(e.target.value);
						}}
					/>
					<div className="button-wrapper">
						<Button
							variant="contained"
							style={{
								backgroundColor: "royalblue",
								color: "white",
							}}
							onClick={addNewItem}
						>
							Add
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Create;
