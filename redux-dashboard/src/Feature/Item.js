import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { itemApi } from "../api/itemApi";
let initialState = {
	value: [],
	loading: false,
};

export const fetchItemList = createAsyncThunk("items/get", async () => {
	const response = await itemApi.getItems();
	const data = response.data;
	return data;
});

export const addItemList = createAsyncThunk("items/create", async (newItem) => {
	const resp = await itemApi.addItems(newItem);
	const data = resp.data;
	return data;
});

export const delItemList = createAsyncThunk("items/delete", async (index) => {
	const resp = await itemApi.deleteItems(index);
	const dataOb = { data: resp.data, id: index };
	return dataOb;
});

export const editItemList = createAsyncThunk("items/edit", async (editData) => {
	const id = editData.id;
	const editName = editData.editName;
	const resp = await itemApi.editItems(id, editName);
	const data = resp.data;
	return data;
});

export const searchItemList = createAsyncThunk(
	"/search",
	async (searchValue) => {
		const resp = await itemApi.searchItems(searchValue);
		const data = resp.data;
		return data;
	}
);

export const itemSlice = createSlice({
	name: "items",
	initialState,
	reducers: {
		fetchItem: (state, action) => {
			state.value = action.payload;
			console.log(state.value);
		},
		addItem: (state, action) => {
			const newItem = {
				id: state.value.length,
				title: action.payload,
				img: "something",
			};
			state.value = [...state.value, newItem];
		},
		removeItem: (state, action) => {
			console.log(action.payload);
			let newState = state.value;
			newState.splice(action.payload, 1);
			state.value = [...newState];
			console.log(state.value);
		},
		editItem: (state, action) => {
			let id = Number(action.payload.id);
			state.value[id].title = action.payload.editName;
		},
	},
	extraReducers: {
		[fetchItemList.pending]: (state) => {
			state.loading = true;
		},
		[fetchItemList.fulfilled]: (state, action) => {
			state.value = action.payload;
			state.loading = false;
		},
		[fetchItemList.rejected]: (state) => {
			state.loading = true;
		},
		[addItemList.pending]: (state) => {
			state.loading = true;
		},
		[addItemList.fulfilled]: (state, action) => {
			state.value = [...state.value, action.payload];
			state.loading = false;
		},
		[addItemList.rejected]: (state) => {
			state.loading = true;
		},
		[delItemList.pending]: (state) => {
			state.loading = true;
		},
		[delItemList.fulfilled]: (state, action) => {
			const index = action.payload.id;
			const delItems = state.value.filter((items) => items.id !== index);
			state.value = [...delItems];
			state.loading = false;
		},
		[delItemList.rejected]: (state) => {
			state.loading = true;
		},
		[editItemList.pending]: (state) => {
			state.loading = true;
		},
		[editItemList.fulfilled]: (state, action) => {
			let id = Number(action.payload.id);
			state.value[id].title = action.payload.title;
			state.loading = false;
		},
		[editItemList.rejected]: (state) => {
			state.loading = true;
		},
		[searchItemList.fulfilled]: () => {},
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
