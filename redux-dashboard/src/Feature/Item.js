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
            //console.log(newItem)
            state.value = [...state.value,newItem]
            //initialItems = state.value
            //console.log(state.value)
            //console.log('add')
        },
        removeItem: (state,action)=>{
            let newState = state.value;
            newState.splice(action.payload,1)
            state.value = [...newState];
            //initialItems = state.value
            //console.log(state.value)
            //console.log('remove')
        },
        editItem: (state, action)=>{
            //let editedItemName = action.payload;
            let id = Number(action.payload.id)
            //console.log(action.payload.editName)
            state.value[id].title = action.payload.editName
            //initialItems[id].title = action.payload.editName
            //initialItems = state.value
            //console.log('edit')
        },
    }
});
export const {addItem,removeItem, editItem} = itemSlice.actions;
export default itemSlice.reducer;