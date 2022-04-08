import { createSlice } from '@reduxjs/toolkit';

let initialItems = [
    {id: 1, title: "red", img: "imgOne"},
    {id: 2, title: 'blue', img: 'imgTwo'},
    ];

export const itemSlice = createSlice({
    name: 'items',
    initialState:{value:initialItems},
    reducers: {
        addItem: (state,action) => {
            const newItem = {id:2, title: action.payload, img: "something"}
            //console.log(newItem)
            state.value = [...state.value,newItem]
            //console.log(state.value)
        },
        removeItem: (state,action)=>{
            let newState = state.value;
            newState.splice(action.payload,1)
            state.value = [...newState];
            //console.log(state.value)
        },
        editItem: (state, action)=>{
            //let editedItemName = action.payload;
            let id = Number(action.payload.id)
            //console.log(action.payload.editName)
            state.value[id].title = action.payload.editName
        },

        searchItem: (state,action)=>{
            const searchState = state.value.filter((items) =>
            items.title.includes(action.payload))
            //console.log(searchState.length)
            state.value = searchState
            //console.log(action.payload)
            //return searchState
        },
    }
});
export const {addItem,removeItem, editItem,searchItem} = itemSlice.actions;
export default itemSlice.reducer;