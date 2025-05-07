import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";

export const selectNameFilter = (state) => state.filters.value;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts = [], filter = '') => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) || contact.number.includes(filter)
    );
  }
);