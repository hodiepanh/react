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
      const newItem = {
        id: state.value.length,
        title: action.payload,
        img: "something",
      };
      state.value = [...state.value, newItem];
      //console.log(state.value.length);
    },
    removeItem: (state, action) => {
      let newState = state.value;
      newState.splice(action.payload, 1);
      state.value = [...newState];
    },
    editItem: (state, action) => {
      //console.log(action.payload);
      let id = Number(action.payload.id);
      state.value[id].title = action.payload.editName;
    },
  },
});
export const { addItem, removeItem, editItem, fetchItem } = itemSlice.actions;

export default itemSlice.reducer;
