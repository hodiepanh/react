import { createSlice } from '@reduxjs/toolkit';

let initialItems = [
    {id: 1, title: "red", img: "imgOne"},
    {id: 2, title: 'blue', img: 'imgTwo'},
    ];

export const itemSlice = createSlice({
    name: 'items',
    initialState:{value: initialItems},
    reducers: {
        addItem: (state,action) => {
            const newItem = {id:2, title: action.payload, img: "something"}
            state.value = [...state.value,newItem]
        },
        removeItem: (state,action)=>{
            let newState = state.value;
            newState.splice(action.payload,1)
            state.value = [...newState];
        },
        editItem: (state, action)=>{
            let id = Number(action.payload.id)
            state.value[id].title = action.payload.editName
        },
    }
});
export const {addItem,removeItem, editItem} = itemSlice.actions;
export default itemSlice.reducer;