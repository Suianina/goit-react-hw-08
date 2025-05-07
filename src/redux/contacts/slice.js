import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact, updateContact } from "./operations";
import {logout} from '../auth/operations'


const initialState = {
    items: [],
    loading: false,
    error: null,
}

const slice= createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
    .addCase(fetchContacts.pending, (state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchContacts.fulfilled, (state, action)=>{
        state.loading = false;
        state.items = action.payload;
    })
    .addCase(fetchContacts.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(addContact.pending, (state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(addContact.fulfilled, (state, action)=>{
        state.loading = false;
        state.items.push(action.payload)
    })
    .addCase(addContact.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(contact => contact.id !== action.payload.id)
    })
    .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }
      })
    .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(logout.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.error = null;
    });
}
})

export default slice.reducer;