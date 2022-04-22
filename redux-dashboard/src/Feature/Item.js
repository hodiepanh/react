import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  value: [],
};

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    fetchItem: (state, action) => {
      state.value = action.payload;
    },
    addItem: (state, action) => {
      const newItem = { id: 2, title: action.payload, img: "something" };
      state.value = [...state.value, newItem];
      //console.log(state.value);
    },
    removeItem: (state, action) => {
      let newState = state.value;
      newState.splice(action.payload, 1);
      state.value = [...newState];
    },
    editItem: (state, action) => {
      let id = Number(action.payload.index);
      state.value[id].title = action.payload.editName;
    },
  },
});
export const { addItem, removeItem, editItem, fetchItem } = itemSlice.actions;

export default itemSlice.reducer;
