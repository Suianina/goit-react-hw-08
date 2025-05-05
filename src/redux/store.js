import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filtersSlice';
import contactsReducer from './contactsSlice';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filterReducer,
  },
});

export default store;