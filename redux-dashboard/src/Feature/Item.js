import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { itemApi } from "../api/itemApi";
let initialState = {
	value: [],
	loading: true,
};

export const fetchItemList = createAsyncThunk("items/get", () => {
	return itemApi.getItems().then((resp) => {
		return resp.data;
	});
});

export const addItemList = createAsyncThunk("items/create", (newItem) => {
	return itemApi.addItems(newItem).then((resp) => {
		return resp.data;
	});
});

export const delItemList = createAsyncThunk("items/delete", (index) => {
	return itemApi.deleteItems(index);
});

export const editItemList = createAsyncThunk("items/edit", (editData) => {
	const id = editData.id;
	const editName = editData.editName;
	return itemApi.editItems(id, editName).then((resp) => {
		return resp.data;
	});
});

export const searchItemList = createAsyncThunk("/search", (searchValue) => {
	return itemApi.searchItems(searchValue).then((resp) => {
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
	},
	extraReducers: {
		[fetchItemList.fulfilled]: (state, action) => {
			state.value = action.payload;
			state.loading = false;
			//console.log(state.value);
		},
		[addItemList.pending]: (state, action) => {
			state.loading = true;
		},
		[addItemList.fulfilled]: (state, action) => {
			//console.log(state.value.data);
			state.value = [...state.value, action.payload];
			state.loading = false;
			//console.log(state.value);
		},
		[delItemList.fulfilled]: (state, action) => {
			//console.log(action.payload);
		},
		[editItemList.pending]: (state, action) => {
			state.loading = true;
		},
		[editItemList.fulfilled]: (state, action) => {
			let id = Number(action.payload.id);
			state.value[id].title = action.payload.title;
			state.loading = false;
		},
		[searchItemList.fulfilled]: (state, action) => {
			console.log(action.payload);
			state.value = action.payload;
			//return action.payload;
		},
	},
});
export const {
	addItem,
	removeItem,
	editItem,
	fetchItem,
	testItem,
	changeLoading,
} = itemSlice.actions;

export default itemSlice.reducer;
