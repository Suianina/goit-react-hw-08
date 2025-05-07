export const selectUser = (state) => state.auth.user;

export const selectLoggedIn = (state) => state.auth.isLoggedIn

export const selectAuthToken = (state) => state.auth.token

export const selectIsRefreshing = (state) => state.auth.isRefreshing

export const selectAuthError =(state) => state.auth.error