import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	getItems,
	addItems,
	deleteItems,
	editItems,
	searchItems,
} from "../api/itemApi";
//const axios = require("axios");

let initialState = {
	value: [],
};

export const fetchItemList = createAsyncThunk("/get", () => {
	return getItems().then((resp) => {
		//console.log(resp.data);
		return resp.data;
	});
});

export const addItemList = createAsyncThunk("/create", (newItem) => {
	return addItems(newItem).then((resp) => {
		//console.log(resp.data);
		return resp.data;
	});
});

export const delItemList = createAsyncThunk("/delete", (index) => {
	return deleteItems(index);
});

export const editItemList = createAsyncThunk("/edit", (editData) => {
	const id = editData.id;
	const editName = editData.editName;
	return editItems(id, editName).then((resp) => {
		console.log(resp.data);
		return resp.data;
	});
});

export const searchItemList = createAsyncThunk("/search", (searchValue) => {
	return searchItems(searchValue).then((resp) => {
		//console.log(resp.data);
		return resp.data;
	});
});

export const itemSlice = createSlice({
	name: "items",
	initialState,
	reducers: {
		fetchItem: (state, action) => {
			state.value = action.payload;
		},
		addItem: (state, action) => {
			const newItem = {
				id: state.value.length,
				title: action.payload,
				img: "something",
			};
			state.value = [...state.value, newItem];
			//console.log(state.value.length);
		},
		removeItem: (state, action) => {
			console.log(action.payload);
			let newState = state.value;
			newState.splice(action.payload, 1);
			//console.log(newState);
			state.value = [...newState];
			console.log(state.value);
		},
		editItem: (state, action) => {
			//console.log(action.payload);
			let id = Number(action.payload.id);
			state.value[id].title = action.payload.editName;
		},
		testItem: (state, action) => {
			console.log(action.payload);
			console.log("test");
		},
	},
	extraReducers: {
		[fetchItemList.fulfilled.type]: (state, action) => {
			state.value = action.payload;
			//console.log(state.value);
		},
		[addItemList.fulfilled.type]: (state, action) => {
			state.value = [...state.value, action.payload];
			//state.value = action.payload;
			//console.log(state.value);
		},
		[delItemList.fulfilled.type]: (state, action) => {
			//state.value = [...state.value, action.payload];
			//state.value = action.payload;
			console.log(action.payload);
		},
		[editItemList.fulfilled.type]: (state, action) => {
			//state.value = [...state.value, action.payload];
			//state.value = action.payload;
			//console.log(action.payload);
			let id = Number(action.payload.id);
			state.value[id].title = action.payload.title;
		},
		[searchItemList.fulfilled.type]: (state, action) => {
			//state.value = [...state.value, action.payload];
			//state.value = action.payload;
			console.log(action.payload);
			state.value = action.payload;
		},
	},
});
export const { addItem, removeItem, editItem, fetchItem } = itemSlice.actions;

export default itemSlice.reducer;
