export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.filters.name;

export const selectFilteredContacts = state => {
  const contacts = selectContacts(state);
  const filter = selectFilter(state).toLowerCase();

  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );
};